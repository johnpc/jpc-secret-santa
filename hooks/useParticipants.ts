import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/data';
import { useEffect } from 'react';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

type Participant = Schema['Participant']['type'];

export function useParticipants(groupId: string) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!groupId) return;

    const sub = client.models.Participant.observeQuery({
      filter: { groupId: { eq: groupId } },
    }).subscribe({
      next: ({ items }) => {
        queryClient.setQueryData(['participants', groupId], items);
      },
    });

    return () => sub.unsubscribe();
  }, [groupId, queryClient]);

  return useQuery({
    queryKey: ['participants', groupId],
    queryFn: async () => {
      const { data } = await client.models.Participant.list({
        filter: { groupId: { eq: groupId } },
      });
      return data;
    },
    enabled: !!groupId,
  });
}

export function useParticipant(accessCode: string) {
  return useQuery({
    queryKey: ['participant', accessCode],
    queryFn: async () => {
      const { data } = await client.models.Participant.list({
        filter: { accessCode: { eq: accessCode } },
      });
      const participant = data[0];
      if (!participant) return null;

      // Fetch assigned participant if exists
      if (participant.assignedToId) {
        const { data: assignedData } = await client.models.Participant.get({
          id: participant.assignedToId,
        });
        return { ...participant, assignedTo: assignedData };
      }

      return { ...participant, assignedTo: null };
    },
    enabled: !!accessCode,
  });
}

export function useAddParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      groupId,
      name,
      email,
    }: {
      groupId: string;
      name: string;
      email?: string;
    }) => {
      const accessCode = Math.random().toString(36).substring(2, 10);
      const { data } = await client.models.Participant.create({
        groupId,
        name,
        email,
        accessCode,
      });
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['participants', variables.groupId] });
    },
  });
}

export function useAssignSecretSanta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      groupId,
      participants,
    }: {
      groupId: string;
      participants: Participant[];
    }) => {
      const shuffled = [...participants].sort(() => Math.random() - 0.5);

      for (let i = 0; i < shuffled.length; i++) {
        const giver = shuffled[i];
        const receiver = shuffled[(i + 1) % shuffled.length];

        await client.models.Participant.update({
          id: giver.id,
          assignedToId: receiver.id,
        });
      }

      await client.models.Group.update({
        id: groupId,
        isAssigned: true,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['participants', variables.groupId] });
      queryClient.invalidateQueries({ queryKey: ['group'] });
    },
  });
}

export function useDeleteParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, groupId }: { id: string; groupId: string }) => {
      await client.models.Participant.delete({ id });
      return { groupId };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['participants', data.groupId] });
    },
  });
}
