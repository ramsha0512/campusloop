import React, { useState } from 'react';
import { X, Lock, Mail, User, GraduationCap, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { StudentBitmoji } from './StudentBitmoji';

export const AuthModal = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authMode, 
    setAuthMode, 
    login, 
    register, 
    switchDemoUser 
  } = useAuth();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('ramsha@amity.edu');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regYear, setRegYear] = useState('Final Year');
  const [regCollege, setRegCollege] = useState('Amity University');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(loginEmail, loginPassword);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    register({
      name: regName,
      email: regEmail,
      academicYear: regYear,
      college: regCollege,
      password: regPassword,
      confirmPassword: regConfirmPassword
    });
  };

  const handleQuickDemo = () => {
    switchDemoUser();
    closeAuthModal();
  };

  return (
    <div
      className="modal-backdrop"
      onClick={closeAuthModal}
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div
        className="modal-content w-full max-w-md p-6 sm:p-8 relative dark:bg-[#181728] dark:border-[#2C2A42]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-[#77758A] hover:text-[#171725] dark:hover:text-white hover:bg-[#F1F0F7] dark:hover:bg-[#222137] transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Heading */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#EEF0FF] dark:bg-[#635BFF]/25 text-[#635BFF] dark:text-[#A59DFF] flex items-center justify-center mx-auto mb-3 shadow-inner">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 id="auth-modal-title" className="text-2xl font-extrabold text-[#171725] dark:text-[#F3F2FA] font-['Manrope']">
            {authMode === 'login' ? 'Sign in to CampusLoop' : 'Create Student Account'}
          </h3>
          <p className="text-xs text-[#77758A] dark:text-[#9E9BB2] mt-1">
            {authMode === 'login' 
              ? 'Enter your verified college credentials to continue' 
              : 'Join the campus community and trade with fellow students'}
          </p>
        </div>

        {/* Mode Toggle Switch */}
        <div className="flex bg-[#F1F0F7] dark:bg-[#222137] p-1 rounded-xl mb-6">
          <button
            type="button"
            onClick={() => setAuthMode('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              authMode === 'login'
                ? 'bg-white dark:bg-[#181728] text-[#635BFF] dark:text-[#A59DFF] shadow-sm'
                : 'text-[#77758A] dark:text-[#9E9BB2] hover:text-[#171725] dark:hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
              authMode === 'register'
                ? 'bg-white dark:bg-[#181728] text-[#635BFF] dark:text-[#A59DFF] shadow-sm'
                : 'text-[#77758A] dark:text-[#9E9BB2] hover:text-[#171725] dark:hover:text-white'
            }`}
          >
            Register Student
          </button>
        </div>

        {/* Quick Demo Login Pill for Examiner with Student Bitmoji */}
        <div className="mb-5 p-3 rounded-xl bg-gradient-to-r from-[#EEF0FF] to-[#F8F7FC] dark:from-[#635BFF]/15 dark:to-[#181728] border border-[#635BFF]/25 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <StudentBitmoji name="Ramsha Azra" size={36} />
            <div className="text-left">
              <span className="text-[11px] font-bold text-[#171725] dark:text-[#F3F2FA] block">Examiner Demo Account</span>
              <span className="text-[10px] text-[#77758A] dark:text-[#9E9BB2]">Ramsha Azra · ramsha@amity.edu</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleQuickDemo}
            className="text-[11px] font-bold text-[#635BFF] dark:text-[#A59DFF] bg-white dark:bg-[#222137] border border-[#635BFF]/30 px-2.5 py-1 rounded-lg hover:bg-[#635BFF] hover:text-white transition-all shadow-sm"
          >
            Instant Demo
          </button>
        </div>

        {authMode === 'login' ? (
          /* LOGIN FORM */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1">
                College Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#77758A] absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="e.g. ramsha@amity.edu"
                  className="input-field pl-10 text-xs"
                  required
                />
              </div>
              <span className="text-[10px] text-[#77758A] dark:text-[#9E9BB2] mt-1 block">
                Official student email required (.edu / .ac.in / university domain)
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#77758A] absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pl-10 text-xs"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3 text-xs rounded-xl mt-2 justify-center"
            >
              Sign In to Account
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* REGISTER FORM */
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-[#77758A] absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Ramsha Azra"
                  className="input-field pl-10 text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1">
                College Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#77758A] absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="student@amity.edu"
                  className="input-field pl-10 text-xs"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1">
                  Academic Year
                </label>
                <select
                  value={regYear}
                  onChange={(e) => setRegYear(e.target.value)}
                  className="input-field text-xs"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="Final Year">Final Year</option>
                  <option value="Postgraduate">Postgraduate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1">
                  University / College
                </label>
                <input
                  type="text"
                  value={regCollege}
                  onChange={(e) => setRegCollege(e.target.value)}
                  placeholder="Amity University"
                  className="input-field text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#77758A] absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="input-field pl-10 text-xs"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#171725] dark:text-[#F3F2FA] mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#77758A] absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Re-type password"
                  className="input-field pl-10 text-xs"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-primary w-full py-3 text-xs rounded-xl mt-2 justify-center"
            >
              Complete Registration
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="mt-5 pt-4 border-t border-[#E8E7EE] dark:border-[#2C2A42] text-center text-[11px] text-[#77758A] dark:text-[#9E9BB2] flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#22A06B]" />
          <span>Encrypted Peer-to-Peer Campus Marketplace Platform</span>
        </div>
      </div>
    </div>
  );
};
