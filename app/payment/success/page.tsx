"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { CheckCircle, ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const jobId = searchParams.get(" jobId") || searchParams.get("jobId");

  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] rounded-full bg-emerald-400/3 blur-[80px] pointer-events-none" />

      {/* Confetti particles */}
      {showConfetti &&
        Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: [
                "#10b981",
                "#34d399",
                "#6ee7b7",
                "#fbbf24",
                "#f59e0b",
                "#a78bfa",
                "#818cf8",
                "#f472b6",
              ][i % 8],
              left: `${Math.random() * 100}%`,
              top: "-5%",
            }}
            animate={{
              y: ["0vh", `${80 + Math.random() * 30}vh`],
              x: [0, (Math.random() - 0.5) * 200],
              rotate: [0, Math.random() * 720],
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 2.5 + Math.random() * 2,
              delay: Math.random() * 1.5,
              ease: "easeOut",
            }}
          />
        ))}

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg"
      >
        <div className="relative bg-[#0a0a0a] border border-white/6 rounded-2xl overflow-hidden">
          {/* Top gradient accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-emerald-500 to-transparent" />

          <div className="p-8 sm:p-10 flex flex-col items-center text-center">
            {/* Animated checkmark */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="relative mb-6"
            >
              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 rounded-full bg-emerald-500/20"
                animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                style={{ width: 80, height: 80 }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-emerald-500/10"
                animate={{ scale: [1, 2.2], opacity: [0.3, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.3,
                }}
                style={{ width: 80, height: 80 }}
              />

              <div className="relative w-20 h-20 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="flex items-center gap-2 justify-center mb-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                  Payment Confirmed
                </span>
                <Sparkles className="w-4 h-4 text-emerald-400" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                You&apos;re All Set!
              </h1>
              <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
                Your payment has been processed successfully. Your job listing
                is now live and visible to thousands of candidates.
              </p>
            </motion.div>

            {/* Details card */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="w-full mt-8 bg-white/3 border border-white/6 rounded-xl p-5 space-y-3"
            >
              {sessionId && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    Transaction ID
                  </span>
                  <span className="text-xs text-gray-300 font-mono bg-white/4 px-2.5 py-1 rounded-md max-w-[200px] truncate">
                    {sessionId.slice(0, 20)}...
                  </span>
                </div>
              )}
              {jobId && (
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    Job ID
                  </span>
                  <span className="text-xs text-gray-300 font-mono bg-white/4 px-2.5 py-1 rounded-md max-w-[200px] truncate">
                    {jobId.slice(0, 20)}...
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  Status
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="w-full mt-8 flex flex-col gap-3"
            >
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full h-12 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-[0_4px_20px_rgba(16,185,129,0.25)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => router.push("/")}
                className="w-full h-11 bg-white/4 hover:bg-white/8 border border-white/6 text-gray-300 text-sm font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </motion.div>
          </div>

          {/* Bottom decoration */}
          <div className="h-px bg-linear-to-r from-transparent via-white/6 to-transparent" />
          <div className="px-8 py-4 flex items-center justify-center">
            <p className="text-[11px] text-gray-600">
              A confirmation email has been sent to your inbox.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-gray-700 border-t-emerald-500 rounded-full animate-spin" />
            <p className="text-sm text-gray-400">Verifying payment...</p>
          </div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
