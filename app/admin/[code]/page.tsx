'use client';

import { use } from 'react';
import { useGroup } from '@/hooks/useGroups';
import { AddParticipant } from '@/components/AddParticipant';
import { ParticipantList } from '@/components/ParticipantList';
import { AssignButton } from '@/components/AssignButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = use(params);
  const { data: group, isLoading } = useGroup(code);

  if (isLoading)
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  if (!group)
    return <div className="flex items-center justify-center min-h-screen">Group not found</div>;

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">{group.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <AddParticipant groupId={group.id} />
            <AssignButton groupId={group.id} isAssigned={group.isAssigned || false} />
          </div>
        </CardContent>
      </Card>

      <ParticipantList groupId={group.id} showAssignments={group.isAssigned || false} allowDelete />
    </div>
  );
}
