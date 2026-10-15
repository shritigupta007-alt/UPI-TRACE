import { useState } from 'react';
import type { PageKey, Transaction } from '@/types';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import PageHeader from '@/components/PageHeader';
import OverviewPage from '@/pages/OverviewPage';
import TransactionsPage from '@/pages/TransactionsPage';
import ResponsePage from '@/pages/ResponsePage';
import TimelinePage from '@/pages/TimelinePage';
import VerificationPage from '@/pages/VerificationPage';
import ReportsPage from '@/pages/ReportsPage';
import PrivacyPage from '@/pages/PrivacyPage';
import TransactionDrawer from '@/components/TransactionDrawer';
import LoginPage from '@/pages/LoginPage';
import { Download } from 'lucide-react';

const pageInfo: Record<PageKey, { title: string; breadcrumb: string; subtitle: string }> = {
  overview: { title: 'Overview', breadcrumb: 'Workspace', subtitle: 'Dashboard summary of simulated transactions, responses, and flagged items.' },
  transactions: { title: 'Transactions', breadcrumb: 'Workspace', subtitle: 'Complete log of incoming UPI payments with sender risk assessment and response status.' },
  response: { title: 'Recipient Response', breadcrumb: 'Workspace', subtitle: 'Declarations and recorded responses from the recipient for each transaction.' },
  timeline: { title: 'Evidence Timeline', breadcrumb: 'Workspace', subtitle: 'Unified chronological audit trail across all transactions and events.' },
  verification: { title: 'Integrity Verification', breadcrumb: 'Workspace', subtitle: 'Cryptographic hash verification for each transaction audit trail.' },
  reports: { title: 'Evidence Reports', breadcrumb: 'Workspace', subtitle: 'Exportable evidence summaries combining transaction records, declarations, and audit metadata.' },
  privacy: { title: 'Privacy & Access', breadcrumb: 'Workspace', subtitle: 'Data inventory, encryption, retention policies, and access control configuration.' },
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageKey>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const handleNavigate = (page: PageKey) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  const info = pageInfo[currentPage];

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-navy antialiased">
      <Sidebar
        current={currentPage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar
          pageTitle={info.title}
          pageBreadcrumb={info.breadcrumb}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto scrollbar-thin bg-slate-50">
          <div className="px-4 lg:px-8 py-6 max-w-[1600px] mx-auto">
            <PageHeader
              title={info.title}
              subtitle={info.subtitle}
              actions={
                <button className="hidden sm:inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 hover:text-navy transition-colors">
                  <Download size={14} />
                  Export
                </button>
              }
            />
            {currentPage === 'overview' && (
              <OverviewPage onNavigate={handleNavigate} onSelectTransaction={setSelectedTx} />
            )}
            {currentPage === 'transactions' && (
              <TransactionsPage onSelectTransaction={setSelectedTx} />
            )}
            {currentPage === 'response' && (
              <ResponsePage onSelectTransaction={setSelectedTx} />
            )}
            {currentPage === 'timeline' && <TimelinePage />}
            {currentPage === 'verification' && <VerificationPage />}
            {currentPage === 'reports' && <ReportsPage onNavigate={handleNavigate} />}
            {currentPage === 'privacy' && <PrivacyPage />}
          </div>
        </main>
      </div>
      <TransactionDrawer transaction={selectedTx} onClose={() => setSelectedTx(null)} />
    </div>
  );
}

export default App;
