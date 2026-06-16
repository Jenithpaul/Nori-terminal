import { useEffect, useState } from 'react';
import { X, ShieldCheck, Check, Sparkles, ArrowUpRight, Zap, Command, TerminalSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { signOut } from '../lib/supabase';
import { createCheckoutSession } from '../lib/payment';
import { invoke } from '@tauri-apps/api/core';

/* ─── Credit Pricing Logic ──────────────────────────────────────────────── */
const CREDIT_BREAKPOINTS = [
  { credits: 0,    price: 0 },
  { credits: 100,  price: 3 },
  { credits: 250,  price: 6 },
  { credits: 500,  price: 10 },
  { credits: 1000, price: 18 },
];

function calcCreditPrice(credits: number): { price: number; perCredit: number } {
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
const spring = { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 } as const;
const smooth = { type: 'tween', ease: [0.16, 1, 0.3, 1], duration: 0.8 } as const;

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
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

function PremiumGradientGlow() {
  return (
    <div className="premium-glow-container">
      {/* Dark top fading to transparent */}
      <div className="premium-glow-top-fade" />
      
      {/* Vibrant bottom-up glow */}
      <div className="premium-glow-bottom-fade" />
      <motion.div 
        animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="premium-glow-ellipse" 
      />
    </div>
  );
}

export default function PricingModal() {
  const profile = useStore((s) => s.profile);
  const setProfile = useStore((s) => s.setProfile);
  const addNotification = useStore((s) => s.addNotification);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const [creditInput, setCreditInput] = useState('');

  const creditValue = Math.max(0, parseFloat(creditInput) || 0);
  const { price, perCredit } = calcCreditPrice(creditValue);

  /* Open / close listeners */
  useEffect(() => {
    const handleOpen = () => {
      setShowSignInPrompt(false);
      setOpen(true);
    };
    window.addEventListener('nori:open-pricing', handleOpen);
    return () => window.removeEventListener('nori:open-pricing', handleOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isGuest = profile?.displayName === 'Guest' || !profile?.email;

  const handleUpgradeClick = async (plan: 'go' | 'plus') => {
    if (isGuest) { setShowSignInPrompt(true); return; }
    if (loading) return;
    setLoading(true);
    addNotification(
      `Preparing secure checkout for Nori ${plan === 'go' ? 'Go' : 'Plus'}…`, 'info',
    );
    try {
      const session = await createCheckoutSession(plan);
      await invoke('plugin:opener|open_url', { url: session.checkout_url });
      addNotification('Checkout opened in browser.', 'success');
      setOpen(false);
    } catch (err) {
      addNotification(err instanceof Error ? err.message : 'Checkout failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSignInRedirect = async () => {
    setOpen(false);
    await signOut().catch(() => { });
    setProfile({ displayName: '', avatarColor: 'var(--accent-lavender)', hasOnboarded: true });
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="pricing-backdrop"
          initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          transition={{ duration: 0.5 }}
          className="nori-pricing-backdrop"
          onClick={() => setOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0, y: 20 }}
            animate={{ scale: 1,    opacity: 1, y: 0  }}
            exit={{   scale: 0.98, opacity: 0, y: 20 }}
            transition={smooth}
            onClick={(e) => e.stopPropagation()}
            className="nori-pricing-modal"
          >
            {/* ── Top Close Button ─────────────────────────────────────────────── */}
            <div className="nori-pricing-close-wrapper">
              <button
                onClick={() => setOpen(false)}
                className="nori-pricing-close-btn"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* ── Scrollable body ─────────────────────────────────────── */}
            <div className="nori-pricing-body">
              
              {/* Center Titles */}
              <div className="nori-pricing-title-section">
                <h2 className="nori-pricing-main-title">Nori Plans</h2>
                <p className="nori-pricing-subtitle">
                  Nori plans allow you to engineer faster and smarter, giving you full access to autonomous agentic workflows.
                </p>
              </div>

              {/* Plan Cards */}
              <motion.div variants={stagger} initial="hidden" animate="visible" className="nori-pricing-cards-grid">
                
                {/* ── FREE ──────────────────────────────────────────── */}
                <motion.div 
                  variants={fadeUp} 
                  className="nori-pricing-card-free"
                >
                  <h3 className="nori-pricing-card-title">Free</h3>
                  <div className="nori-pricing-price-row">
                    <span className="nori-pricing-price-num">€0</span>
                    <span className="nori-pricing-price-period">/month</span>
                  </div>
                  <p className="nori-pricing-price-subtext">always free</p>
                  
                  <ul className="nori-pricing-features-list">
                    {FREE_FEATURES.map((feat) => (
                      <li key={feat} className="nori-pricing-feat-item">
                        <Check size={14} className="shrink-0" style={{ color: '#525252' }} strokeWidth={2} />
                        <span className="nori-pricing-feat-text">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button disabled className="nori-pricing-btn-free">
                    Current Plan
                  </button>
                </motion.div>

                {/* ── NORI GO ───────────────────────────────────────── */}
                <motion.div 
                  variants={fadeUp} 
                  className="nori-pricing-card-go"
                >
                  <h3 className="nori-pricing-card-title">Go</h3>
                  <div className="nori-pricing-price-row">
                    <span className="nori-pricing-price-num">€5</span>
                    <span className="nori-pricing-price-period">/month</span>
                  </div>
                  <p className="nori-pricing-price-subtext">billed monthly</p>

                  <ul className="nori-pricing-features-list">
                    {GO_FEATURES.map((feat) => (
                      <li key={feat} className="nori-pricing-feat-item">
                        <Check size={14} className="shrink-0" style={{ color: 'var(--accent-lavender)' }} strokeWidth={2} />
                        <span className="nori-pricing-feat-text">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    onClick={() => handleUpgradeClick('go')} disabled={loading}
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="nori-pricing-btn-go"
                  >
                    Select Plan
                  </motion.button>
                </motion.div>

                {/* ── NORI PLUS (The Glowing Card) ─────────────────────── */}
                <motion.div 
                  variants={fadeUp} 
                  className="nori-pricing-card-plus"
                >
                  <PremiumGradientGlow />
                  
                  <div className="nori-pricing-plus-content">
                    <h3 className="nori-pricing-card-title">Plus</h3>
                    <div className="nori-pricing-price-row">
                      <span className="nori-pricing-price-num">€15</span>
                      <span className="nori-pricing-price-period">/month</span>
                    </div>
                    <p className="nori-pricing-price-subtext">billed monthly</p>
                    
                    <ul className="nori-pricing-features-list">
                      {PLUS_FEATURES.map((feat) => (
                        <li key={feat} className="nori-pricing-feat-item">
                          <Check size={14} className="shrink-0" style={{ color: 'var(--accent-lavender)' }} strokeWidth={2} />
                          <span className="nori-pricing-feat-text">{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <motion.button
                      onClick={() => handleUpgradeClick('plus')} disabled={loading}
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="nori-pricing-btn-plus"
                    >
                      {loading ? 'Processing…' : 'Select Plan'}
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>

              {/* ── Bottom Section: Two Dark Panels (Ledger & Calculator) ── */}
              <div className="nori-pricing-bottom-grid">
                
                {/* Left Side: Ledger */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
                  className="nori-pricing-panel-left"
                >
                  <h3 className="nori-pricing-panel-title" style={{ marginBottom: 12 }}>
                    Credit Operations
                  </h3>
                  <p className="nori-pricing-panel-desc">
                    Credits power the intelligence. Each autonomous action deducts seamlessly from your balance based on task complexity.
                  </p>
                  
                  <div className="nori-pricing-ledger-grid">
                    {CREDIT_USAGE_TAGS.map((tag) => (
                      <div 
                        key={tag.action} 
                        className="nori-pricing-ledger-tag"
                      >
                        <tag.icon size={14} className="nori-pricing-ledger-icon" strokeWidth={1.5} />
                        <span className="nori-pricing-ledger-label">{tag.action}</span>
                        <div className="nori-pricing-ledger-dot" />
                        <span className="nori-pricing-ledger-credits">
                          {tag.credits} <span className="nori-pricing-ledger-cr-label">CR</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Right Side: Calculator */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                  className="nori-pricing-panel-right"
                >
                  <div className="nori-pricing-panel-title-row">
                    <h3 className="nori-pricing-panel-title">
                      Top Up Balance
                    </h3>
                    <div className="nori-pricing-panel-badge">
                      Volume Discounts Applied
                    </div>
                  </div>

                  <div className="nori-pricing-input-container">
                    <input
                      type="number" min="0" step="any" placeholder="0"
                      value={creditInput} onChange={(e) => setCreditInput(e.target.value)}
                      className="nori-pricing-calc-input"
                      style={{ 
                        borderColor: creditValue > 0 ? 'var(--accent-lavender)' : '#1f1f22',
                      }}
                    />
                    <span className="nori-pricing-calc-input-suffix" style={{ color: creditValue > 0 ? 'var(--accent-lavender)' : '#71717a' }}>
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
                        className="nori-pricing-calc-result-wrapper"
                      >
                        <div className="nori-pricing-calc-detail-row">
                          <div>
                            <p className="nori-pricing-calc-detail-label">Total Due</p>
                            <span className="nori-pricing-calc-total">€{price.toFixed(2)}</span>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <p className="nori-pricing-calc-detail-label">Effective Rate</p>
                            <span className="nori-pricing-calc-rate">€{perCredit.toFixed(4)} <span className="nori-pricing-calc-rate-unit">/ CR</span></span>
                          </div>
                        </div>

                        <motion.button
                          disabled={loading} onClick={() => addNotification(`Purchasing ${creditValue} credits for €${price.toFixed(2)}`, 'info')}
                          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          className="nori-pricing-calc-btn"
                        >
                          Proceed to Checkout <ArrowUpRight size={16} strokeWidth={2} />
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="nori-pricing-calc-placeholder">
                        <span className="nori-pricing-calc-placeholder-text">Enter an amount to calculate your rate.</span>
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
                  initial={{ opacity: 0, backdropFilter: 'blur(0px)' }} animate={{ opacity: 1, backdropFilter: 'blur(10px)' }} exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                  className="nori-pricing-guest-overlay"
                >
                  <ShieldCheck size={48} strokeWidth={1} style={{ color: 'var(--accent-lavender)' }} className="mb-6" />
                  <h3 className="nori-pricing-guest-title">Authentication Required</h3>
                  <p className="nori-pricing-guest-desc">
                    You are currently in Guest Mode. Please authenticate to unlock full workspace capabilities and manage billing.
                  </p>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <motion.button onClick={handleSignInRedirect} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} 
                      className="nori-pricing-guest-btn-primary">
                      Sign In to Continue
                    </motion.button>
                    <motion.button onClick={() => setShowSignInPrompt(false)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} 
                      className="nori-pricing-guest-btn-secondary">
                      Return
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}