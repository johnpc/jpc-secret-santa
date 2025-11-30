'use client';

import { useParticipants, useDeleteParticipant } from '@/hooks/useParticipants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ParticipantList({
  groupId,
  showAssignments,
  allowDelete,
}: {
  groupId: string;
  showAssignments?: boolean;
  allowDelete?: boolean;
}) {
  const { data: participants, isLoading } = useParticipants(groupId);
  const deleteParticipant = useDeleteParticipant();

  const copyLink = (accessCode: string) => {
    const url = `${window.location.origin}/participant/${accessCode}`;
    navigator.clipboard.writeText(url);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this participant?')) {
      deleteParticipant.mutate({ id, groupId });
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Participants ({participants?.length || 0})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {participants?.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <div className="font-medium">{p.name}</div>
                {showAssignments && p.assignedToId && (
                  <div className="text-sm text-muted-foreground">
                    → {participants.find((x) => x.id === p.assignedToId)?.name}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => copyLink(p.accessCode)}>
                  <Copy className="h-4 w-4" />
                </Button>
                {allowDelete && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(p.id)}
                    disabled={deleteParticipant.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
