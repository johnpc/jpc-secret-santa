'use client';

import { useParticipants, useUpdateAssignment } from '@/hooks/useParticipants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRight } from 'lucide-react';

export function ManualAssign({ groupId }: { groupId: string }) {
  const { data: participants } = useParticipants(groupId);
  const updateAssignment = useUpdateAssignment();

  const handleAssignmentChange = (giverId: string, receiverId: string) => {
    updateAssignment.mutate({ giverId, receiverId, groupId });
  };

  const getAssignedCount = (participantId: string) => {
    return participants?.filter((p) => p.assignedToId === participantId).length || 0;
  };

  if (!participants?.length) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manual Assignments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {participants.map((giver) => (
            <div key={giver.id} className="flex items-center gap-3">
              <div className="font-medium min-w-[150px]">{giver.name}</div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <Select
                value={giver.assignedToId || ''}
                onValueChange={(value) => handleAssignmentChange(giver.id, value)}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select recipient" />
                </SelectTrigger>
                <SelectContent>
                  {participants
                    .filter((p) => p.id !== giver.id)
                    .map((receiver) => {
                      const count = getAssignedCount(receiver.id);
                      const isOverAssigned =
                        count > 1 || (count === 1 && giver.assignedToId !== receiver.id);
                      return (
                        <SelectItem key={receiver.id} value={receiver.id}>
                          {receiver.name} {isOverAssigned && '⚠️'}
                        </SelectItem>
                      );
                    })}
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
