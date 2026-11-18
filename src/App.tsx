import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import {
  AppMode,
  Candidate,
  ComplianceChecklist,
  JobRequisition,
  Locale,
  WorkspaceTab,
} from './types';
import { TRANSLATIONS } from './i18n';
import {
  INITIAL_CANDIDATES,
  INITIAL_REQUISITIONS,
  PARTNER_HUBS,
  PIPELINE_STAGES,
} from './data/initialData';
import { CyberOverlay } from './components/CyberOverlay';
import { TopAllianceHeader } from './components/TopAllianceHeader';
import { PublicHomePage } from './components/PublicHomePage';
import { LegalProtectionModal } from './components/LegalProtectionModal';
import { ApplicationWizardModal } from './components/ApplicationWizardModal';
import { Sidebar } from './components/Sidebar';
import { OverviewView } from './components/OverviewView';
import { CandidatesView } from './components/CandidatesView';
import { JobOrdersView } from './components/JobOrdersView';
import { ComplianceView } from './components/ComplianceView';
import { PartnersView } from './components/PartnersView';
import { RegisterCandidateModal } from './components/RegisterCandidateModal';
import { CreateRequisitionModal } from './components/CreateRequisitionModal';

const STORAGE_CANDIDATES_KEY = 'hh_hr_candidates_v2';
const STORAGE_REQS_KEY = 'hh_hr_requisitions_v2';
const STORAGE_LOCALE_KEY = 'hh_hr_locale_v2';

export function App() {
  const [mode, setMode] = useState<AppMode>('public');
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('overview');
  const [overlayEnabled, setOverlayEnabled] = useState(true);

  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem(STORAGE_LOCALE_KEY);
    if (saved === 'bn' || saved === 'ja' || saved === 'en' || saved === 'vi') {
      return saved;
    }
    return 'bn';
  });

  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_CANDIDATES_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed as Candidate[];
        }
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_CANDIDATES;
  });

  const [requisitions, setRequisitions] = useState<JobRequisition[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_REQS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed as JobRequisition[];
        }
      }
    } catch {
      // ignore storage errors
    }
    return INITIAL_REQUISITIONS;
  });

  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [trackerQuery, setTrackerQuery] = useState<string>('');
  const [wizardStep, setWizardStep] = useState<1 | 2 | null>(null);
  const [showLegalModal, setShowLegalModal] = useState(false);
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

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CANDIDATES_KEY, JSON.stringify(candidates));
    } catch {
      // ignore storage errors
    }
  }, [candidates]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_REQS_KEY, JSON.stringify(requisitions));
    } catch {
      // ignore storage errors
    }
  }, [requisitions]);

  const t = TRANSLATIONS[locale];

  const handleAdvanceStage = (candidateId: string) => {
    const today = new Date().toISOString().slice(0, 10);
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id !== candidateId) return c;
        const idx = PIPELINE_STAGES.indexOf(c.stage);
        if (idx === -1 || idx >= PIPELINE_STAGES.length - 1) return c;
        const nextStage = PIPELINE_STAGES[idx + 1];
        return { ...c, stage: nextStage, updatedAt: today };
      }),
    );
  };

  const handleToggleChecklist = (
    candidateId: string,
    key: keyof ComplianceChecklist,
  ) => {
    const today = new Date().toISOString().slice(0, 10);
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id !== candidateId) return c;
        return {
          ...c,
          updatedAt: today,
          checklist: {
            ...c.checklist,
            [key]: !c.checklist[key],
          },
        };
      }),
    );
  };

  const handleAssignRequisition = (candidateId: string, reqId: string | null) => {
    const req = requisitions.find((r) => r.id === reqId);
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id !== candidateId) return c;
        return {
          ...c,
          assignedRequisitionId: reqId,
          targetPrefecture: req ? req.prefecture : c.targetPrefecture,
        };
      }),
    );
  };

  const handleWizardSubmit = (newCandidate: Candidate) => {
    setCandidates((prev) => [newCandidate, ...prev]);
    setSelectedCandidateId(newCandidate.id);
    setTrackerQuery(newCandidate.id);
  };

  const handleRegisterCandidate = (newCandidate: Candidate) => {
    setCandidates((prev) => [newCandidate, ...prev]);
    setSelectedCandidateId(newCandidate.id);
    setActiveTab('candidates');
    setShowRegisterModal(false);
  };

  const handleCreateRequisition = (newReq: JobRequisition) => {
    setRequisitions((prev) => [newReq, ...prev]);
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
        t={t}
      />

      {mode === 'public' ? (
        <main className="flex-1 relative z-10">
          <PublicHomePage
            t={t}
            candidates={candidates}
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
            <div className="bg-[#121212] border-b-2 border-[#27272a] px-6 py-3 flex items-center justify-between gap-6">
              <div className="font-brutal-mono text-xs text-[#A1A1AA] uppercase truncate">
                <span className="text-[#FF5500] font-bold">COMMAND CENTER</span>
                <span className="mx-2">/</span>
                <span className="text-white">{t.nav[activeTab]}</span>
              </div>

              <button
                type="button"
                onClick={() => setShowRegisterModal(true)}
                className="min-h-[48px] px-5 bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>{t.actions.registerCandidate}</span>
              </button>
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
                  onAdvanceStage={handleAdvanceStage}
                  onToggleChecklist={handleToggleChecklist}
                  onAssignRequisition={handleAssignRequisition}
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
                  onToggleChecklist={handleToggleChecklist}
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

      {/* Public Modals */}
      {wizardStep !== null && (
        <ApplicationWizardModal
          t={t}
          initialStep={wizardStep}
          onClose={() => setWizardStep(null)}
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

      {/* Command Center Modals */}
      {showRegisterModal && (
        <RegisterCandidateModal
          t={t}
          requisitions={requisitions}
          onClose={() => setShowRegisterModal(false)}
          onSubmit={handleRegisterCandidate}
        />
      )}

      {showCreateReqModal && (
        <CreateRequisitionModal
          t={t}
          onClose={() => setShowCreateReqModal(false)}
          onSubmit={handleCreateRequisition}
        />
      )}
    </div>
  );
}

export default App;
