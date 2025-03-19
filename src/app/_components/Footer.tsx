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
      <div className="mx-auto w-full max-w-screen-xl p-4">
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center sm:items-start">
            <h2 className="text-xl font-semibold">EKFIS WAR</h2>
            <p className="text-sm text-gray-600 max-w-md">
              Crafted by a passionate team of three consisting of Royyan,
              Fathin, and Azwa (FI&apos;22).
            </p>
          </div>
          <div className="flex flex-col items-center sm:items-end">
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
            <div className="text-sm text-gray-500 mt-2">
              <span>© {new Date().getFullYear()} HIMAFI FMIPA UNJ</span>
              <span className="mx-2">•</span>
              <a href="mailto:contact@ekfiswar.com" className="hover:underline">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
