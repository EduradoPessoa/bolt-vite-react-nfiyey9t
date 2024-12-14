import { LucideCrown } from 'lucide-react';

export const Logo = () => {
  return (
    <div className="flex items-center gap-2 font-bold text-xl">
      <LucideCrown className="w-8 h-8 text-amber-600" />
      <span>EasyManager</span>
    </div>
  );
};