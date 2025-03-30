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
        <div className="flex flex-row sm:flex-column sm:justify-between gap-8">
          <div className="flex-1 text-left">
            <h2 className="text-2xl font-bold">JUDUL</h2>
            <h2 className="text-2xl font-bold">MUNCULIN DI SINI</h2>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Tentang Web</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              this web bussin fr we help sigmas of physics to schedulemaxxing no
              fanum tax needed no edging for wars only mewing and mogging all
              throughout the modules
            </p>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Tentang Kami</h3>
            <p className="text-sm text-gray-600 max-w-xs">
              our team consist of 3 rizzlers of physics 22 that is royyan fathin
              and azwa we are very good at web developing trust
            </p>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="flex space-x-4 text-gray-500">
              <a href="https://line.me" className="hover:text-gray-700">
                <i
                  data-lucide="message-circle-more"
                  style={{ width: 24, height: 24 }}
                ></i>
              </a>
              <a href="https://instagram.com" className="hover:text-gray-700">
                <Instagram size={24} />
              </a>
              <a href="https://linkedin.com" className="hover:text-gray-700">
                <Linkedin size={24} />
              </a>
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
