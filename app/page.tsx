'use client';

import { CreateGroup } from '@/components/CreateGroup';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <CreateGroup />
    </div>
  );
}
