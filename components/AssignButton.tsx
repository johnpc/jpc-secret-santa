'use client';

import { useAssignSecretSanta, useParticipants } from '@/hooks/useParticipants';
import { Button } from '@/components/ui/button';
import { Shuffle } from 'lucide-react';

export function AssignButton({ groupId, isAssigned }: { groupId: string; isAssigned: boolean }) {
  const { data: participants } = useParticipants(groupId);
  const assignMutation = useAssignSecretSanta();

  const handleAssign = async () => {
    if (!participants || participants.length < 2) return;
    await assignMutation.mutateAsync({ groupId, participants });
  };

  return (
    <Button
      onClick={handleAssign}
      disabled={!participants || participants.length < 2 || assignMutation.isPending}
      size="lg"
    >
      <Shuffle className="h-4 w-4" />
      {isAssigned ? 'Reassign' : 'Assign'} Secret Santas
    </Button>
  );
}
