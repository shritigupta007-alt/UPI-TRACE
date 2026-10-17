import { ShieldCheck } from 'lucide-react';

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg'; showText?: boolean }) {
  const box = size === 'lg' ? 'h-12 w-12' : 'h-10 w-10';
  return (
    <div className="flex items-center gap-3 select-none">
      <div className={`${box} flex items-center justify-center rounded-2xl bg-brand text-white shadow-md shadow-brand/30`}>
        <ShieldCheck size={size === 'lg' ? 26 : 22} strokeWidth={2} />
      </div>
      <div className="leading-tight">
        <div className={`font-extrabold text-navy ${size === 'lg' ? 'text-2xl' : 'text-lg'}`}>UPI-TRACE</div>
        <div className="text-xs text-slate-500">Know who paid you, and why</div>
      </div>
    </div>
  );
}
