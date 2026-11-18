import { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    errorMessage: '',
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error?.message || 'Unexpected application error',
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Hands & Head HR runtime error:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('hh_hr_candidates_v2');
      localStorage.removeItem('hh_hr_requisitions_v2');
      localStorage.removeItem('hh_hr_locale_v2');
      if (typeof indexedDB !== 'undefined') {
        indexedDB.deleteDatabase('hh_hr_vault_v1');
      }
    } catch {
      // ignore storage errors
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-[#121212] border-2 border-[#FF5500] p-8 space-y-5">
            <p className="font-mono text-xs uppercase text-[#e11d48] font-bold">
              SYSTEM RECOVERY MODE
            </p>
            <h1 className="text-2xl font-bold text-white">
              HANDS &amp; HEAD HR — RECOVERY
            </h1>
            <p className="font-mono text-xs text-[#A1A1AA] break-words">
              {this.state.errorMessage}
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="w-full min-h-[68px] bg-[#FF5500] hover:bg-[#ff6a1a] text-black font-bold text-sm uppercase tracking-wider cursor-pointer"
            >
              RESET LOCAL CACHE &amp; RELOAD
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
