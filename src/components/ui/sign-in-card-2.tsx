'use client'
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

interface SignInCardProps {
  onLogin: (email: string, password: string) => void;
  isLoading?: boolean;
}

export function SignInCard({ onLogin, isLoading: externalLoading }: SignInCardProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);

  const isLoading = externalLoading;

  // For 3D card effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Background gradient effect - TechZone Branded */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FCA331]/10 via-[#14213D]/40 to-black" />
      
      {/* Subtle noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}
      />

      {/* Top radial glow - TechZone Orange */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120vh] h-[60vh] rounded-b-[50%] bg-[#FCA331]/5 blur-[80px]" />
      <motion.div 
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[100vh] h-[60vh] rounded-b-full bg-[#FCA331]/5 blur-[60px]"
        animate={{ 
          opacity: [0.05, 0.15, 0.05],
          scale: [0.98, 1.02, 0.98]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "mirror"
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm relative z-10"
        style={{ perspective: 1500 }}
      >
        <motion.div
          className="relative"
          style={{ rotateX, rotateY }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative group">
            {/* Card glow effect */}
            <motion.div 
              className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-70 transition-opacity duration-700"
              animate={{
                boxShadow: [
                  "0 0 10px 2px rgba(255,255,255,0.03)",
                  "0 0 15px 5px rgba(255,255,255,0.05)",
                  "0 0 10px 2px rgba(255,255,255,0.03)"
                ],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut", 
                repeatType: "mirror" 
              }}
            />

              {/* Traveling light beam effect */}
              <div className="absolute -inset-[1px] rounded-2xl overflow-hidden pointer-events-none">
                <motion.div 
                  className="absolute top-0 left-0 h-[2px] w-[40%] bg-gradient-to-r from-transparent via-white/50 to-transparent"
                  animate={{ left: ["-40%", "140%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                />
              </div>

              {/* Glass card background */}
              <div className="relative bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-8 border border-white/[0.08] shadow-2xl overflow-hidden">
                {/* Logo and header */}
                <div className="text-center space-y-2 mb-8">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className="mx-auto w-12 h-12 rounded-full border border-white/10 flex items-center justify-center relative overflow-hidden bg-white/5"
                  >
                    <span className="text-xl font-bold text-white">TZ</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold text-white tracking-tight"
                  >
                    Admin Access
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-zinc-400 text-sm"
                  >
                    Sign in to manage TechZone inventory
                  </motion.p>
                </div>

                {/* Login form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-3">
                    {/* User input */}
                    <div className="relative">
                      <Mail className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                        focusedInput === "email" ? 'text-white' : 'text-white/40'
                      }`} />
                      <Input
                        type="text"
                        placeholder="Admin User"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedInput("email")}
                        onBlur={() => setFocusedInput(null)}
                        className="w-full bg-white/5 border-white/5 focus:border-white/20 text-white placeholder:text-white/20 h-11 pl-10 transition-all rounded-xl focus:bg-white/10"
                      />
                    </div>

                    {/* Password input */}
                    <div className="relative">
                      <Lock className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${
                        focusedInput === "password" ? 'text-white' : 'text-white/40'
                      }`} />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Security Key"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedInput("password")}
                        onBlur={() => setFocusedInput(null)}
                        className="w-full bg-white/5 border-white/5 focus:border-white/20 text-white placeholder:text-white/20 h-11 pl-10 pr-10 transition-all rounded-xl focus:bg-white/10"
                      />
                      <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)} 
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember me & Forgot */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center space-x-2">
                       <input
                        id="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                        className="h-3.5 w-3.5 rounded border-white/20 bg-white/5 checked:bg-[#FCA331] transition-all"
                      />
                      <label htmlFor="remember-me" className="text-xs text-zinc-500 hover:text-zinc-300 cursor-pointer">
                        Secure session
                      </label>
                    </div>
                    
                    <Link to="/" className="text-xs text-zinc-500 hover:text-white transition-colors">
                      Back to site
                    </Link>
                  </div>

                  {/* Sign in button */}
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full relative group/btn mt-6"
                  >
                    <div className="absolute inset-0 bg-white shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-xl opacity-80 group-hover/btn:opacity-100 transition-opacity" />
                    <div className="relative h-11 flex items-center justify-center bg-white text-black font-bold rounded-xl text-sm gap-2">
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                      ) : (
                        <>
                          Access Portal
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </>
                      )}
                    </div>
                  </motion.button>

                  <p className="text-center text-[10px] text-zinc-600 mt-6 uppercase tracking-widest font-bold">
                    Authorized Personnel Only
                  </p>
                </form>
              </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
