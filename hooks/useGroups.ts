import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();

export function useGroups() {
  return useQuery({
    queryKey: ['groups'],
    queryFn: async () => {
      const { data } = await client.models.Group.list();
      return data;
    },
  });
}

export function useGroup(adminCode: string) {
  return useQuery({
    queryKey: ['group', adminCode],
    queryFn: async () => {
      const { data } = await client.models.Group.list({
        filter: { adminCode: { eq: adminCode } },
      });
      return data[0] || null;
    },
    enabled: !!adminCode,
  });
}

export function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (name: string) => {
      const adminCode = Math.random().toString(36).substring(2, 10);
      const { data } = await client.models.Group.create({
        name,
        adminCode,
        isAssigned: false,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
  });
}
