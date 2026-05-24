import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { CAMPUSES } from '@/mock/mockData';
import { ShieldCheck, Mail, Lock, User, GraduationCap, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import logoUrl from '@/assets/branding/logo.png';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, addNotification } = useApp();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedCampus, setSelectedCampus] = useState('squ');
  
  // Verification step states
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [sentCode, setSentCode] = useState('');

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    if (isLogin) {
      // Simulate Login
      const emailName = email.split('@')[0];
      const displayName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
      
      const campusObj = CAMPUSES.find(c => c.id === selectedCampus) || CAMPUSES[0];

      setUser({
        name: displayName + " Al-Omani",
        email: email,
        university: campusObj.fullName,
        campusId: selectedCampus,
        building: campusObj.buildings[0],
        streak: 1,
        level: "Bronze",
        balance: 5.000, // starting balance
        points: 50
      });

      addNotification(`Welcome back, ${displayName}! Enjoy your campus bites.`);
      navigate('/');
    } else {
      // Simulate Register: checks if student email (.edu.om)
      const isStudentEmail = email.toLowerCase().includes('.edu.om');
      
      if (!isStudentEmail) {
        alert("Please use an official Oman university student email ending with '.edu.om' to register!");
        return;
      }

      // Send OTP code simulation
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setSentCode(code);
      setVerificationStep(true);
      
      // Delay alert just to make it feel like background delivery
      setTimeout(() => {
        alert(`[SIMULATION] Your Omani Student verification OTP code is: ${code}`);
      }, 1000);
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode === sentCode) {
      const emailName = email.split('@')[0];
      const displayName = name || (emailName.charAt(0).toUpperCase() + emailName.slice(1));
      
      const campusObj = CAMPUSES.find(c => c.id === selectedCampus) || CAMPUSES[0];

      setUser({
        name: displayName,
        email: email,
        university: campusObj.fullName,
        campusId: selectedCampus,
        building: campusObj.buildings[0],
        streak: 1,
        level: "Bronze",
        balance: 10.000, // starter balance for registration!
        points: 100
      });

      addNotification(`Verification success! OMR 10.000 student starter balance credited! 🎁`);
      navigate('/dashboard');
    } else {
      alert("Invalid verification code! Please check your code and try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-background flex items-center justify-center pt-8 pb-24 md:pb-12 text-left">
      <div className="absolute top-0 right-0 w-[450px] h-[450px] ambient-glow-orange opacity-25 z-0" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] ambient-glow-amber opacity-15 z-0" />

      <div className="w-full max-w-md px-4 sm:px-6 relative z-10">
        
        {/* Card wrapper */}
        <div className="p-6 sm:p-8 rounded-3xl glass-panel shadow-2xl border border-subtle space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 bg-[#FF5C00]/20 blur-xl rounded-full"></div>
              <img src={logoUrl} alt="Campus Bite Logo" className="relative w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,92,0,0.4)]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-main">
              {verificationStep ? 'Verify Student' : isLogin ? 'Student Fuel Portal' : 'Join Campus Bite'}
            </h2>
            <p className="text-xs text-muted max-w-xs mx-auto leading-relaxed">
              {verificationStep
                ? 'Enter the 4-digit code sent to your academic email inbox.'
                : isLogin
                ? 'Access food delivery discounts customized for Omani campuses.'
                : 'Use your .edu.om university email to unlock bronze status benefits.'}
            </p>
          </div>

          {/* OTP Verification Form */}
          {verificationStep ? (
            <form onSubmit={handleVerifyOTP} className="space-y-4 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-muted tracking-wider">Verification OTP Code</label>
                <input
                  type="text"
                  placeholder="Enter 4-digit OTP"
                  maxLength={4}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl text-sm bg-surface border border-subtle text-main placeholder-neutral-600 focus:outline-none focus:border-amber-500 text-center tracking-[0.4em] font-black"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-sunset hover:bg-gradient-sunset-hover text-white font-black rounded-2xl text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02]"
              >
                Confirm Verification
              </button>

              <button
                type="button"
                onClick={() => setVerificationStep(false)}
                className="w-full text-center text-xs font-bold text-muted hover:text-main transition-colors"
              >
                Back to signup
              </button>
            </form>
          ) : (
            
            // Standard Login / Signup Forms
            <form onSubmit={handleAuthSubmit} className="space-y-4">
              
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-muted tracking-wider">Your Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="E.g. Mazen Al-Riyami"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3.5 pl-11 rounded-xl text-xs bg-surface border border-subtle text-main placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                    />
                    <User className="w-4 h-4 text-muted absolute left-4 top-3.5" />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-muted tracking-wider">Academic Email (.edu.om)</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="name@squ.edu.om"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3.5 pl-11 rounded-xl text-xs bg-surface border border-subtle text-main placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                  />
                  <Mail className="w-4 h-4 text-muted absolute left-4 top-3.5" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-muted tracking-wider">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3.5 pl-11 pr-11 rounded-xl text-xs bg-surface border border-subtle text-main placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                  />
                  <Lock className="w-4 h-4 text-muted absolute left-4 top-3.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-muted hover:text-main"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Campus Selector */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-muted tracking-wider">Select Campus</label>
                <div className="relative">
                  <select
                    value={selectedCampus}
                    onChange={(e) => setSelectedCampus(e.target.value)}
                    className="w-full px-4 py-3.5 pl-11 rounded-xl text-xs bg-surface border border-subtle text-main focus:outline-none focus:border-amber-500 appearance-none"
                  >
                    {CAMPUSES.map((c) => (
                      <option key={c.id} value={c.id} className="bg-surface text-main">
                        {c.fullName} ({c.name})
                      </option>
                    ))}
                  </select>
                  <GraduationCap className="w-4 h-4 text-muted absolute left-4 top-3.5" />
                  <div className="absolute right-4 top-4.5 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-neutral-500 pointer-events-none" />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-sunset hover:bg-gradient-sunset-hover text-white font-black rounded-2xl text-xs sm:text-sm shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2 pt-3"
              >
                <span>{isLogin ? 'Login to Portal' : 'Register Academic Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Toggles */}
              <div className="pt-2 flex justify-between items-center text-[10px] sm:text-xs">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-amber-500 font-extrabold hover:underline"
                >
                  {isLogin ? "Need a student profile? Signup" : 'Have an account? Login'}
                </button>
                <button
                  type="button"
                  onClick={() => alert("Simulated password reset email sent to your academic mailbox! Check inbox.")}
                  className="text-muted hover:text-main transition-colors"
                >
                  Forgot password?
                </button>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
