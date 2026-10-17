import { Smartphone, Landmark, ArrowLeftRight, Wallet, ScanLine, Bell, Zap, Tv, Droplets, Flame, Home, Search, History, ShieldCheck, ChevronRight, Fuel, Plane, Train, Shield } from 'lucide-react';
import { useState } from 'react';
import type { ReactNode } from 'react';
import TraceApp from '@/pages/TraceApp';
import { transactions as demo } from '@/data/demoData';

function Tile({ icon, label, onClick, badge, highlight }: { icon: ReactNode; label: string; onClick?: () => void; badge?: number; highlight?: boolean }) {
  return (
    <button onClick={onClick} className="group flex flex-col items-center gap-2 text-center focus:outline-none">
      <span
        className={`relative flex h-14 w-14 items-center justify-center rounded-2xl transition active:scale-95 ${
          highlight ? 'bg-brand text-white shadow-lg shadow-brand/40 ring-4 ring-brand/15' : 'bg-brand-light text-brand group-hover:bg-brand/10'
        }`}
      >
        {icon}
        {badge ? (
          <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white ring-2 ring-white">
            {badge}
          </span>
        ) : null}
      </span>
      <span className={`text-xs leading-tight ${highlight ? 'font-bold text-brand' : 'font-medium text-slate-700'}`}>{label}</span>
    </button>
  );
}

export default function PhonePeHome() {
  const [data, setData] = useState(demo);
  const [inTrace, setInTrace] = useState(false);
  const onOpenTrace = () => setInTrace(true);
  const waiting = data.filter((t) => t.responseStatus === 'pending').length;

  return (
    <div className="min-h-screen bg-brand-light sm:flex sm:items-center sm:justify-center sm:py-8">
      <div className="relative mx-auto flex h-screen w-full max-w-[420px] flex-col overflow-hidden bg-[#F4F1FA] sm:h-[860px] sm:rounded-[2.5rem] sm:border-[10px] sm:border-slate-900 sm:shadow-2xl">
        {inTrace ? (
          <TraceApp data={data} setData={setData} onBack={() => setInTrace(false)} />
        ) : (
          <>
        {/* Header */}
        <header className="bg-brand px-5 pb-16 pt-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-bold">MS</span>
              <div className="leading-tight">
                <div className="text-sm font-bold">Meera Sharma</div>
                <div className="text-xs text-white/70">adv.msharma@okhdfc</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button aria-label="Scan QR" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15"><ScanLine size={18} /></button>
              <button aria-label="Notifications" className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                <Bell size={18} />
                {waiting > 0 && <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-amber" />}
              </button>
            </div>
          </div>
        </header>

        <main className="-mt-10 flex-1 space-y-4 overflow-y-auto px-4 pb-24 scrollbar-thin">
          {/* Money transfer */}
          <section className="rounded-3xl bg-white p-5 shadow-card">
            <h2 className="mb-4 text-sm font-bold text-navy">Transfer money</h2>
            <div className="grid grid-cols-4 gap-3">
              <Tile icon={<Smartphone size={24} />} label="To mobile number" />
              <Tile icon={<Landmark size={24} />} label="To bank or UPI ID" />
              <Tile icon={<ArrowLeftRight size={24} />} label="To your own account" />
              <Tile icon={<Wallet size={24} />} label="Check balance" />
            </div>
          </section>

          {/* UPI-TRACE entry */}
          <button
            onClick={onOpenTrace}
            className="flex w-full items-center gap-4 rounded-3xl border border-brand/20 bg-white p-4 text-left shadow-card transition active:scale-[0.99] hover:border-brand/40"
          >
            <span className="relative flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-brand/40">
              <ShieldCheck size={28} />
              {waiting > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[11px] font-bold text-white ring-2 ring-white">{waiting}</span>
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-bold text-navy">UPI-TRACE</span>
              <span className="block text-xs leading-snug text-slate-500">
                {waiting > 0 ? `${waiting} unknown ${waiting === 1 ? 'payment needs' : 'payments need'} your reply` : 'Check payments and stay safe from UPI fraud'}
              </span>
            </span>
            <ChevronRight size={18} className="text-brand" />
          </button>

          {/* Recharge & bills */}
          <section className="rounded-3xl bg-white p-5 shadow-card">
            <h2 className="mb-4 text-sm font-bold text-navy">Recharge and pay bills</h2>
            <div className="grid grid-cols-4 gap-y-5 gap-x-3">
              <Tile icon={<Smartphone size={24} />} label="Mobile recharge" />
              <Tile icon={<Tv size={24} />} label="DTH" />
              <Tile icon={<Zap size={24} />} label="Electricity" />
              <Tile icon={<Droplets size={24} />} label="Water" />
              <Tile icon={<Flame size={24} />} label="Gas" />
              <Tile icon={<Fuel size={24} />} label="FASTag" />
              <Tile icon={<Shield size={24} />} label="Insurance" />
              <Tile icon={<Train size={24} />} label="Trains" />
            </div>
          </section>

          <section className="rounded-3xl bg-white p-5 shadow-card">
            <h2 className="mb-4 text-sm font-bold text-navy">Travel</h2>
            <div className="grid grid-cols-4 gap-3">
              <Tile icon={<Plane size={24} />} label="Flights" />
              <Tile icon={<Train size={24} />} label="Trains" />
            </div>
          </section>
        </main>

        {/* Bottom nav */}
        <nav className="absolute inset-x-0 bottom-0 flex items-center justify-around border-t border-slate-200 bg-white py-2.5">
          {[{ i: Home, l: 'Home', a: true }, { i: Search, l: 'Search' }, { i: History, l: 'History' }].map(({ i: Icon, l, a }) => (
            <button key={l} className={`flex flex-col items-center gap-0.5 px-5 text-xs font-semibold ${a ? 'text-brand' : 'text-slate-400'}`}>
              <Icon size={22} />
              {l}
            </button>
          ))}
        </nav>
          </>
        )}
      </div>
    </div>
  );
}
