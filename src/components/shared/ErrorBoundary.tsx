// //import { Component, ErrorInfo, ReactNode } from "react";
// import React from "react";
// import type { ReactNode, ErrorInfo } from "react";

// interface Props {
//   children: ReactNode;
// }
// interface State {
//   hasError: boolean;
//   error?: any;
// }

// export class ErrorBoundary extends Component<Props, State> {
//   state: State = { hasError: false };
//   static getDerivedStateFromError(error: any) {
//     return { hasError: true, error };
//   }
//   componentDidCatch(error: Error, info: ErrorInfo) {
//     console.error(error, info);
//   }
//   render() {
//     if (this.state.hasError) {
//       return (
//         <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
//           <div className="glass rounded-2xl p-8 max-w-md text-center">
//             <div className="text-6xl mb-4">⚠️</div>
//             <h2 className="text-2xl font-bold text-white mb-2">
//               Something went wrong
//             </h2>
//             <p className="text-slate-300 mb-6">
//               An unexpected error occurred. Please reload the app.
//             </p>
//             <button
//               onClick={() => window.location.reload()}
//               className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold hover:scale-105 transition-transform"
//             >
//               Reload
//             </button>
//           </div>
//         </div>
//       );
//     }
//     return this.props.children;
//   }
// }

import  { Component } from "react";
import type { ReactNode, ErrorInfo } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: unknown;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-slate-950 via-indigo-950 to-purple-950">
          <div className="glass rounded-2xl p-8 max-w-md text-center">
            <div className="text-6xl mb-4">⚠️</div>

            <h2 className="text-2xl font-bold text-white mb-2">
              Something went wrong
            </h2>

            <p className="text-slate-300 mb-6">
              An unexpected error occurred. Please reload the app.
            </p>

            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold hover:scale-105 transition-transform"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}