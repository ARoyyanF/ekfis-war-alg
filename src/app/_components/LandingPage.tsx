"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export function LandingPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const pages = [
    {
      number: 1,
      title: "Mengapa Kita Melakukan Ini?",
      content: (
        <div className="leading-tight py-2 content-center">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="font-montserrat animate-jump-in animate-duration-[3000ms] text-2xl lg:text-4xl font-bold text-center mb-4 text-white">
              Mengapa Kita Melakukan Ini?
            </h1>
            <p className="font-poppins animate-fade-down animate-duration-[1000ms] animate-delay-[2000ms] text-sm lg:text-base text-center px-4 mb-4 text-white lg:px-24">
              Penjadwalan untuk praktikum Ekfis (Eksperimen Fisika) sering kali
              menjadi ajang perebutan slot waktu, di mana mahasiswa harus
              berlomba-lomba untuk mendapatkan jadwal terbaik. Sistem ini tidak
              hanya menciptakan ketidakadilan, tetapi juga meningkatkan stres
              dan ketidakpastian. AutoWar Algorithm hadir sebagai solusi
              otomatis untuk menghilangkan "perang" dalam penjadwalan dan
              menggantinya dengan sistem yang lebih adil, efisien, dan
              transparan.
            </p>
          </div>
        </div>
      ),
    },
    {
      number: 2,
      title: "Pernyataan Masalah",
      content: (
        <div className="leading-tight py-2 content-center">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="font-montserrat animate-jump-in animate-duration-[3000ms] text-2xl lg:text-4xl font-bold text-center mb-4 text-white">
              Pernyataan Masalah
            </h1>
            <p className="font-poppins animate-fade-down animate-duration-[1000ms] animate-delay-[2000ms] text-sm lg:text-base text-center px-4 mb-4 text-white lg:px-24">
              Saat ini, sistem pendaftaran Ekfis memiliki beberapa permasalahan
              utama:
            </p>
            <div className="font-poppins animate-fade-down animate-duration-[1000ms] animate-delay-[2000ms] text-sm lg:text-base text-center px-4 text-white lg:px-24">
              <ul className="list-disc text-left mx-auto max-w-3xl space-y-2">
                <li>
                  Persaingan Tidak Adil: Mahasiswa dengan koneksi internet lebih
                  cepat memiliki keuntungan lebih.
                </li>
                <li>
                  Stres dan Ketidakpastian: Tidak adanya jaminan mendapatkan
                  slot sesuai preferensi.
                </li>
                <li>
                  Ketidakseimbangan Beban: Beberapa slot penuh dengan cepat
                  sementara yang lain masih kosong.
                </li>
                <li>
                  Kurangnya Transparansi: Proses penentuan slot tidak jelas dan
                  sulit diprediksi.
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: 3,
      title: "Solusi yang Diusulkan",
      content: (
        <div className="leading-tight py-2 content-center">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="font-montserrat animate-jump-in animate-duration-[3000ms] text-2xl lg:text-4xl font-bold text-center mb-4 text-white">
              Solusi yang Diusulkan
            </h1>
            <p className="font-poppins animate-fade-down animate-duration-[1000ms] animate-delay-[2000ms] text-sm lg:text-base text-center px-4 mb-4 text-white lg:px-24">
              AutoWar Algorithm menggunakan algoritma Gale-Shapley untuk
              menyesuaikan slot waktu secara otomatis berdasarkan kesibukan
              mahasiswa. Langkah-langkah utama dalam sistem ini adalah:
            </p>
            <div className="font-poppins animate-fade-down animate-duration-[1000ms] animate-delay-[2000ms] text-sm lg:text-base text-center px-4 text-white lg:px-24">
              <ul className="list-disc text-left mx-auto max-w-3xl space-y-2">
                <li>Mahasiswa memasukkan NIM mereka untuk verifikasi.</li>
                <li>
                  Mahasiswa mengisi kesibukan mereka dalam rentang waktu yang
                  ditentukan.
                </li>
                <li>
                  Algoritma akan menganalisis kesibukan seluruh mahasiswa dan
                  mengoptimalkan distribusi slot.
                </li>
                <li>
                  Sistem memberikan 5 kandidat slot terbaik untuk dipilih oleh
                  mahasiswa, sehingga tetap ada fleksibilitas.
                </li>
                <li>
                  Jadwal akhir ditentukan dengan mempertimbangkan keseimbangan
                  dan preferensi individu.
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },

    {
      number: 4,
      title: "Pernyataan Transparansi",
      content: (
        <div className="leading-tight py-2 content-center">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="font-montserrat animate-jump-in animate-duration-[3000ms] text-2xl lg:text-4xl font-bold text-center mb-4 text-white">
              Pernyataan Transparansi
            </h1>
            <p className="font-poppins animate-fade-down animate-duration-[1000ms] animate-delay-[2000ms] text-sm lg:text-base text-center px-4 mb-4 text-white lg:px-24">
              Kami percaya bahwa sistem ini harus transparan dan dapat diaudit
              oleh mahasiswa serta pengelola akademik. Oleh karena itu:
            </p>
            <div className="font-poppins animate-fade-down animate-duration-[1000ms] animate-delay-[2000ms] text-sm lg:text-base text-center px-4 text-white lg:px-24">
              <ul className="list-disc text-left mx-auto max-w-3xl space-y-2">
                <li>
                  Kode sumber terbuka: Semua kode algoritma dapat diakses di
                  GitHub.
                </li>
                <li>
                  Proses seleksi dapat diverifikasi: Mahasiswa dapat melihat
                  bagaimana keputusan diambil.
                </li>
                <li>
                  Algoritma berbasis keadilan: Tidak ada prioritas berdasarkan
                  kecepatan pendaftaran, hanya berdasarkan kesibukan dan
                  optimalisasi jadwal.
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: 5,
      title: "Tautan Repository GitHub",
      content: (
        <div className="leading-tight py-2 content-center">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="font-montserrat animate-jump-in animate-duration-[3000ms] text-2xl lg:text-4xl font-bold text-center mb-4 text-white">
              Tautan Repository GitHub
            </h1>
            <p className="font-poppins animate-fade-down animate-duration-[1000ms] animate-delay-[2000ms] text-sm lg:text-base text-center px-4 mb-4 text-white lg:px-24">
              Kode sumber dan dokumentasi lengkap tersedia di GitHub:
            </p>
            <div className="flex justify-center">
              <Link
                href="https://github.com/username/AutoWar-Algorithm"
                target="_blank"
              >
                <Button className="font-bold bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md">
                  GitHub Repo: AutoWar Algorithm
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    setCurrentPage((prev) => (prev === pages.length ? 1 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 1 ? pages.length : prev - 1));
  };

  const handlePageSelect = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col bg-gradient-to-tr from-[#21217c] to-[#214a9b] rounded-3xl mb-8 border shadow-sm">
      {/* Content */}
      <div className="flex flex-col items-center justify-center py-4 min-h-[280px]">
        {/* Show the current page content */}
        {pages[currentPage - 1]?.content}
      </div>

      {/* Navigation */}
      <div className="px-4 py-3 w-full">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-2">
            {/* Previous button - now always enabled */}
            <Button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-[#214a9b] text-white border-2 border-white flex items-center justify-center p-0"
            >
              <span className="text-xl font-bold">&lt;</span>
            </Button>

            {/* First dot (1) */}
            <Button
              onClick={() => handlePageSelect(1)}
              variant={currentPage === 1 ? "default" : "outline"}
              className={`w-10 h-10 rounded-full ${
                currentPage === 1
                  ? "bg-white text-blue-700"
                  : "bg-transparent text-white border-white"
              }`}
            >
              1
            </Button>

            {/* Middle dots (2-5) */}
            <div className="flex space-x-2">
              {pages.slice(1, 4).map((page) => (
                <Button
                  key={page.number}
                  onClick={() => handlePageSelect(page.number)}
                  variant={currentPage === page.number ? "default" : "outline"}
                  className={`w-10 h-10 rounded-full ${
                    currentPage === page.number
                      ? "bg-white text-blue-700"
                      : "bg-transparent text-white border-white"
                  }`}
                >
                  {page.number}
                </Button>
              ))}
            </div>

            {/* Last dot (5) */}
            <Button
              onClick={() => handlePageSelect(5)}
              variant={currentPage === 5 ? "default" : "outline"}
              className={`w-10 h-10 rounded-full ${
                currentPage === 5
                  ? "bg-white text-blue-700"
                  : "bg-transparent text-white border-white"
              }`}
            >
              5
            </Button>

            {/* Next button - now always enabled */}
            <Button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-[#214a9b] text-white border-2 border-white flex items-center justify-center p-0"
            >
              <span className="text-xl font-bold">&gt;</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
