'use client';

import { useGroups } from '@/hooks/useGroups';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminListPage() {
  const { data: groups, isLoading } = useGroups();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">All Secret Santa Groups</CardTitle>
        </CardHeader>
        <CardContent>
          {!groups || groups.length === 0 ? (
            <p className="text-muted-foreground">No groups created yet.</p>
          ) : (
            <div className="space-y-2">
              {groups.map((group) => (
                <Link key={group.id} href={`/admin/${group.adminCode}`}>
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div>
                      <div className="font-semibold text-lg">{group.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {group.isAssigned ? '✓ Assigned' : 'Not assigned yet'}
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
