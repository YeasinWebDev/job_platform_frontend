"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-6xl font-bold mb-4">500</h1>
            <p className="text-xl text-gray-400 mb-2">Something went wrong</p>
            <p className="text-sm text-gray-500 mb-8">
              An unexpected error occurred. Please try again.
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={reset}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
              >
                Try Again
              </button>
              <a
                href="/"
                className="px-6 py-3 border border-gray-600 text-white rounded-lg hover:bg-white/10 transition"
              >
                Go Home
              </a>
            </div>
            {error?.digest && (
              <p className="mt-8 text-xs text-gray-600 break-all">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}