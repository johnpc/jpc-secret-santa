'use client';

import { useParticipants } from '@/hooks/useParticipants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ParticipantList({
  groupId,
  showAssignments,
}: {
  groupId: string;
  showAssignments?: boolean;
}) {
  const { data: participants, isLoading } = useParticipants(groupId);

  const copyLink = (accessCode: string) => {
    const url = `${window.location.origin}/participant/${accessCode}`;
    navigator.clipboard.writeText(url);
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
              <Button variant="ghost" size="icon" onClick={() => copyLink(p.accessCode)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
