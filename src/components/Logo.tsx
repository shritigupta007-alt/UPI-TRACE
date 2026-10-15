import { ShieldCheck } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const iconSize = size === 'lg' ? 28 : size === 'sm' ? 18 : 22;
  const textSize = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-sm' : 'text-lg';
  const subSize = size === 'lg' ? 'text-[0.625rem]' : 'text-[0.5625rem]';

  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative">
        <div className="flex items-center justify-center rounded-lg border border-amber/40 bg-gradient-to-br from-navy to-navy-mid shadow-subtle">
          <ShieldCheck
            size={iconSize}
            className="text-amber m-1.5"
            strokeWidth={1.5}
          />
        </div>
        <div className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-amber ring-2 ring-navy-deep" />
      </div>
      {showText && (
        <div className="leading-none">
          <div className={`font-serif-heading ${textSize} text-white tracking-wide`}>
            UPI<span className="text-amber">-</span>TRACE
          </div>
          <div className={`font-mono ${subSize} text-white/40 tracking-[0.2em] uppercase mt-1`}>
            Consent &middot; Context &middot; Audit
          </div>
        </div>
      )}
    </div>
  );
}
