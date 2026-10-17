import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowLeft, Home, ArrowLeftRight, Clock3, ShieldCheck, MoreHorizontal, Search, X, CheckCircle2,
  Download, Share2, Eye, EyeOff, RotateCcw, XCircle, BadgeCheck, ShieldAlert, FileText, Lock,
} from 'lucide-react';
import type { Transaction, ResponseStatus } from '@/types';
import { transactions as demo } from '@/data/demoData';
import { formatCurrency, formatDateTime, relativeTime } from '@/lib/utils';

type Tab = 'home' | 'payments' | 'timeline' | 'proof' | 'more';
type Filter = 'all' | 'pending' | 'done' | 'attention' | 'suspicious' | 'verified' | 'unverified';
type Choice = 'accept' | 'reject' | 'suspicious';

interface Props {
  data: Transaction[];
  setData: (fn: (d: Transaction[]) => Transaction[]) => void;
  onBack: () => void;
}

const STATUS: Record<ResponseStatus, { label: string; cls: string }> = {
  pending: { label: 'Waiting for reply', cls: 'bg-amber-soft text-amber-dark' },
  recorded: { label: 'Replied', cls: 'bg-emerald-light text-emerald-dark' },
  acknowledged: { label: 'Accepted', cls: 'bg-emerald-light text-emerald-dark' },
  declined: { label: 'Returned', cls: 'bg-slate-100 text-slate-600' },
};
const CHOICES: { key: Choice; icon: ReactNode; title: string; desc: string; status: ResponseStatus; action: string }[] = [
  { key: 'accept', icon: <CheckCircle2 size={20} />, title: 'Accept', desc: 'I know this sender and expected the money.', status: 'acknowledged', action: 'Payment accepted' },
  { key: 'reject', icon: <XCircle size={20} />, title: 'Reject', desc: 'I did not expect this. I will send it back.', status: 'declined', action: 'Payment rejected' },
  { key: 'suspicious', icon: <ShieldAlert size={20} />, title: 'Flag as suspicious', desc: 'This looks like a scam or a trap.', status: 'recorded', action: 'Marked as suspicious' },
];
const esc = (v: unknown) => String(v ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));
const isVerifiedSender = (t: Transaction) => t.senderRisk === 'low' && t.context.priorContact;
const Tick = ({ size = 16 }: { size?: number }) => <BadgeCheck size={size} className="flex-shrink-0 fill-brand text-white" aria-label="Verified sender" />;
const isSus = (t: Transaction) => !!t.flagReason?.startsWith('You marked');

function saveReport(txs: Transaction[], title: string, file: string) {
  const rows = txs.map((t) => `<section><h2>${esc(t.senderName)} · ${esc(formatCurrency(t.amount))}</h2><p class="m">${esc(t.id)} · ${esc(t.senderVpa)} · ${esc(formatDateTime(t.timestamp))}</p><p><b>Status:</b> ${esc(isSus(t) ? 'Marked suspicious' : STATUS[t.responseStatus].label)}${t.flagReason ? ` · <b>Flag:</b> ${esc(t.flagReason)}` : ''}</p><p><b>Your note:</b> ${esc(t.responseNote ?? 'None')}</p><ol>${t.auditTrail.map((e) => `<li>${esc(formatDateTime(e.timestamp))} – <b>${esc(e.action)}</b>: ${esc(e.detail)}</li>`).join('')}</ol><p class="m">Fingerprint: ${esc(t.hash)} (${t.verified ? 'checked' : 'not checked yet'})</p></section>`).join('');
  const html = `<!doctype html><meta charset="utf-8"><title>${esc(title)}</title><style>body{font:15px/1.5 system-ui,sans-serif;max-width:720px;margin:32px auto;padding:0 16px;color:#241540}h1{color:#5F259F}section{border:1px solid #E8E2F2;border-radius:14px;padding:16px;margin:14px 0;break-inside:avoid}h2{margin:0 0 4px;font-size:17px}.m{color:#6b6480;font-size:13px}</style><h1>${esc(title)}</h1><p class="m">Created ${esc(formatDateTime(new Date().toISOString()))}. This is a personal record of what you told UPI-TRACE. It does not decide whether any payment is wrong.</p>${rows}`;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([html], { type: 'text/html' }));
  a.download = file;
  a.click();
}


function makeHash(t: Transaction): string {
  let h = 5381;
  const s = JSON.stringify([t.id, t.amount, t.responseStatus, t.responseNote, t.respondedAt, t.auditTrail.length]);
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  const a = (h >>> 0).toString(16).padStart(8, '0');
  const b = ((h * 2654435761) >>> 0).toString(16).padStart(8, '0');
  return `0x${a}${b}`;
}

export default function TraceApp({ data, setData, onBack }: Props) {
  const [tab, setTab] = useState<Tab>('home');
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);
  const [hideNames, setHideNames] = useState(false);
  const [showIds, setShowIds] = useState(true);
  const [toast, setToast] = useState('');
  const [checking, setChecking] = useState(false);

  const say = (m: string) => { setToast(m); setTimeout(() => setToast(''), 2400); };
  const name = (t: Transaction) => (hideNames ? t.senderName.replace(/[^\s]/g, (c, i) => (i === 0 ? c : '•')) : t.senderName);
  const open = data.find((t) => t.id === openId) ?? null;
  const pending = data.filter((t) => t.responseStatus === 'pending');
  const attention = data.filter((t) => t.flagLevel !== 'none');
  const checked = data.filter((t) => t.verified).length;
  const score = Math.max(0, 100 - 10 * pending.length - 4 * (data.length - checked));
  const level = score >= 85 ? { l: 'Excellent', c: '#1E9E6A' } : score >= 65 ? { l: 'Good', c: '#F5A623' } : { l: 'Needs care', c: '#E5484D' };

  const update = (id: string, fn: (t: Transaction) => Transaction) => setData((d) => d.map((t) => (t.id === id ? fn(t) : t)));
  const addEvent = (t: Transaction, action: string, detail: string, actor = 'You'): Transaction => ({
    ...t,
    auditTrail: [...t.auditTrail, { id: `EV-${Date.now()}-${t.auditTrail.length}`, timestamp: new Date().toISOString(), action, actor, detail }],
  });

  const submitReply = (t: Transaction, c: Choice, note: string) => {
    const ch = CHOICES.find((x) => x.key === c)!;
    update(t.id, (cur) => {
      let n: Transaction = { ...cur, ...(c === 'suspicious' ? { flagLevel: 'flagged' as const, flagReason: 'You marked this as suspicious' } : {}), responseStatus: c === 'suspicious' && cur.responseStatus !== 'pending' ? cur.responseStatus : ch.status, responseNote: note.trim() || null, respondedAt: new Date().toISOString() };
      n = addEvent(n, ch.action, note.trim() ? `You wrote: “${note.trim()}”` : 'You replied without a note');
      n = addEvent({ ...n, verified: true }, 'Record sealed', 'A new fingerprint was added to this record', 'UPI-TRACE');
      return { ...n, hash: makeHash(n) };
    });
    say('Reply saved and sealed');
  };
  const verify = (t: Transaction) => {
    update(t.id, (cur) => ({ ...addEvent({ ...cur, verified: true }, 'Record checked', 'Fingerprint matched. Nothing was changed.', 'UPI-TRACE'), hash: cur.hash }));
  };
  const checkAll = () => {
    setChecking(true);
    setTimeout(() => {
      data.filter((t) => !t.verified).forEach(verify);
      setChecking(false);
      say('All records checked. Nothing was changed.');
    }, 1200);
  };

  const list = useMemo(() => data.filter((t) => {
    const q = query.trim().toLowerCase();
    const okQ = !q || [t.senderName, t.senderVpa, t.id].some((x) => x.toLowerCase().includes(q));
    const okF = filter === 'all' || (filter === 'pending' && t.responseStatus === 'pending') || (filter === 'done' && t.responseStatus !== 'pending') || (filter === 'attention' && t.flagLevel !== 'none') || (filter === 'suspicious' && isSus(t)) || (filter === 'verified' && isVerifiedSender(t)) || (filter === 'unverified' && !isVerifiedSender(t));
    return okQ && okF;
  }), [data, query, filter]);

  const events = useMemo(() => data.flatMap((t) => t.auditTrail.map((e) => ({ ...e, tx: t }))).sort((a, b) => +new Date(b.timestamp) - +new Date(a.timestamp)), [data]);

  const csv = () => {
    const rows = [['Payment ID', 'Sender', 'UPI ID', 'Amount', 'Date', 'Status', 'Your note', 'Fingerprint'], ...data.map((t) => [t.id, t.senderName, t.senderVpa, t.amount, t.timestamp, STATUS[t.responseStatus].label, t.responseNote ?? '', t.hash])];
    const body = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([body], { type: 'text/csv' }));
    a.download = 'upi-trace-summary.csv';
    a.click();
    say('Summary downloaded');
  };
  const share = async () => {
    const text = `UPI-TRACE summary: ${data.length} payments, ${pending.length} waiting for a reply, ${checked} records checked.`;
    try {
      if (navigator.share) await navigator.share({ title: 'UPI-TRACE summary', text });
      else { await navigator.clipboard.writeText(text); say('Summary copied'); }
    } catch { /* cancelled */ }
  };

  const Chip = ({ t }: { t: Transaction }) => isSus(t) ? <span className="rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-bold text-red-600">Marked suspicious</span> : <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${STATUS[t.responseStatus].cls}`}>{STATUS[t.responseStatus].label}</span>;

  const Row = ({ t }: { t: Transaction }) => (
    <button onClick={() => setOpenId(t.id)} className="flex w-full items-center gap-3 rounded-2xl bg-white p-3.5 text-left shadow-card transition active:scale-[0.99]">
      <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-brand-light text-sm font-extrabold text-brand">{name(t).charAt(0)}</span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1 text-sm font-bold text-navy"><span className="truncate">{name(t)}</span>{isVerifiedSender(t) && <Tick />}</span>
        <span className="block truncate text-xs text-slate-500">{showIds ? t.senderVpa : 'UPI ID hidden'} · {relativeTime(t.timestamp)}</span>
        <span className="mt-1.5 flex flex-wrap gap-1.5"><Chip t={t} />{!isVerifiedSender(t) && <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">Not verified</span>}{t.flagLevel !== 'none' && !isSus(t) && <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${t.flagLevel === 'flagged' ? 'bg-red-50 text-red-600' : 'bg-brand-light text-brand'}`}>{t.flagLevel === 'flagged' ? 'Needs attention' : 'Check this'}</span>}</span>
      </span>
      <span className="text-sm font-extrabold tabular-nums text-navy">{formatCurrency(t.amount)}</span>
    </button>
  );

  const Title = ({ children, sub }: { children: ReactNode; sub?: string }) => (
    <div className="px-1 pb-1 pt-2"><h2 className="text-lg font-extrabold text-navy">{children}</h2>{sub && <p className="text-xs text-slate-500">{sub}</p>}</div>
  );

  return (
    <div className="relative flex h-full flex-col bg-[#F4F1FA] animate-slide-in">
      <header className="flex items-center gap-3 bg-brand px-4 pb-5 pt-6 text-white">
        <button onClick={onBack} aria-label="Back to PhonePe" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 active:scale-95"><ArrowLeft size={18} /></button>
        <div className="flex-1 leading-tight"><div className="flex items-center gap-1.5 text-base font-extrabold"><ShieldCheck size={18} /> UPI-TRACE</div><div className="text-xs text-white/75">Your UPI safety companion</div></div>
        <button onClick={() => setTab('more')} aria-label="Privacy" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15"><Lock size={16} /></button>
      </header>

      <main className="-mt-3 flex-1 space-y-3 overflow-y-auto rounded-t-3xl bg-[#F4F1FA] px-4 pb-24 pt-4">
        {tab === 'home' && (<>
          <div className="rounded-3xl bg-navy-hero p-5 text-white shadow-lg shadow-brand/25">
            <p className="text-xs text-white/75">Waiting for your reply</p>
            <p className="text-4xl font-extrabold">{pending.length}</p>
            <p className="mt-1 text-sm text-white/85">{pending.length ? 'Tell us about these payments while you remember the details.' : 'You are all caught up.'}</p>
            {pending.length > 0 && <button onClick={() => setOpenId(pending[0].id)} className="mt-4 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-brand active:scale-95">Reply now</button>}
          </div>
          <div className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-card">
            <svg width="88" height="88" viewBox="0 0 88 88" className="flex-shrink-0" role="img" aria-label={`Safety score ${score} out of 100`}>
              <circle cx="44" cy="44" r="36" fill="none" stroke="#F3ECFB" strokeWidth="9" />
              <circle cx="44" cy="44" r="36" fill="none" stroke={level.c} strokeWidth="9" strokeLinecap="round" strokeDasharray="226.2" strokeDashoffset={226.2 * (1 - score / 100)} transform="rotate(-90 44 44)" style={{ transition: 'stroke-dashoffset .6s' }} />
              <text x="44" y="50" textAnchor="middle" fontSize="22" fontWeight="800" fill="#241540">{score}</text>
            </svg>
            <div><p className="text-xs text-slate-500">Your UPI safety score</p><p className="text-lg font-extrabold" style={{ color: level.c }}>{level.l}</p><p className="text-xs text-slate-500">Reply to waiting payments and check your records to raise it.</p></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { l: 'Marked suspicious', v: String(data.filter(isSus).length), go: () => { setFilter('suspicious'); setTab('payments'); } },
              { l: 'Needs a closer look', v: String(attention.length), go: () => { setFilter('attention'); setTab('payments'); } },
              { l: 'Replied', v: `${data.length - pending.length} of ${data.length}`, go: () => { setFilter('done'); setTab('payments'); } },
              { l: 'Records checked', v: `${checked} of ${data.length}`, go: () => setTab('proof') },
            ].map((s) => (
              <button key={s.l} onClick={s.go} className="rounded-2xl bg-white p-4 text-left shadow-card active:scale-95"><p className="text-xs text-slate-500">{s.l}</p><p className="mt-1 text-lg font-extrabold text-navy">{s.v}</p></button>
            ))}
          </div>
          <Title sub="Tap one to reply">Needs your reply</Title>
          {pending.slice(0, 4).map((t) => <Row key={t.id} t={t} />)}
          {!pending.length && <p className="rounded-2xl bg-white p-4 text-center text-sm text-slate-500 shadow-card">Nothing waiting. Nice.</p>}
          <div className="rounded-3xl bg-red-50 p-5">
            <h3 className="flex items-center gap-2 text-sm font-bold text-red-700"><ShieldAlert size={18} />Lost money to a UPI scam?</h3>
            <p className="mt-1 text-xs text-red-700/80">Report it quickly. The sooner you call, the better the chance of stopping the transfer.</p>
            <div className="mt-3 flex gap-2"><a href="tel:1930" className="flex-1 rounded-full bg-red-600 py-2.5 text-center text-xs font-bold text-white active:scale-95">Call 1930</a><a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="flex-1 rounded-full bg-white py-2.5 text-center text-xs font-bold text-red-600 active:scale-95">Report online</a></div>
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-card">
            <h3 className="mb-3 text-sm font-bold text-navy">Stay safe on UPI</h3>
            {['You never need your UPI PIN to receive money. Never share it.', 'A request to “collect” or “approve” is you paying, not receiving.', 'If someone sends money by mistake and asks for it back, check with your bank first.', 'Do not click links or scan QR codes from people you do not know.'].map((tip) => (
              <p key={tip} className="mb-2 flex gap-2 text-sm text-slate-600 last:mb-0"><ShieldCheck size={16} className="mt-0.5 flex-shrink-0 text-brand" />{tip}</p>
            ))}
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-card">
            <h3 className="mb-3 text-sm font-bold text-navy">How it works</h3>
            {['A payment arrives and we note who sent it.', 'You accept it, reject it, or flag it as suspicious.', 'The record is sealed with a fingerprint, so changes can be spotted.'].map((s, i) => (
              <div key={s} className="mb-2.5 flex items-center gap-3 last:mb-0"><span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">{i + 1}</span><p className="text-sm text-slate-600">{s}</p></div>
            ))}
            <p className="mt-3 text-xs text-slate-400">UPI-TRACE only keeps your record. It does not decide if a payment is right or wrong.</p>
          </div>
        </>)}

        {tab === 'payments' && (<>
          <Title sub={`${list.length} shown`}>Payments</Title>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setFilter('verified')} className="flex items-center gap-3 rounded-2xl bg-white p-3.5 text-left shadow-card active:scale-95"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light"><Tick size={22} /></span><span><span className="block text-lg font-extrabold text-navy">{data.filter(isVerifiedSender).length}</span><span className="block text-xs text-slate-500">Verified senders</span></span></button>
            <button onClick={() => setFilter('unverified')} className="flex items-center gap-3 rounded-2xl bg-white p-3.5 text-left shadow-card active:scale-95"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500"><ShieldAlert size={20} /></span><span><span className="block text-lg font-extrabold text-navy">{data.filter((t) => !isVerifiedSender(t)).length}</span><span className="block text-xs text-slate-500">Not verified</span></span></button>
          </div>
          <label className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-card"><Search size={16} className="text-slate-400" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, UPI ID or payment ID" className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400" />
            {query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={16} className="text-slate-400" /></button>}
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {([['all', 'All'], ['pending', 'Waiting'], ['done', 'Replied'], ['attention', 'Needs a look'], ['verified', 'Verified'], ['unverified', 'Not verified'], ['suspicious', 'Suspicious']] as [Filter, string][]).map(([k, l]) => (
              <button key={k} onClick={() => setFilter(k)} className={`flex-shrink-0 rounded-full px-4 py-2 text-xs font-bold transition ${filter === k ? 'bg-brand text-white' : 'bg-white text-slate-600 shadow-card'}`}>{l}</button>
            ))}
          </div>
          {list.map((t) => <Row key={t.id} t={t} />)}
          {!list.length && <p className="py-10 text-center text-sm text-slate-500">No payments match. Try a different search.</p>}
        </>)}

        {tab === 'timeline' && (<>
          <Title sub="Newest first. Tap to open the payment.">Timeline</Title>
          <div className="relative ml-3 space-y-4 border-l-2 border-brand/20 pl-5">
            {events.slice(0, 40).map((e) => (
              <button key={e.id + e.tx.id} onClick={() => setOpenId(e.tx.id)} className="relative block w-full rounded-2xl bg-white p-3.5 text-left shadow-card active:scale-[0.99]">
                <span className="absolute -left-[29px] top-4 h-3.5 w-3.5 rounded-full border-2 border-white bg-brand" />
                <p className="text-sm font-bold text-navy">{e.action}</p>
                <p className="text-xs text-slate-600">{e.detail}</p>
                <p className="mt-1 text-[11px] text-slate-400">{name(e.tx)} · {formatDateTime(e.timestamp)}</p>
              </button>
            ))}
          </div>
        </>)}

        {tab === 'proof' && (<>
          <Title sub="Each record has a fingerprint. If it is edited later, the fingerprint stops matching.">Record check</Title>
          <div className="rounded-3xl bg-white p-5 text-center shadow-card">
            <div className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full ${checked === data.length ? 'bg-emerald-light text-emerald' : 'bg-brand-light text-brand'}`}><ShieldCheck size={32} className={checking ? 'animate-pulse' : ''} /></div>
            <p className="text-2xl font-extrabold text-navy">{checked} of {data.length}</p>
            <p className="mb-4 text-xs text-slate-500">records checked and untouched</p>
            <button disabled={checking || checked === data.length} onClick={checkAll} className="w-full rounded-full bg-brand py-3 text-sm font-bold text-white transition active:scale-95 disabled:opacity-50">{checking ? 'Checking…' : checked === data.length ? 'All records checked' : 'Check all records'}</button>
          </div>
          {data.map((t) => (
            <div key={t.id} className="flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-card">
              <span className={`flex h-10 w-10 items-center justify-center rounded-full ${t.verified ? 'bg-emerald-light text-emerald' : 'bg-amber-soft text-amber-dark'}`}>{t.verified ? <CheckCircle2 size={20} /> : <Clock3 size={20} />}</span>
              <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold text-navy">{name(t)}</span><span className="block truncate font-mono text-[11px] text-slate-400">{t.hash}</span></span>
              {!t.verified ? <button onClick={() => { verify(t); say('Record checked'); }} className="rounded-full bg-brand-light px-3.5 py-1.5 text-xs font-bold text-brand active:scale-95">Check</button> : <span className="text-xs font-semibold text-emerald-dark">Checked</span>}
            </div>
          ))}
        </>)}

        {tab === 'more' && (<>
          <Title sub="Share your record or change what shows on screen">Reports and privacy</Title>
          <div className="space-y-3 rounded-3xl bg-white p-5 shadow-card">
            <h3 className="text-sm font-bold text-navy">Reports</h3>
            <p className="text-xs text-slate-500">{data.length} payments, {pending.length} waiting, {checked} checked.</p>
            <button onClick={() => { saveReport(data, 'UPI-TRACE safety report', 'upi-trace-report.html'); say('Report downloaded'); }} className="flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3 text-sm font-bold text-white active:scale-95"><FileText size={16} />Download full report</button>
            <div className="flex gap-2">
              <button onClick={csv} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-light py-3 text-sm font-bold text-brand active:scale-95"><Download size={16} />CSV</button>
              <button onClick={share} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-light py-3 text-sm font-bold text-brand active:scale-95"><Share2 size={16} />Share</button>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-2 shadow-card">
            {[
              { l: 'Hide sender names', d: 'Blur names on this screen', v: hideNames, f: setHideNames, i: hideNames ? <EyeOff size={18} /> : <Eye size={18} /> },
              { l: 'Show UPI IDs', d: 'Show the ID under each name', v: showIds, f: setShowIds, i: <Lock size={18} /> },
            ].map((s) => (
              <button key={s.l} onClick={() => s.f(!s.v)} role="switch" aria-checked={s.v} className="flex w-full items-center gap-3 rounded-2xl p-3 text-left">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-light text-brand">{s.i}</span>
                <span className="flex-1"><span className="block text-sm font-bold text-navy">{s.l}</span><span className="block text-xs text-slate-500">{s.d}</span></span>
                <span className={`flex h-6 w-11 items-center rounded-full p-0.5 transition ${s.v ? 'bg-brand' : 'bg-slate-300'}`}><span className={`h-5 w-5 rounded-full bg-white shadow transition ${s.v ? 'translate-x-5' : ''}`} /></span>
              </button>
            ))}
          </div>
          <div className="rounded-3xl bg-white p-5 shadow-card">
            <h3 className="mb-1 text-sm font-bold text-navy">How your data is kept</h3>
            <p className="text-xs leading-relaxed text-slate-500">This is a practice version with sample data. Nothing leaves your device, and no real payments or UPI IDs are used.</p>
            <button onClick={() => { setData(() => demo); setFilter('all'); setQuery(''); say('Sample data restored'); }} className="mt-3 flex items-center gap-2 text-xs font-bold text-brand"><RotateCcw size={14} />Reset sample data</button>
          </div>
        </>)}
      </main>

      <nav className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-around border-t border-slate-200 bg-white px-1 py-2">
        {([['home', Home, 'Home'], ['payments', ArrowLeftRight, 'Payments'], ['timeline', Clock3, 'Timeline'], ['proof', ShieldCheck, 'Check'], ['more', MoreHorizontal, 'More']] as [Tab, typeof Home, string][]).map(([k, Icon, l]) => (
          <button key={k} onClick={() => setTab(k)} className={`relative flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-[11px] font-semibold ${tab === k ? 'text-brand' : 'text-slate-400'}`}>
            <span className={`flex h-7 w-12 items-center justify-center rounded-full transition ${tab === k ? 'bg-brand-light' : ''}`}><Icon size={20} /></span>{l}
            {k === 'payments' && pending.length > 0 && <span className="absolute right-3 top-0 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />}
          </button>
        ))}
      </nav>

      {open && <Sheet t={open} name={name(open)} onClose={() => setOpenId(null)} onReply={submitReply} onVerify={() => { verify(open); say('Record checked'); }} onDownload={() => { saveReport([open], `Payment report ${open.id}`, `upi-trace-${open.id}.html`); say('Report downloaded'); }} />}
      {toast && <div className="absolute inset-x-6 bottom-24 z-50 rounded-full bg-navy px-4 py-3 text-center text-sm font-semibold text-white shadow-xl animate-slide-up" role="status">{toast}</div>}
    </div>
  );
}

function Sheet({ t, name, onClose, onReply, onVerify, onDownload }: { t: Transaction; name: string; onClose: () => void; onReply: (t: Transaction, c: Choice, n: string) => void; onVerify: () => void; onDownload: () => void }) {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [note, setNote] = useState('');
  const isPending = t.responseStatus === 'pending';
  return (
    <div className="absolute inset-0 z-40 flex items-end bg-brand-deep/50 animate-fade-in" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="max-h-[90%] w-full overflow-y-auto rounded-t-[2rem] bg-white px-5 pb-8 pt-3 animate-slide-up">
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-slate-200" />
        <div className="flex items-start justify-between">
          <div><p className="text-xs text-slate-500">Payment from</p><h3 className="flex items-center gap-1.5 text-lg font-extrabold text-navy">{name}{isVerifiedSender(t) && <Tick size={20} />}</h3><p className="text-xs text-slate-500">{t.id} · {formatDateTime(t.timestamp)}</p></div>
          <button onClick={onClose} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100"><X size={16} /></button>
        </div>
        <p className="my-3 text-3xl font-extrabold text-brand">{formatCurrency(t.amount)}</p>
        <p className={`mb-3 rounded-2xl p-3 text-xs font-medium ${isVerifiedSender(t) ? 'bg-brand-light text-brand' : 'bg-slate-100 text-slate-600'}`}>{isVerifiedSender(t) ? 'Verified sender: you have dealt with them before and nothing looks risky.' : 'Not verified: you have not dealt with this sender before, or something about them looks risky. Be careful.'}</p>
        {t.flagReason && <p className="mb-3 rounded-2xl bg-amber-soft p-3 text-xs font-medium text-amber-dark">Why it was flagged: {t.flagReason}</p>}
        <div className="mb-4 grid grid-cols-2 gap-2 text-xs">
          {[['Relationship', t.context.relation], ['Occasion', t.context.occasion], ['Dealt before', t.context.priorContact ? 'Yes' : 'No'], ['Purpose given', t.context.declaredPurpose ?? 'None']].map(([k, v]) => (
            <div key={k} className="rounded-2xl bg-brand-light/60 p-3"><p className="text-slate-500">{k}</p><p className="font-bold text-navy">{v}</p></div>
          ))}
        </div>

        {isPending ? (<>
          <h4 className="mb-2 text-sm font-bold text-navy">What would you like to do?</h4>
          <div className="space-y-2">
            {CHOICES.map((c) => (
              <button key={c.key} onClick={() => setChoice(c.key)} className={`flex w-full items-center gap-3 rounded-2xl border-2 p-3.5 text-left transition ${choice === c.key ? 'border-brand bg-brand-light' : 'border-slate-100'}`}>
                <span className={`flex h-10 w-10 items-center justify-center rounded-full ${choice === c.key ? 'bg-brand text-white' : 'bg-brand-light text-brand'}`}>{c.icon}</span>
                <span><span className="block text-sm font-bold text-navy">{c.title}</span><span className="block text-xs text-slate-500">{c.desc}</span></span>
              </button>
            ))}
          </div>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="Add a note in your own words (optional)" className="mt-3 w-full resize-none rounded-2xl border border-slate-200 p-3 text-sm outline-none focus:border-brand" />
          <button disabled={!choice} onClick={() => choice && onReply(t, choice, note)} className="mt-3 w-full rounded-full bg-brand py-3.5 text-sm font-bold text-white transition active:scale-95 disabled:opacity-40">Confirm</button>
        </>) : (
          <div className="mb-4 rounded-2xl bg-emerald-light p-4"><div className="mb-1 flex items-center justify-between"><span className="text-sm font-bold text-emerald-dark">{STATUS[t.responseStatus].label}</span><span className="text-[11px] text-slate-500">{t.respondedAt ? formatDateTime(t.respondedAt) : ''}</span></div><p className="text-sm text-slate-700">{t.responseNote ?? 'No note added.'}</p></div>
        )}

        {!isPending && !isSus(t) && <button onClick={() => onReply(t, 'suspicious', '')} className="mb-4 flex w-full items-center justify-center gap-2 rounded-full border-2 border-red-200 py-3 text-sm font-bold text-red-600 active:scale-95"><ShieldAlert size={16} />Flag as suspicious</button>}
        {isSus(t) && <div className="mb-4 rounded-2xl bg-red-50 p-4"><p className="text-sm font-bold text-red-700">You marked this as suspicious</p><p className="mt-1 text-xs text-red-700/80">Do not send money back or share your UPI PIN. If you think it is a scam, report it.</p><div className="mt-3 flex gap-2"><a href="tel:1930" className="flex-1 rounded-full bg-red-600 py-2.5 text-center text-xs font-bold text-white">Call 1930</a><a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="flex-1 rounded-full bg-white py-2.5 text-center text-xs font-bold text-red-600">Report online</a></div></div>}
        <h4 className="mb-2 mt-5 text-sm font-bold text-navy">What happened</h4>
        <div className="ml-2 space-y-3 border-l-2 border-brand/20 pl-4">
          {[...t.auditTrail].reverse().map((e) => (
            <div key={e.id} className="relative"><span className="absolute -left-[22px] top-1 h-3 w-3 rounded-full border-2 border-white bg-brand" /><p className="text-sm font-bold text-navy">{e.action}</p><p className="text-xs text-slate-600">{e.detail}</p><p className="text-[11px] text-slate-400">{formatDateTime(e.timestamp)}</p></div>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-slate-50 p-3">
          <div className="min-w-0"><p className="text-[11px] text-slate-500">Record fingerprint</p><p className="truncate font-mono text-xs text-navy">{t.hash}</p></div>
          {t.verified ? <span className="flex items-center gap-1 text-xs font-bold text-emerald-dark"><CheckCircle2 size={14} />Checked</span> : <button onClick={onVerify} className="rounded-full bg-brand px-4 py-2 text-xs font-bold text-white active:scale-95">Check now</button>}
        </div>
        <button onClick={onDownload} className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-brand py-3.5 text-sm font-bold text-white active:scale-95"><FileText size={16} />Download report</button>

      </div>
    </div>
  );
}
