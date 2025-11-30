'use client';

import { use } from 'react';
import { useParticipant, useParticipants } from '@/hooks/useParticipants';
import { useGroup } from '@/hooks/useGroups';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gift, Users } from 'lucide-react';

export default function ParticipantPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const { data: participant, isLoading } = useParticipant(code);
  const { data: group } = useGroup(participant?.groupId || '');
  const { data: participants } = useParticipants(participant?.groupId || '');

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!participant) {
    return <div className="flex items-center justify-center min-h-screen">Invalid link</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">🎅 {group?.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-lg">
              Hello, <span className="font-bold">{participant.name}</span>!
            </p>
          </div>

          {participant.assignedTo ? (
            <div className="p-6 bg-gradient-to-r from-red-50 to-green-50 rounded-lg border-2 border-red-200">
              <div className="flex items-center gap-3 mb-2">
                <Gift className="h-6 w-6 text-red-600" />
                <h3 className="text-xl font-semibold">Your Secret Santa Assignment</h3>
              </div>
              <p className="text-2xl font-bold text-red-600">{participant.assignedTo.name}</p>
            </div>
          ) : (
            <div className="p-6 bg-gray-50 rounded-lg border">
              <p className="text-muted-foreground">
                Assignments haven&apos;t been made yet. Check back soon!
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            All Participants ({participants?.length || 0})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {participants?.map((p) => (
              <div
                key={p.id}
                className="p-3 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
              >
                <div className="font-medium">{p.name}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
