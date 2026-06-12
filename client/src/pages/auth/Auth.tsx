import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { CAMPUSES, CORPORATE_LOCATIONS } from '@/mock/mockData';
import { ShieldCheck, Mail, Lock, User, GraduationCap, ArrowRight, Eye, EyeOff, Building, Phone, Hash } from 'lucide-react';
import { motion } from 'framer-motion';
import logoUrl from '@/assets/branding/logo.png';

export const Auth: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, addNotification } = useApp();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<'student' | 'bank_employee'>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [studentId, setStudentId] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [selectedCampus, setSelectedCampus] = useState(CAMPUSES[0].id);
  
  // Verification step states
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [sentCode, setSentCode] = useState('');

  const availableLocations = userType === 'student' ? CAMPUSES : CORPORATE_LOCATIONS;

  // Whenever userType changes, reset selected campus to the first of the new list
  React.useEffect(() => {
    setSelectedCampus(availableLocations[0].id);
  }, [userType, availableLocations]);

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    if (isLogin) {
      // Simulate Login
      const emailName = email.split('@')[0];
      const displayName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
      
      const locationObj = availableLocations.find(c => c.id === selectedCampus) || availableLocations[0];

      setUser({
        userType,
        name: displayName + (userType === 'student' ? " Al-Omani" : ""),
        email: email,
        mobileNumber: mobileNumber || "+968 9000 0000",
        ...(userType === 'student' ? {
          studentId: studentId || "ID-12345",
          university: locationObj.fullName,
        } : {
          employeeId: employeeId || "EMP-9876",
          bankName: locationObj.fullName,
        }),
        campusId: selectedCampus,
        building: locationObj.buildings[0],
        streak: 1,
        level: "Bronze",
        balance: 5.000, // starting balance
        points: 50
      });

      addNotification(`Welcome back, ${displayName}! Enjoy your campus bites.`);
      navigate('/');
    } else {
      // Simulate Register
      if (userType === 'student') {
        const isStudentEmail = email.toLowerCase().includes('.edu.om');
        if (!isStudentEmail) {
          alert("Please use an official Oman university student email ending with '.edu.om' to register!");
          return;
        }
      } else {
        const isCorporateEmail = email.includes('@'); // simplistic check for mock
        if (!isCorporateEmail) {
          alert("Please enter a valid corporate email.");
          return;
        }
      }

      // Send OTP code simulation
      const code = Math.floor(1000 + Math.random() * 9000).toString();
      setSentCode(code);
      setVerificationStep(true);
      
      // Delay alert just to make it feel like background delivery
      setTimeout(() => {
        alert(`[SIMULATION] Your verification OTP code is: ${code}`);
      }, 1000);
    }
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    if (verificationCode === sentCode) {
      const emailName = email.split('@')[0];
      const displayName = name || (emailName.charAt(0).toUpperCase() + emailName.slice(1));
      
      const locationObj = availableLocations.find(c => c.id === selectedCampus) || availableLocations[0];

      setUser({
        userType,
        name: displayName,
        email: email,
        mobileNumber: mobileNumber || "+968 9000 0000",
        ...(userType === 'student' ? {
          studentId: studentId || "ID-12345",
          university: locationObj.fullName,
        } : {
          employeeId: employeeId || "EMP-9876",
          bankName: locationObj.fullName,
        }),
        campusId: selectedCampus,
        building: locationObj.buildings[0],
        streak: 1,
        level: "Bronze",
        balance: 10.000, // starter balance for registration!
        points: 100
      });

      addNotification(`Verification success! OMR 10.000 starter balance credited! 🎁`);
      navigate('/');
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
              {verificationStep ? 'Verify Account' : isLogin ? 'Access Portal' : 'Join Campus Bite'}
            </h2>
            <p className="text-xs text-muted max-w-xs mx-auto leading-relaxed">
              {verificationStep
                ? 'Enter the 4-digit code sent to your email inbox.'
                : isLogin
                ? 'Access food delivery discounts customized for your location.'
                : 'Create your account to unlock benefits and scheduled meals.'}
            </p>
          </div>

          {/* User Type Selector */}
          {!verificationStep && (
            <div className="flex bg-surface p-1 rounded-xl border border-subtle">
              <button
                type="button"
                onClick={() => setUserType('student')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${userType === 'student' ? 'bg-gradient-sunset text-white shadow-md' : 'text-muted hover:text-main'}`}
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => setUserType('bank_employee')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${userType === 'bank_employee' ? 'bg-gradient-sunset text-white shadow-md' : 'text-muted hover:text-main'}`}
              >
                Bank Employee
              </button>
            </div>
          )}

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
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-muted tracking-wider">Your Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder={userType === 'student' ? "E.g. Mazen Al-Riyami" : "E.g. Ahmed Al-Balushi"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3.5 pl-11 rounded-xl text-xs bg-surface border border-subtle text-main placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                      />
                      <User className="w-4 h-4 text-muted absolute left-4 top-3.5" />
                    </div>
                  </div>

                  {userType === 'student' ? (
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-muted tracking-wider">Student ID</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="E.g. 123456"
                          value={studentId}
                          onChange={(e) => setStudentId(e.target.value)}
                          className="w-full px-4 py-3.5 pl-11 rounded-xl text-xs bg-surface border border-subtle text-main placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                        />
                        <Hash className="w-4 h-4 text-muted absolute left-4 top-3.5" />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase text-muted tracking-wider">Employee ID</label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="E.g. EMP-1234"
                          value={employeeId}
                          onChange={(e) => setEmployeeId(e.target.value)}
                          className="w-full px-4 py-3.5 pl-11 rounded-xl text-xs bg-surface border border-subtle text-main placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                        />
                        <Hash className="w-4 h-4 text-muted absolute left-4 top-3.5" />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-muted tracking-wider">Mobile Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="+968 9XXXXXXX"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value)}
                        className="w-full px-4 py-3.5 pl-11 rounded-xl text-xs bg-surface border border-subtle text-main placeholder-neutral-600 focus:outline-none focus:border-amber-500"
                      />
                      <Phone className="w-4 h-4 text-muted absolute left-4 top-3.5" />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-muted tracking-wider">
                  {userType === 'student' ? 'Academic Email (.edu.om)' : 'Corporate Email'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder={userType === 'student' ? "name@squ.edu.om" : "name@bank.com"}
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

              {/* Location Selector */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-muted tracking-wider">
                  {userType === 'student' ? 'Select University' : 'Select Bank'}
                </label>
                <div className="relative">
                  <select
                    value={selectedCampus}
                    onChange={(e) => setSelectedCampus(e.target.value)}
                    className="w-full px-4 py-3.5 pl-11 rounded-xl text-xs bg-surface border border-subtle text-main focus:outline-none focus:border-amber-500 appearance-none"
                  >
                    {availableLocations.map((c) => (
                      <option key={c.id} value={c.id} className="bg-surface text-main">
                        {c.fullName} ({c.name})
                      </option>
                    ))}
                  </select>
                  {userType === 'student' ? (
                    <GraduationCap className="w-4 h-4 text-muted absolute left-4 top-3.5" />
                  ) : (
                    <Building className="w-4 h-4 text-muted absolute left-4 top-3.5" />
                  )}
                  <div className="absolute right-4 top-4.5 w-0 h-0 border-l-4 border-l-transparent border-r-4 border-r-transparent border-t-4 border-t-neutral-500 pointer-events-none" />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-3.5 bg-gradient-sunset hover:bg-gradient-sunset-hover text-white font-black rounded-2xl text-xs sm:text-sm shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2 pt-3"
              >
                <span>{isLogin ? 'Login to Portal' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Toggles */}
              <div className="pt-2 flex justify-between items-center text-[10px] sm:text-xs">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-amber-500 font-extrabold hover:underline"
                >
                  {isLogin ? "Need a profile? Signup" : 'Have an account? Login'}
                </button>
                <button
                  type="button"
                  onClick={() => alert("Simulated password reset email sent to your mailbox! Check inbox.")}
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
