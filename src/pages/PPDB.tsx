
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const PPDB = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold">Pendaftaran Peserta Didik Baru</h1>
            <p className="mt-4 text-xl">Informasi dan pendaftaran siswa baru tahun ajaran 2023/2024</p>
            <Button size="lg" className="mt-8 bg-white text-blue-600 hover:bg-gray-100">
              Daftar Sekarang
            </Button>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-extrabold text-gray-900">Informasi PPDB</h2>
          <p className="mt-4 text-lg text-gray-500">
            Berikut adalah informasi penting mengenai Penerimaan Peserta Didik Baru (PPDB) untuk tahun ajaran 2023/2024.
          </p>
          
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-900">Jadwal Pendaftaran</h3>
            <div className="mt-6 border border-gray-300 rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6 bg-gray-50">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Gelombang I</dt>
                    <dd className="mt-1 text-sm text-gray-900">1 Januari - 28 Februari 2023</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Pengumuman Gelombang I</dt>
                    <dd className="mt-1 text-sm text-gray-900">15 Maret 2023</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Gelombang II</dt>
                    <dd className="mt-1 text-sm text-gray-900">1 Maret - 30 April 2023</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Pengumuman Gelombang II</dt>
                    <dd className="mt-1 text-sm text-gray-900">15 Mei 2023</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-900">Persyaratan</h3>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-base text-gray-500">
                  Fotocopy Kartu Keluarga
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-base text-gray-500">
                  Akta Kelahiran
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-base text-gray-500">
                  Ijazah dan Transkrip Nilai SD/MI
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-base text-gray-500">
                  Pas Foto terbaru ukuran 3x4 sebanyak 3 lembar
                </p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="ml-3 text-base text-gray-500">
                  Sertifikat prestasi (jika ada)
                </p>
              </li>
            </ul>
          </div>
          
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-900">Biaya Pendaftaran</h3>
            <p className="mt-4 text-lg text-gray-500">
              Biaya pendaftaran sebesar Rp 200.000 dapat dibayarkan melalui transfer bank ke rekening sekolah atau pembayaran langsung di loket administrasi sekolah.
            </p>
          </div>
          
          <div className="mt-10">
            <h3 className="text-2xl font-bold text-gray-900">Jurusan yang Tersedia</h3>
            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group relative">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900">IPA (Ilmu Pengetahuan Alam)</h4>
                  <p className="mt-2 text-sm text-gray-500">Fokus pada pelajaran Matematika, Fisika, Kimia, dan Biologi.</p>
                </div>
              </div>
              <div className="group relative">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900">IPS (Ilmu Pengetahuan Sosial)</h4>
                  <p className="mt-2 text-sm text-gray-500">Fokus pada pelajaran Ekonomi, Geografi, Sejarah, dan Sosiologi.</p>
                </div>
              </div>
              <div className="group relative">
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900">Bahasa</h4>
                  <p className="mt-2 text-sm text-gray-500">Fokus pada pelajaran Bahasa Indonesia, Bahasa Inggris, dan Bahasa Asing lainnya.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button size="lg">Daftar Sekarang</Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PPDB;
