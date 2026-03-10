"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { loginUser, registerUser } from "@/app/services/auth/auth";
import { FormState, Mode } from "@/types/loginTypes";


export default function AuthPage() {
  const [mode, setMode] = useState<Mode>("signin");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [remember, setRemember] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const f = (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const switchMode = (m: Mode) => {
    if (m === mode) return;
    setMode(m);
    setForm({ name: "", email: "", password: "", confirm: "" });
  };

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!form.email.trim() || !form.password.trim()) {
      setIsSubmitting(false);
      return toast.error("Please enter email and password");
    } else {
      await loginUser(form.email, form.password);

      // reset
      setForm({ name: "", email: "", password: "", confirm: "" });
      toast.success("Login Successful");
      setIsSubmitting(false);
    }
  };

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!form.email.trim() || !form.password.trim()) {
      setIsSubmitting(false);
      return toast.error("Please enter email and password");
    } else {
      await registerUser(form.name, form.email, form.password);

      // reset
      setForm({ name: "", email: "", password: "", confirm: "" });
      toast.success("Registration Successful");
      setIsSubmitting(false);
    }
  };

  const passwordsMatch = form.confirm.length > 0 && form.confirm === form.password;
  const passwordsMismatch = form.confirm.length > 0 && form.confirm !== form.password;

  // shared input class
  const input =
    "w-full bg-[#1c1c1c] border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-primary focus:bg-black/10";

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white font-sans">
      {/* ══ LEFT PANEL ══════════════════════════════════════════════════════ */}
      <div className="hidden lg:flex w-[44%] flex-shrink-0 flex-col justify-between p-10 border-r border-white/[0.07] relative overflow-hidden">
        {/* grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* animated orbs */}
        <motion.div
          className="absolute -left-20 top-[8%] w-80 h-80 rounded-full bg-primary/10 blur-[70px] pointer-events-none"
          animate={{ x: [0, 20, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-12 bottom-[12%] w-52 h-52 rounded-full bg-primary/10 blur-[60px] pointer-events-none"
          animate={{ x: [0, -15, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        {/* brand */}
        <motion.div className="relative z-10" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="w-9 h-9 bg-primary/60 rounded-md flex items-center justify-center font-black text-lg text-white">H</div>
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-white/60 mt-4">HirePeople</p>
        </motion.div>

        {/* big number + floating tags */}
        <div className="relative z-10 flex items-center justify-center flex-1">
          <div className="relative">
            <motion.span
              className="block font-black leading-none select-none"
              style={{
                fontSize: "clamp(90px,12vw,140px)",
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.1)",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              &
            </motion.span>

            <motion.span
              className="absolute -top-3 -right-5 bg-primary/80 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              Opportunities
            </motion.span>

            <motion.span
              className="absolute -bottom-3 -left-5 bg-primary/80 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              Growth
            </motion.span>
          </div>
        </div>

        {/* tagline */}
        <motion.div className="relative z-10" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <h2 className="text-2xl font-bold leading-snug">
            Find your next <br /> career
            <span className="text-primary"> move.</span>
          </h2>
          <p className="text-sm text-white/35 mt-2 leading-relaxed">
            Discover jobs from companies <br /> that value your skills.
          </p>
        </motion.div>
      </div>

      {/* ══ RIGHT PANEL ═════════════════════════════════════════════════════ */}
      <div className="flex-1 flex items-center justify-center px-6 py-14 bg-[#0f0f0f]">
        <div className="w-full max-w-[400px]">
          {/* tab switcher */}
          <div className="flex bg-[#1a1a1a] rounded-lg p-1 w-fit mb-9">
            {(["signin", "signup"] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                className="relative px-6 py-2 text-xs font-bold tracking-widest uppercase cursor-pointer transition-colors duration-200 rounded-md"
                style={{ color: mode === m ? "#fff" : "rgba(255,255,255,0.4)" }}
              >
                {mode === m && (
                  <motion.span layoutId="tab-pill" className="absolute inset-0 bg-primary/50  rounded-md" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
                <span className="relative z-10">{m === "signin" ? "Sign In" : "Sign Up"}</span>
              </button>
            ))}
          </div>

          {/* animated form swap */}
          <AnimatePresence mode="wait">
            <motion.div key={mode} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.22, ease: "easeInOut" }}>
              {/* ── SIGN IN ── */}
              {mode === "signin" && (
                <>
                  <div className="mb-8">
                    <h1 className="text-3xl font-black tracking-tight">Welcome back.</h1>
                    <p className="text-sm text-white/40 mt-1.5">Sign in to continue to your workspace.</p>
                  </div>
                  <form onSubmit={onLogin}>
                    <div className="flex flex-col gap-5 mb-6">
                      <Label text="Email">
                        <input type="email" placeholder="you@example.com" className={input} value={form.email} onChange={f("email")} />
                      </Label>

                      <Label text="Password">
                        <div className="relative">
                          <input type={showPass ? "text" : "password"} placeholder="••••••••" className={input + " pr-14"} value={form.password} onChange={f("password")} />
                          <button
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                          >
                            {showPass ? "Hide" : "Show"}
                          </button>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                      <label className="flex items-center gap-2 text-sm text-white/40 cursor-pointer select-none">
                        <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="accent-primary/80 w-4 h-4 cursor-pointer" />
                        Remember me
                      </label>
                      <button type="button" className="text-sm text-primary/80 hover:underline bg-transparent border-none cursor-pointer">
                        Forgot password?
                      </button>
                    </div>

                    <SubmitBtn type="submit" isSubmitting={isSubmitting}>
                      Sign In
                    </SubmitBtn>
                  </form>
                  {/* <OAuthRow /> */}

                  <p className="text-sm text-white/40 text-center">
                    Don't have an account?{" "}
                    <button onClick={() => switchMode("signup")} className="text-primary/80 hover:underline font-medium bg-transparent border-none cursor-pointer">
                      Sign up
                    </button>
                  </p>
                </>
              )}

              {/* ── SIGN UP ── */}
              {mode === "signup" && (
                <>
                  <div className="mb-8">
                    <h1 className="text-3xl font-black tracking-tight">Create account.</h1>
                    <p className="text-sm text-white/40 mt-1.5">Get started — free, no card needed.</p>
                  </div>

                  <form onSubmit={onRegister} className="flex flex-col gap-5 mb-6">
                    <Label text="name">
                      <input placeholder="Jane" className={input} value={form.name} onChange={f("name")} />
                    </Label>

                    <Label text="Email">
                      <input type="email" placeholder="you@example.com" className={input} value={form.email} onChange={f("email")} />
                    </Label>

                    <Label text="Password">
                      <div className="relative">
                        <input type={showPass ? "text" : "password"} placeholder="Min. 8 characters" className={input} value={form.password} onChange={f("password")} />
                        <button
                          type="button"
                          onClick={() => setShowPass(!showPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                        >
                          {showPass ? "Hide" : "Show"}
                        </button>
                      </div>
                    </Label>

                    <Label text="Confirm password">
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={form.confirm}
                        onChange={f("confirm")}
                        className={`w-full bg-[#1c1c1c] border rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none transition-colors ${
                          passwordsMismatch ? "border-red-500" : passwordsMatch ? "border-primary bg-black" : "border-white/10 focus:border-primary focus:bg-black"
                        }`}
                      />

                      <AnimatePresence>
                        {(passwordsMatch || passwordsMismatch) && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`text-[11px] mt-1 ${passwordsMatch ? "text-lime-400" : "text-red-400"}`}
                          >
                            {passwordsMatch ? "Passwords match ✓" : "Passwords don't match"}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </Label>
                  <SubmitBtn type="submit" isSubmitting={isSubmitting}>Create Account</SubmitBtn>
                  </form>


                  <p className="text-sm text-white/40 text-center mb-4">
                    Already have an account?{" "}
                    <button onClick={() => switchMode("signin")} className="text-primary/80 hover:underline font-medium bg-transparent border-none cursor-pointer">
                      Sign in
                    </button>
                  </p>

                  <p className="text-[11px] text-white/25 text-center leading-relaxed">
                    By creating an account you agree to our <span className="underline cursor-pointer text-white/40">Terms</span> &amp;{" "}
                    <span className="underline cursor-pointer text-white/40">Privacy Policy</span>.
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── tiny shared components ────────────────────────────────────────────────

function Label({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5 flex-1">
      <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/35">{text}</span>
      {children}
    </div>
  );
}

function SubmitBtn({ type = "button", children, isSubmitting }: { children: React.ReactNode; type?: "button" | "submit" | "reset" | undefined; isSubmitting?: boolean }) {
  return (
    <motion.button
      type={type}
      disabled={isSubmitting}
      whileHover={{ y: -2, boxShadow: "0 8px 28px rgba(0, 0, 0, 0.3)" }}
      whileTap={{ y: 0, boxShadow: "none" }}
      className={` w-full py-3.5 bg-primary hover:bg-primary/50 text-white font-black text-xs tracking-[0.18em] uppercase rounded-lg mb-5 transition-colors  ${isSubmitting ? "bg-primary/50 cursor-not-allowed opacity-70" : "cursor-pointer"}`}
    >
      {isSubmitting ? "Processing..." : children}
    </motion.button>
  );
}
