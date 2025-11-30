'use client';

import { CreateGroup } from '@/components/CreateGroup';

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-6 relative z-10">
      <div className="text-center space-y-8 max-w-2xl">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
            🎅 Secret Santa 🎄
          </h1>
          <p className="text-xl text-white/90 drop-shadow-lg">
            Organize your holiday gift exchange with joy!
          </p>
        </div>
        <CreateGroup />
      </div>
    </div>
  );
}
