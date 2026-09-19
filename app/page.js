'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import ApplicationForm from '@/components/ApplicationForm';
import Requirements from '@/components/Requirements';
import Tracker from '@/components/Tracker';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';

export default function Home() {
  const [stage, setStage] = useState(2);
  const [toast, setToast] = useState(null);

  const scrollTo = (id) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmitted = (payload) => {
    setToast(payload);
    setStage(3);
  };

  return (
    <main>
      <Header onNav={scrollTo} />
      <Hero onNav={scrollTo} />
      <Stats />
      <ApplicationForm onSubmitted={handleSubmitted} />
      <Requirements />
      <Tracker stage={stage} />
      <Footer onNav={scrollTo} />
      <Toast data={toast} />
    </main>
  );
}
