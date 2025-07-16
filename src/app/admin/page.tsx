'use client';
import React from 'react';
import AdminDashboard from '../../components/AdminDashboard';
import { ShieldCheck } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4">
      <div className="w-full max-w-3xl bg-white rounded-2xl border border-gray-200 p-0 flex flex-col items-center animate-zoom-in">
        <div className="w-full flex items-center justify-center border-b border-gray-100 py-6 px-8">
          <ShieldCheck className="w-8 h-8 text-orange-500 mr-3" />
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight text-center">Manager Dashboard</h1>
        </div>
        <p className="text-base text-gray-700 mb-8 mt-6 text-center max-w-xl">This is a secure area for PARC officials.<br/>Manage teams, rounds, and scores for the competition.<br/><span className='font-semibold text-orange-500'>All changes update in real time.</span></p>
        <div className="w-full px-8 pb-10">
          <AdminDashboard />
        </div>
      </div>
      <style jsx global>{`
        @keyframes zoom-in {
          0% { transform: scale(0.92); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-zoom-in {
          animation: zoom-in 0.5s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </div>
  );
} 