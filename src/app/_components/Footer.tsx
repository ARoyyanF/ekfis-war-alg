"use client";

import React, { useEffect } from "react";
import { createIcons, icons } from "lucide";
import { Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  useEffect(() => {
    createIcons({ icons });
  }, []);

  return (
    <footer className="mt-auto bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="mx-auto w-full max-w-screen-xl p-8">
        <div className="flex  md:flex-row sm:justify-between gap-8">
          <div className="flex-1 text-left">
            <h2 className="text-2xl font-bold">AutoWar</h2>
            <h2 className="text-2xl font-bold">ALGORITHM</h2>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Tentang Web</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Platform ini dirancang untuk membantu praktikan dalam menentukan
              jadwal untuk mata kuliah Eksperimen Fisika. Dengan algoritma ini,
              perancangan jadwal dibuat sedemikian adil dan efisien.
            </p>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Tentang Kami</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              Tim kami terdiri atas Royyan, Fathin, dan Azwa, mahasiswa Fisika
              ITB angkatan 22. Kami berkomitmen untuk menciptakan solusi yang
              mempermudah kehidupan masyarakat fisika melalui teknologi.
            </p>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <div className="flex flex-col space-y-2 text-gray-500">
              <div className="flex items-center space-x-4">
                <i
                  data-lucide="message-circle-more"
                  style={{ width: 24, height: 24 }}
                ></i>
                <a className="hover:text-gray-700">arf_123</a>
              </div>
              <div className="flex items-center space-x-4">
                <Instagram size={24} />
                <a
                  href="https://www.instagram.com/arfg3_/"
                  className="hover:text-gray-700"
                >
                  @arfg3_
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <Linkedin size={24} />
                <a
                  href="https://id.linkedin.com/in/aroyyanf"
                  className="hover:text-gray-700"
                >
                  Ahmad Royyan Fattah
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="mt-4 text-center text-sm text-gray-500">
          <span>© {new Date().getFullYear()} HIMAFI FMIPA UNJ</span>
        </div> */}
      </div>
    </footer>
  );
}
