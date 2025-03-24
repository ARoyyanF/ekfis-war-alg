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
              Penjadwalan untuk praktikum Ekfis (Eksperimen Fisika) sering kali menjadi ajang perebutan slot waktu, di mana mahasiswa harus berlomba-lomba untuk mendapatkan jadwal terbaik. Sistem ini tidak hanya menciptakan ketidakadilan, tetapi juga meningkatkan stres dan ketidakpastian. AutoWar Algorithm hadir sebagai solusi otomatis untuk menghilangkan "perang" dalam penjadwalan dan menggantinya dengan sistem yang lebih adil, efisien, dan transparan.
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
              Saat ini, sistem pendaftaran Ekfis memiliki beberapa permasalahan utama:
            </p>
            <div className="font-poppins animate-fade-down animate-duration-[1000ms] animate-delay-[2000ms] text-sm lg:text-base text-center px-4 text-white lg:px-24">
              <ul className="list-disc text-left mx-auto max-w-3xl space-y-2">
                <li>Persaingan Tidak Adil: Mahasiswa dengan koneksi internet lebih cepat memiliki keuntungan lebih.</li>
                <li>Stres dan Ketidakpastian: Tidak adanya jaminan mendapatkan slot sesuai preferensi.</li>
                <li>Ketidakseimbangan Beban: Beberapa slot penuh dengan cepat sementara yang lain masih kosong.</li>
                <li>Kurangnya Transparansi: Proses penentuan slot tidak jelas dan sulit diprediksi.</li>
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
              AutoWar Algorithm menggunakan algoritma Gale-Shapley untuk menyesuaikan slot waktu secara otomatis berdasarkan kesibukan mahasiswa. Langkah-langkah utama dalam sistem ini adalah:
            </p>
            <div className="font-poppins animate-fade-down animate-duration-[1000ms] animate-delay-[2000ms] text-sm lg:text-base text-center px-4 text-white lg:px-24">
              <ul className="list-disc text-left mx-auto max-w-3xl space-y-2">
                <li>Mahasiswa memasukkan NIM mereka untuk verifikasi.</li>
                <li>Mahasiswa mengisi kesibukan mereka dalam rentang waktu yang ditentukan.</li>
                <li>Algoritma akan menganalisis kesibukan seluruh mahasiswa dan mengoptimalkan distribusi slot.</li>
                <li>Sistem memberikan 5 kandidat slot terbaik untuk dipilih oleh mahasiswa, sehingga tetap ada fleksibilitas.</li>
                <li>Jadwal akhir ditentukan dengan mempertimbangkan keseimbangan dan preferensi individu.</li>
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
              Kami percaya bahwa sistem ini harus transparan dan dapat diaudit oleh mahasiswa serta pengelola akademik. Oleh karena itu:
            </p>
            <div className="font-poppins animate-fade-down animate-duration-[1000ms] animate-delay-[2000ms] text-sm lg:text-base text-center px-4 text-white lg:px-24">
              <ul className="list-disc text-left mx-auto max-w-3xl space-y-2">
                <li>Kode sumber terbuka: Semua kode algoritma dapat diakses di GitHub.</li>
                <li>Proses seleksi dapat diverifikasi: Mahasiswa dapat melihat bagaimana keputusan diambil.</li>
                <li>Algoritma berbasis keadilan: Tidak ada prioritas berdasarkan kecepatan pendaftaran, hanya berdasarkan kesibukan dan optimalisasi jadwal.</li>
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
              <Link href="https://github.com/username/AutoWar-Algorithm" target="_blank">
                <Button className="font-bold bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md">
                  GitHub Repo: AutoWar Algorithm
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: 6,
      title: "Algoritma yang Digunakan",
      content: (
        <div className="leading-tight py-2 content-center">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="font-montserrat animate-jump-in animate-duration-[3000ms] text-2xl lg:text-4xl font-bold text-center mb-4 text-white">
              Algoritma yang Digunakan
            </h1>
            <p className="font-poppins animate-fade-down animate-duration-[1000ms] animate-delay-[2000ms] text-sm lg:text-base text-center px-4 mb-4 text-white lg:px-24">
              AutoWar Algorithm mengimplementasikan beberapa metode optimasi:
            </p>
            <div className="font-poppins animate-fade-down animate-duration-[1000ms] animate-delay-[2000ms] text-sm lg:text-base text-center px-4 text-white lg:px-24">
              <ul className="list-disc text-left mx-auto max-w-3xl space-y-2">
                <li>Constraint Satisfaction Problem (CSP) untuk menemukan solusi yang memenuhi batasan kesibukan mahasiswa.</li>
                <li>Weighted Matching Algorithm untuk memilih slot yang paling sesuai.</li>
                <li>Greedy Algorithm dengan Backtracking untuk menghindari konflik dan menyeimbangkan beban slot.</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, pages.length));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handlePageSelect = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col bg-gradient-to-tr from-[#21217c] to-[#214a9b] rounded-3xl mb-8">
      {/* Content */}
      <div className="flex flex-col items-center justify-center py-4">
        {/* Show the current page content */}
        {pages[currentPage - 1]?.content}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center p-2 w-full">
        <Button 
          onClick={handlePrev} 
          disabled={currentPage === 1}
          className="bg-white text-blue-700 hover:bg-gray-100"
        >
          Previous
        </Button>
        
        <div className="flex space-x-2">
          {pages.map((page) => (
            <Button
              key={page.number}
              onClick={() => handlePageSelect(page.number)}
              variant={currentPage === page.number ? "default" : "outline"}
              className={`w-10 h-10 rounded-full ${
                currentPage === page.number ? "bg-white text-blue-700" : "bg-transparent text-white border-white"
              }`}
            >
              {page.number}
            </Button>
          ))}
        </div>
        
        <Button 
          onClick={handleNext} 
          disabled={currentPage === pages.length}
          className="bg-white text-blue-700 hover:bg-gray-100"
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;
