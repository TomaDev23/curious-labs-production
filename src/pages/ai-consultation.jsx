import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import MissionControlNavbar from '../components/navigation/MissionControlNavbar';
import LandingCosmicBackground from '../components/landing/LandingCosmicBackground';
import ConsultationContent from '../components/consultation/ConsultationContent';
import '../components/consultation/consultation.css';

export default function AiConsultationPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#020308] text-white">
      <Helmet>
        <title>AI Integration Consultation | CuriousLabs</title>
        <meta
          name="description"
          content="Personal AI integration consultation for technical teams and businesses. A free first conversation, then a tailored engagement."
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="AI Integration Consultation | CuriousLabs" />
        <meta
          property="og:description"
          content="Work with AI in a way that fits your business. Personal consultation, not a fixed course."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Match the landing page's scoped scrollbar (cyan → violet → lime) so the
          consultation route reads as part of the same space. Mount lifecycle
          keeps it scoped to this route. */}
      <style>{`
        html { scrollbar-color: #8b5cf6 rgba(255,255,255,0.04); scrollbar-width: thin; }
        html::-webkit-scrollbar { width: 11px; }
        html::-webkit-scrollbar-track { background: rgba(255,255,255,0.035); }
        html::-webkit-scrollbar-thumb {
          border-radius: 999px;
          border: 2px solid transparent;
          background-clip: padding-box;
          background-image: linear-gradient(180deg, #67e8f9, #a78bfa 55%, #bef264);
        }
        html::-webkit-scrollbar-thumb:hover {
          background-image: linear-gradient(180deg, #7dd3fc, #c4b5fd 55%, #d9f99d);
        }
      `}</style>

      <LandingCosmicBackground />
      <MissionControlNavbar />

      {/* pt-24 keeps the hero panel clearly below the 56px navbar corner on
          desktop and the full 56px bar on mobile, with consistent galaxy
          breathing room above the first panel. */}
      <div className="relative z-10 pt-24">
        <ConsultationContent />
      </div>

      <footer className="relative z-10 px-4 pb-12 pt-2 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <p className="font-space text-xs uppercase tracking-[0.16em] text-slate-400">
            Curious Labs · AI integration consultation
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#c6f75b]/70">
            A more capable tomorrow. Together. /_
          </p>
          <Link
            to="/"
            className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400 transition-colors hover:text-slate-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-slate-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
