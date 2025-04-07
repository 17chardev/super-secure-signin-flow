
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold">Tentang Kami</h1>
            <p className="mt-4 text-xl">Mengenal lebih dekat sekolah kami dan komitmen pendidikan kami</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">Sejarah Sekolah</h2>
              <p className="mt-4 text-lg text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="mt-4 text-lg text-gray-500">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="shadow-lg rounded-lg overflow-hidden">
                <img
                  className="w-full h-auto"
                  src="https://via.placeholder.com/600x400?text=School+History"
                  alt="School History"
                />
              </div>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-extrabold text-gray-900">Visi & Misi</h2>
            
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-gray-900">Visi</h3>
              <p className="mt-4 text-lg text-gray-500">
                "Menjadi lembaga pendidikan unggul yang menghasilkan generasi berakhlak mulia, berprestasi, inovatif, dan berwawasan global."
              </p>
            </div>
            
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-gray-900">Misi</h3>
              <ul className="mt-4 space-y-4 text-lg text-gray-500">
                <li className="flex">
                  <svg className="h-6 w-6 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mengembangkan pendidikan karakter dan akhlak mulia
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mengembangkan pembelajaran yang inovatif dan menyenangkan
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Meningkatkan prestasi akademik dan non-akademik siswa
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Membekali siswa dengan keterampilan global dan teknologi
                </li>
                <li className="flex">
                  <svg className="h-6 w-6 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Menjalin kerjasama dengan berbagai pihak untuk pengembangan pendidikan
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-16">
            <h2 className="text-3xl font-extrabold text-gray-900">Fasilitas</h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Laboratorium Komputer</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Dilengkapi dengan komputer modern dan akses internet cepat untuk mendukung pembelajaran teknologi.
                  </p>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Perpustakaan</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Menyediakan ribuan koleksi buku dan sumber belajar digital untuk siswa dan guru.
                  </p>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Lapangan Olahraga</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Tersedia lapangan sepak bola, basket, dan voli untuk kegiatan olahraga dan ekstrakurikuler.
                  </p>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Ruang Kelas Modern</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Setiap kelas dilengkapi dengan proyektor, koneksi internet, dan AC untuk kenyamanan belajar.
                  </p>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Kantin Sehat</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Menyediakan makanan dan minuman sehat dengan standar kebersihan yang ketat.
                  </p>
                </div>
              </div>
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">Laboratorium Sains</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Dilengkapi dengan peralatan modern untuk praktikum fisika, kimia, dan biologi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
