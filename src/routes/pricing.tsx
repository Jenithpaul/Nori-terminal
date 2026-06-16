import React, { useEffect, useState } from 'react';
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { X, ShieldCheck, Check, Sparkles, ArrowUpRight, Zap, Command, TerminalSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Route = createFileRoute("/pricing")({
  component: PricingPage,
});

/* ─── Credit Pricing Logic ──────────────────────────────────────────────── */
const CREDIT_BREAKPOINTS = [
  { credits: 0,    price: 0 },
  { credits: 100,  price: 3 },
  { credits: 250,  price: 6 },
  { credits: 500,  price: 10 },
  { credits: 1000, price: 18 },
];

function calcCreditPrice(credits: number) {
  if (credits <= 0) return { price: 0, perCredit: 0 };
  for (let i = 1; i < CREDIT_BREAKPOINTS.length; i++) {
    const lo = CREDIT_BREAKPOINTS[i - 1];
    const hi = CREDIT_BREAKPOINTS[i];
    if (credits <= hi.credits) {
      const t = (credits - lo.credits) / (hi.credits - lo.credits);
      const price = lo.price + t * (hi.price - lo.price);
      return { price, perCredit: price / credits };
    }
  }
  const last = CREDIT_BREAKPOINTS[CREDIT_BREAKPOINTS.length - 1];
  const prev = CREDIT_BREAKPOINTS[CREDIT_BREAKPOINTS.length - 2];
  const rate = (last.price - prev.price) / (last.credits - prev.credits);
  const price = last.price + rate * (credits - last.credits);
  return { price, perCredit: price / credits };
}

/* ─── Animation Configs ─────────────────────────────────────────────────── */
const spring: any = { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 };
const smooth: any = { type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.8 };

const stagger: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp: any = {
  hidden:   { opacity: 0, y: 30, scale: 0.98, filter: 'blur(5px)' },
  visible:  { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)', transition: spring },
};

/* ─── Data ──────────────────────────────────────────────────────────────── */
const FREE_FEATURES = [
  'Free daily terminal usage',
  'Local Git integration',
  'Basic command history'
];

const GO_FEATURES = [
  '~300 AI commands / month',
  'SSH & Docker environments',
  'Unlimited standard terminal',
  'Priority bug support'
];

const PLUS_FEATURES = [
  '~1,500 AI commands / month',
  'Autonomous repo refactoring',
  'Advanced reasoning models',
  'Private mode (coming soon)'
];

const CREDIT_USAGE_TAGS = [
  { action: 'Simple Task', credits: '1', icon: TerminalSquare },
  { action: 'Repository Analysis', credits: '2', icon: Command },
  { action: 'File Edit', credits: '2', icon: Zap },
  { action: 'Feature Gen', credits: '5', icon: Sparkles },
  { action: 'Large Refactor', credits: '10', icon: ShieldCheck },
];

/* ─── Global Styles Injection ────────────────────────────────────────────── */
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url("https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap");
    
    .pricing-theme {
      --color-abyss: #030303;
      --color-panel: #0a0a0a;
      --color-border: rgba(255, 255, 255, 0.08);
      --color-border-hover: rgba(255, 255, 255, 0.15);
      --color-smoke: #71717a;
      --color-ghost: #e4e4e7;
      --color-accent: #a855f7;
      font-family: "DM Sans", sans-serif;
      background-color: var(--color-abyss);
      color: var(--color-ghost);
    }
    
    .pricing-theme ::selection { background-color: rgba(168, 85, 247, 0.3); color: #fff; }

    .pricing-theme input[type=number]::-webkit-inner-spin-button, 
    .pricing-theme input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none; 
      margin: 0; 
    }
    .pricing-theme input[type=number] { -moz-appearance: textfield; }
    .pricing-theme input[type=number]::placeholder { color: var(--color-smoke); opacity: 0.5; }
    
    .scrollbar-none {
      scrollbar-width: none;
      -ms-overflow-style: none;
    }
    .scrollbar-none::-webkit-scrollbar {
      display: none;
    }
  `}} />
);

/* ─── Components ─────────────────────────────────────────────────────────── */

function PremiumGradientGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[32px] z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 w-full h-[80%] z-0 opacity-90">
        <div className="absolute inset-0 bg-gradient-to-t from-[#5a189a] via-[#7b2cbf]/40 to-transparent mix-blend-screen" />
        <motion.div 
          animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[30%] left-1/2 -translate-x-1/2 w-[150%] h-[120%] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#9d4edd] via-[#7b2cbf]/50 to-transparent blur-[60px]" 
        />
      </div>
    </div>
  );
}

function PricingPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ plan: 'free', displayName: 'Guest', email: null as string | null });
  const [loading, setLoading] = useState(false);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const [creditInput, setCreditInput] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const addNotification = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const creditValue = Math.max(0, parseFloat(creditInput) || 0);
  const { price, perCredit } = calcCreditPrice(creditValue);

  const isGuest = profile?.displayName === 'Guest' || !profile?.email;

  const handleUpgradeClick = async (plan: string) => {
    if (isGuest) { setShowSignInPrompt(true); return; }
    if (loading) return;
    setLoading(true);
    addNotification(`Initiating secure checkout for Nori ${plan === 'go' ? 'Go' : 'Plus'}…`);
    setTimeout(() => {
      setLoading(false);
      addNotification(`Workspace upgraded to Nori ${plan === 'go' ? 'Go' : 'Plus'}.`);
      setProfile(prev => ({ ...prev, plan }));
    }, 1500);
  };

  const handleClose = () => {
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden pricing-theme font-sans font-light">
      <GlobalStyles />
      
      {/* Immersive background ambient */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.15]">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full blur-[120px] mix-blend-screen" 
          style={{ backgroundColor: 'var(--color-accent)' }} 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={smooth as any}
        className="relative w-full flex flex-col rounded-[40px] my-10 mx-4 z-10"
        style={{ 
          maxWidth: 1140, 
          background: 'rgba(3, 3, 3, 0.6)',
          backdropFilter: 'blur(40px)',
          border: '1px solid var(--color-border)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
        }}
      >
        {/* ── Top Close Button ─────────────────────────────────────────────── */}
        <div className="absolute top-6 right-6 z-50">
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 group hover:bg-white/10"
            style={{ border: '1px solid var(--color-border)' }}
          >
            <X size={18} strokeWidth={1.5} style={{ color: 'var(--color-smoke)' }} className="group-hover:text-white transition-colors duration-300" />
          </button>
        </div>

        {/* ── Scrollable body ─────────────────────────────────────── */}
        <div className="relative z-10 flex-1 px-6 sm:px-12 pt-20 pb-20 overflow-y-auto scrollbar-none">
          
          {/* Center Titles */}
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, ...smooth } as any}
              className="text-[40px] md:text-[56px] font-light tracking-tighter text-white mb-6 leading-none"
            >
              Intelligence, scaled.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, ...smooth } as any}
              className="text-[16px] font-light text-[var(--color-smoke)] max-w-lg mx-auto leading-relaxed"
            >
              Nori plans allow you to engineer faster and smarter, giving you full access to autonomous agentic workflows.
            </motion.p>
          </div>

          {/* Plan Cards */}
          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            
            {/* ── FREE ──────────────────────────────────────────── */}
            <motion.div 
              variants={fadeUp} 
              className="relative p-8 rounded-[32px] flex flex-col group h-[520px] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
              style={{ backgroundColor: 'var(--color-panel)', border: '1px solid var(--color-border)' }}
            >
              <h3 className="text-[28px] font-normal text-white mb-1">Free</h3>
              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-[32px] font-light text-white tracking-tight">$0</span>
                <span className="text-[13px] font-light text-[var(--color-smoke)]">/month</span>
              </div>
              
              <ul className="flex flex-col flex-1 mb-8">
                {FREE_FEATURES.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 py-4 border-b border-white/5 last:border-0">
                    <Check size={16} className="shrink-0 text-[var(--color-smoke)]" strokeWidth={1.5} />
                    <span className="text-[14px] font-light text-[var(--color-ghost)] opacity-80">{feat}</span>
                  </li>
                ))}
              </ul>

              <button disabled className="w-full py-4 rounded-2xl text-[14px] font-medium cursor-not-allowed transition-colors"
                style={{ backgroundColor: '#141414', border: '1px solid var(--color-border)', color: 'var(--color-smoke)' }}>
                Current Plan
              </button>
            </motion.div>

            {/* ── NORI GO ───────────────────────────────────────── */}
            <motion.div 
              variants={fadeUp} 
              className="relative p-8 rounded-[32px] flex flex-col group h-[520px] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
              style={{ backgroundColor: 'var(--color-panel)', border: '1px solid var(--color-border)' }}
            >
              <h3 className="text-[28px] font-normal text-white mb-1">Go</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-[32px] font-light text-white tracking-tight">$5</span>
                <span className="text-[13px] font-light text-[var(--color-smoke)]">/month</span>
              </div>
              <p className="text-[12px] font-light text-[var(--color-smoke)] mb-8">billed monthly</p>

              <ul className="flex flex-col flex-1 mb-8">
                {GO_FEATURES.map((feat) => (
                  <li key={feat} className="flex items-center gap-3 py-4 border-b border-white/5 last:border-0">
                    <Check size={16} className="shrink-0 text-[var(--color-ghost)] opacity-60" strokeWidth={1.5} />
                    <span className="text-[14px] font-light text-[var(--color-ghost)] opacity-90">{feat}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                onClick={() => handleUpgradeClick('go')} disabled={loading}
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl text-[14px] font-medium transition-all duration-300 bg-white text-black hover:bg-gray-100"
              >
                Select Plan
              </motion.button>
            </motion.div>

            {/* ── NORI PLUS (The Glowing Card) ─────────────────────── */}
            <motion.div 
              variants={fadeUp} 
              className="relative rounded-[32px] flex flex-col overflow-hidden h-[520px] transition-all duration-500 hover:-translate-y-1 group"
              style={{ border: '1px solid rgba(168, 85, 247, 0.3)', boxShadow: '0 20px 40px -10px rgba(168, 85, 247, 0.15)' }}
            >
              <PremiumGradientGlow />
              
              <div className="relative z-10 p-8 flex flex-col h-full">
                <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Sparkles size={12} className="text-white" />
                  <span className="text-[10px] font-medium text-white uppercase tracking-wider">Popular</span>
                </div>

                <h3 className="text-[28px] font-normal text-white mb-1 drop-shadow-md">Plus</h3>
                <div className="flex items-baseline gap-1 mb-1 drop-shadow-md">
                  <span className="text-[32px] font-light text-white tracking-tight">$15</span>
                  <span className="text-[13px] font-light text-white/70">/month</span>
                </div>
                <p className="text-[12px] font-light text-white/50 mb-8">billed monthly</p>
                
                <ul className="flex flex-col flex-1 mb-8">
                  {PLUS_FEATURES.map((feat) => (
                    <li key={feat} className="flex items-center gap-3 py-4 border-b border-white/10 last:border-0 group-hover:border-white/20 transition-colors">
                      <Check size={16} className="shrink-0 text-white/80" strokeWidth={2} />
                      <span className="text-[14px] font-light text-white drop-shadow-sm">{feat}</span>
                    </li>
                  ))}
                </ul>

                <motion.button
                  onClick={() => handleUpgradeClick('plus')} disabled={loading}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(255,255,255,0.3)' }} whileTap={{ scale: 0.98 }}
                  className="w-full py-4 rounded-2xl text-[14px] font-medium transition-all duration-300 bg-white text-black shadow-xl flex items-center justify-center gap-2"
                >
                  {loading ? 'Processing…' : 'Select Plan'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Bottom Section: Two Dark Panels (Ledger & Calculator) ── */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            
            {/* Left Side: Ledger */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="p-8 md:p-12 flex flex-col justify-center rounded-[32px] relative overflow-hidden group hover:border-white/10 transition-colors duration-500"
              style={{ backgroundColor: 'var(--color-panel)', border: '1px solid var(--color-border)' }}
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                <TerminalSquare size={120} strokeWidth={0.5} />
              </div>
              <h3 className="text-2xl font-light tracking-tight text-white mb-4">
                Credit Operations
              </h3>
              <p className="text-[15px] text-[var(--color-smoke)] font-light mb-10 max-w-md leading-relaxed">
                Credits power the intelligence. Each autonomous action deducts seamlessly from your balance based on task complexity.
              </p>
              
              <div className="flex flex-wrap gap-3 relative z-10">
                {CREDIT_USAGE_TAGS.map((tag) => (
                  <div 
                    key={tag.action} 
                    className="px-4 py-3 rounded-2xl border flex items-center gap-3 transition-all duration-300 hover:border-white/20 hover:bg-white/5 hover:scale-[1.02] cursor-default"
                    style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-abyss)' }}
                  >
                    <tag.icon size={16} className="text-[var(--color-smoke)]" strokeWidth={1.5} />
                    <span className="text-[14px] font-light text-[var(--color-ghost)]">{tag.action}</span>
                    <div className="w-[4px] h-[4px] rounded-full bg-[var(--color-smoke)] opacity-40 mx-1" />
                    <span className="text-[14px] font-medium text-white">
                      {tag.credits} <span className="text-[10px] text-[var(--color-smoke)] tracking-wider">CR</span>
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Side: Calculator */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="rounded-[32px] p-8 md:p-12 flex flex-col relative overflow-hidden group hover:border-white/10 transition-colors duration-500"
              style={{ backgroundColor: 'var(--color-panel)', border: '1px solid var(--color-border)' }}
            >
              <div className="flex justify-between items-start mb-12">
                <h3 className="text-2xl font-light tracking-tight text-white">
                  Top Up Balance
                </h3>
                <div className="px-4 py-1.5 rounded-full text-[11px] font-medium tracking-wide border flex items-center gap-2"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-smoke)', backgroundColor: 'var(--color-abyss)' }}>
                  <Zap size={12} className="text-[var(--color-accent)]" /> Volume Discounts Applied
                </div>
              </div>

              <div className="relative mb-auto pb-6">
                <input
                  type="number" min="0" step="any" placeholder="0"
                  value={creditInput} onChange={(e) => setCreditInput(e.target.value)}
                  className="w-full bg-transparent border-b border-white/10 rounded-none
                    py-4 text-[72px] md:text-[88px] leading-none font-light tracking-tighter
                    focus:outline-none transition-colors duration-500 focus:border-[var(--color-accent)]"
                  style={{ 
                    color: 'white', 
                  }}
                />
                <span className="absolute right-0 bottom-10 text-[14px] font-light tracking-widest pointer-events-none transition-colors duration-500 uppercase"
                  style={{ color: creditValue > 0 ? 'var(--color-accent)' : 'var(--color-smoke)' }}>
                  Credits
                </span>
              </div>

              <AnimatePresence mode="wait">
                {creditValue > 0 ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                    transition={{ duration: 0.3 }}
                    className="mt-8"
                  >
                    <div className="flex items-end justify-between mb-8 px-2">
                      <div>
                        <p className="text-[12px] font-medium tracking-wider uppercase mb-2" style={{ color: 'var(--color-smoke)' }}>Total Due</p>
                        <span className="text-4xl md:text-5xl font-light tracking-tight text-white">\${price.toFixed(2)}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-[12px] font-medium tracking-wider uppercase mb-2" style={{ color: 'var(--color-smoke)' }}>Effective Rate</p>
                        <span className="text-[18px] font-light text-white">\${perCredit.toFixed(4)} <span className="text-[12px] text-[var(--color-smoke)]">/ CR</span></span>
                      </div>
                    </div>

                    <motion.button
                      disabled={loading} onClick={() => addNotification(`Purchasing ${creditValue} credits for $${price.toFixed(2)}`)}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="w-full py-5 rounded-2xl text-[15px] font-medium transition-all duration-300 flex items-center justify-center gap-2"
                      style={{ backgroundColor: 'white', color: 'black' }}
                    >
                      Proceed to Checkout <ArrowUpRight size={18} strokeWidth={2} />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-8 flex items-center justify-center h-[120px]">
                    <span className="text-[15px] font-light" style={{ color: 'var(--color-smoke)' }}>Enter an amount to calculate your rate.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>

        {/* ── Guest Overlay ───────────────────────────────────────── */}
        <AnimatePresence>
          {showSignInPrompt && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }} animate={{ opacity: 1, backdropFilter: 'blur(20px)' }} exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              className="absolute inset-0 z-50 flex flex-col items-center justify-center px-6 py-12 text-center rounded-[40px]"
              style={{ background: 'rgba(3, 3, 3, 0.85)' }}
            >
              <ShieldCheck size={56} strokeWidth={1} style={{ color: 'var(--color-accent)' }} className="mb-6" />
              <h3 className="text-3xl font-light tracking-tight text-white mb-4">Authentication Required</h3>
              <p className="text-[15px] font-light leading-relaxed max-w-sm mb-10" style={{ color: 'var(--color-smoke)' }}>
                You are currently in Guest Mode. Please authenticate to unlock full workspace capabilities and manage billing.
              </p>
              <div className="flex gap-4">
                <motion.button onClick={() => {}} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} 
                  className="px-8 py-4 rounded-full text-[14px] font-medium bg-white text-black shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)]">
                  Sign In to Continue
                </motion.button>
                <motion.button onClick={() => setShowSignInPrompt(false)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} 
                  className="px-8 py-4 rounded-full text-[14px] font-medium transition-colors" style={{ backgroundColor: 'var(--color-panel)', color: 'white', border: '1px solid var(--color-border)' }}>
                  Return
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
      
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed bottom-8 right-8 z-[10000] px-6 py-4 rounded-2xl shadow-2xl text-[14px] font-normal tracking-wide flex items-center gap-3 border border-white/10"
            style={{ backgroundColor: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(10px)', color: 'var(--color-ghost)' }}
          >
            <Sparkles size={16} style={{ color: 'var(--color-accent)' }} />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}