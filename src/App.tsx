import { useCallback, useEffect, useState } from 'react';
import { Activity, Plus } from 'lucide-react';
import type {
  AppMode,
  Candidate,
  InfoModalType,
  JobRequisition,
  Locale,
  TopNavSection,
  WorkspaceTab,
} from './types.ts';
import { TRANSLATIONS } from './i18n.ts';
import { PARTNER_HUBS } from './data/initialData.ts';
import { useRecruitmentSync } from './sync/engine.ts';
import { CyberOverlay } from './components/CyberOverlay.tsx';
import { TopAllianceHeader } from './components/TopAllianceHeader.tsx';
import { PublicHomePage } from './components/PublicHomePage.tsx';
import { LegalProtectionModal } from './components/LegalProtectionModal.tsx';
import { InfoModal } from './components/InfoModal.tsx';
import { Footer } from './components/Footer.tsx';
import { ApplicationWizardModal } from './components/ApplicationWizardModal.tsx';
import { AuditSyncDrawer } from './components/AuditSyncDrawer.tsx';
import { Sidebar } from './components/Sidebar.tsx';
import { OverviewView } from './components/OverviewView.tsx';
import { CandidatesView } from './components/CandidatesView.tsx';
import { JobOrdersView } from './components/JobOrdersView.tsx';
import { ComplianceView } from './components/ComplianceView.tsx';
import { PartnersView } from './components/PartnersView.tsx';
import { RegisterCandidateModal } from './components/RegisterCandidateModal.tsx';
import { CreateRequisitionModal } from './components/CreateRequisitionModal.tsx';

const STORAGE_LOCALE_KEY = 'hh_hr_locale_v2';

export function App() {
  const [mode, setMode] = useState<AppMode>('public');
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('overview');
  const [overlayEnabled, setOverlayEnabled] = useState(true);

  const [locale, setLocale] = useState<Locale>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_LOCALE_KEY);
      if (saved === 'bn' || saved === 'ja' || saved === 'en' || saved === 'vi') {
        return saved;
      }
    } catch {
      // ignore storage errors
    }
    return 'bn';
  });

  const {
    candidates,
    requisitions,
    auditLogs,
    outboxCount,
    syncMode,
    lastSyncAt,
    quotaNotice,
    clearQuotaNotice,
    flushOutbox,
    uploadDocumentFile,
    submitCandidate,
    advanceCandidateStage,
    toggleCandidateChecklist,
    assignCandidateRequisition,
    createJobOrder,
  } = useRecruitmentSync();

  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [trackerQuery, setTrackerQuery] = useState<string>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      return params.get('track') ?? '';
    } catch {
      return '';
    }
  });
  const [wizardStep, setWizardStep] = useState<1 | 2 | null>(null);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [infoModal, setInfoModal] = useState<InfoModalType>(null);
  const [showAuditDrawer, setShowAuditDrawer] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCreateReqModal, setShowCreateReqModal] = useState(false);

  useEffect(() => {
    document.documentElement.lang = locale;
    try {
      localStorage.setItem(STORAGE_LOCALE_KEY, locale);
    } catch {
      // ignore storage errors
    }
  }, [locale]);

  const t = TRANSLATIONS[locale];

  const handleNavigateSection = useCallback((section: TopNavSection) => {
    if (section === 'home') {
      setMode('public');
      setInfoModal(null);
      setShowLegalModal(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (section === 'demands') {
      setMode('public');
      setInfoModal(null);
      setShowLegalModal(false);
      window.setTimeout(() => {
        document
          .getElementById('job-demands-matrix')
          ?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
      return;
    }
    if (section === 'legal') {
      setInfoModal(null);
      setShowLegalModal(true);
      return;
    }
    setShowLegalModal(false);
    setInfoModal(section);
  }, []);

  const handleWizardSubmit = async (newCandidate: Candidate, englishScore: number) => {
    await submitCandidate(newCandidate, 'PUBLIC_APPLICANT', englishScore);
    setSelectedCandidateId(newCandidate.id);
    setTrackerQuery(newCandidate.id);
  };

  const handleRegisterCandidate = async (newCandidate: Candidate) => {
    await submitCandidate(newCandidate, 'SILVER_GROUP_DESK', 3);
    setSelectedCandidateId(newCandidate.id);
    setActiveTab('candidates');
    setShowRegisterModal(false);
  };

  const handleCreateRequisition = async (newReq: JobRequisition) => {
    await createJobOrder(newReq);
    setActiveTab('jobs');
    setShowCreateReqModal(false);
  };

  const pendingComplianceCount = candidates.filter(
    (c) =>
      c.stage === 'Medical Fit' ||
      c.stage === 'COE / Embassy Attestation' ||
      c.stage === 'BMET Smart Card',
  ).length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col relative">
      <CyberOverlay enabled={overlayEnabled} />

      <TopAllianceHeader
        mode={mode}
        onToggleMode={setMode}
        locale={locale}
        onChangeLocale={setLocale}
        overlayEnabled={overlayEnabled}
        onToggleOverlay={() => setOverlayEnabled((v) => !v)}
        onNavigateSection={handleNavigateSection}
        t={t}
      />

      {quotaNotice && (
        <div className="relative z-20 bg-[#e11d48] text-white px-6 py-2.5 flex items-center justify-between text-xs font-brutal-mono font-bold">
          <span>{quotaNotice}</span>
          <button
            type="button"
            onClick={clearQuotaNotice}
            className="underline cursor-pointer"
          >
            DISMISS
          </button>
        </div>
      )}

      {mode === 'public' ? (
        <main className="flex-1 relative z-10">
          <PublicHomePage
            t={t}
            candidates={candidates}
            requisitions={requisitions}
            trackerQuery={trackerQuery}
            onTrackerQueryChange={setTrackerQuery}
            onOpenWizard={(step) => setWizardStep(step)}
            onOpenLegalModal={() => setShowLegalModal(true)}
          />
        </main>
      ) : (
        <div className="flex-1 flex flex-col lg:flex-row relative z-10">
          <Sidebar
            activeTab={activeTab}
            onSelectTab={setActiveTab}
            t={t}
            counts={{
              candidates: candidates.length,
              openJobs: requisitions.filter((r) => r.status !== 'Closed').length,
              pendingCompliance: pendingComplianceCount,
            }}
          />

          <div className="flex-1 flex flex-col min-w-0">
            <div className="bg-[#121212] border-b-2 border-[#27272a] px-6 py-3 flex flex-wrap items-center justify-between gap-4">
              <div className="font-brutal-mono text-xs text-[#A1A1AA] uppercase truncate">
                <span className="text-[#FF5500] font-bold">COMMAND CENTER</span>
                <span className="mx-2">/</span>
                <span className="text-white">{t.nav[activeTab]}</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowAuditDrawer(true)}
                  className="min-h-[48px] px-4 border-2 border-[#27272a] hover:border-[#f59e0b] bg-[#18181b] text-white font-brutal-mono text-xs font-bold flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <Activity className="w-4 h-4 text-[#f59e0b]" aria-hidden="true" />
                  <span>AUDIT &amp; SYNC ({auditLogs.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowRegisterModal(true)}
                  className="min-h-[48px] px-5 bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4" aria-hidden="true" />
                  <span>{t.actions.registerCandidate}</span>
                </button>
              </div>
            </div>

            <main className="flex-1 p-5 sm:p-8 max-w-[1440px] w-full mx-auto">
              {activeTab === 'overview' && (
                <OverviewView
                  candidates={candidates}
                  requisitions={requisitions}
                  t={t}
                  onNavigate={setActiveTab}
                  onSelectCandidate={setSelectedCandidateId}
                />
              )}

              {activeTab === 'candidates' && (
                <CandidatesView
                  candidates={candidates}
                  requisitions={requisitions}
                  t={t}
                  selectedCandidateId={selectedCandidateId}
                  onSelectCandidate={setSelectedCandidateId}
                  onAdvanceStage={(id) => {
                    void advanceCandidateStage(id);
                  }}
                  onToggleChecklist={(id, key) => {
                    void toggleCandidateChecklist(id, key);
                  }}
                  onAssignRequisition={(id, reqId) => {
                    void assignCandidateRequisition(id, reqId);
                  }}
                  onOpenRegisterModal={() => setShowRegisterModal(true)}
                />
              )}

              {activeTab === 'jobs' && (
                <JobOrdersView
                  requisitions={requisitions}
                  candidates={candidates}
                  t={t}
                  onOpenCreateModal={() => setShowCreateReqModal(true)}
                  onSelectCandidate={(id) => {
                    setSelectedCandidateId(id);
                    setActiveTab('candidates');
                  }}
                />
              )}

              {activeTab === 'compliance' && (
                <ComplianceView
                  candidates={candidates}
                  t={t}
                  onToggleChecklist={(id, key) => {
                    void toggleCandidateChecklist(id, key);
                  }}
                  onSelectCandidate={(id) => {
                    setSelectedCandidateId(id);
                    setActiveTab('candidates');
                  }}
                />
              )}

              {activeTab === 'partners' && (
                <PartnersView hubs={PARTNER_HUBS} t={t} />
              )}
            </main>
          </div>
        </div>
      )}

      <Footer t={t} onNavigateSection={handleNavigateSection} />

      {/* Public Modals */}
      {wizardStep !== null && (
        <ApplicationWizardModal
          t={t}
          initialStep={wizardStep}
          onClose={() => setWizardStep(null)}
          onUploadDocument={uploadDocumentFile}
          onSubmitCandidate={handleWizardSubmit}
          onJumpToTracker={(id) => {
            setTrackerQuery(id);
            setWizardStep(null);
            setTimeout(() => {
              document.getElementById('live-tracker')?.scrollIntoView({ behavior: 'smooth' });
            }, 80);
          }}
        />
      )}

      {showLegalModal && (
        <LegalProtectionModal
          t={t}
          onClose={() => setShowLegalModal(false)}
        />
      )}

      {infoModal !== null && (
        <InfoModal
          type={infoModal}
          t={t}
          onClose={() => setInfoModal(null)}
        />
      )}

      {showAuditDrawer && (
        <AuditSyncDrawer
          syncMode={syncMode}
          outboxCount={outboxCount}
          lastSyncAt={lastSyncAt}
          auditLogs={auditLogs}
          requisitions={requisitions}
          candidates={candidates}
          onFlushOutbox={() => {
            void flushOutbox();
          }}
          onClose={() => setShowAuditDrawer(false)}
        />
      )}

      {/* Command Center Modals */}
      {showRegisterModal && (
        <RegisterCandidateModal
          t={t}
          requisitions={requisitions}
          onClose={() => setShowRegisterModal(false)}
          onSubmit={(cand) => {
            void handleRegisterCandidate(cand);
          }}
        />
      )}

      {showCreateReqModal && (
        <CreateRequisitionModal
          t={t}
          onClose={() => setShowCreateReqModal(false)}
          onSubmit={(req) => {
            void handleCreateRequisition(req);
          }}
        />
      )}
    </div>
  );
}

export default App;
