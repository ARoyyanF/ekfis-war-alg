"use client";

import React from "react";

export const Timeline = () => {
  const steps = [
    {
      number: 1,
      title: "Masuk ke sistem",
      description: "Autentikasi dengan NIM"
    },
    {
      number: 2,
      title: "Verifikasi & Tetapkan NIM",
      description: ""
    },
    {
      number: 3,
      title: "Isi Kesibukan",
      description: "Pilih waktu yang tidak tersedia"
    },
    {
      number: 4,
      title: "Algoritma Berjalan",
      description: "Mengoptimalkan distribusi slot"
    },
    {
      number: 5,
      title: "Pilih 5 Kandidat Slot Terbaik",
      description: "Mahasiswa memilih dari opsi terbaik yang diberikan"
    }
  ];

  return (
    <div className="bg-gradient-to-tr from-[#21217c] to-[#214a9b] text-white py-5 px-4 rounded-3xl mb-8 overflow-hidden border shadow-sm">
      <h2 className="text-2xl font-bold text-center mb-6">Cara Kerja Algoritma</h2>
      
      <div className="max-w-5xl mx-auto px-2 md:px-4">
        {/* Container for the timeline */}
        <div className="relative h-[140px]">
          {/* Horizontal line connecting all dots */}
          <div className="absolute top-8 left-[10%] right-[10%] h-[2px] bg-white"></div>
          
          {/* All steps in a single row */}
          <div className="flex justify-between relative z-10">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-center" style={{ maxWidth: '120px' }}>
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#214a9b] text-white border-2 border-white flex items-center justify-center mb-3">
                  <span className="text-lg md:text-xl font-bold">{step.number}</span>
                </div>
                <div className="text-center">
                  <p className="font-bold text-xs md:text-sm">{step.title}</p>
                  <p className="text-[10px] md:text-xs text-blue-200 leading-tight mt-1">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline; 