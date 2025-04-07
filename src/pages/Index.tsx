
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, BookOpen, Award, Users, UserPlus, Calendar } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              School Management System
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl">
              Efisien dalam mengelola data siswa, jurusan, kelas, dan semua kebutuhan administrasi sekolah.
            </p>
            <div className="mt-10 flex justify-center">
              <Button asChild size="lg" className="rounded-md shadow px-8">
                <Link to="/ppdb">Pendaftaran Siswa Baru</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="ml-4 rounded-md shadow px-8 bg-white text-blue-600 hover:bg-gray-50">
                <Link to="/about">Pelajari Lebih Lanjut</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Layanan Kami
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Kelola semua aspek administrasi sekolah dengan mudah dan efisien
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-md text-blue-600">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Manajemen Siswa</h3>
              <p className="mt-2 text-gray-600">
                Kelola data siswa dengan mudah, termasuk riwayat akademik dan data pribadi.
              </p>
              <Link to="/dashboard/students" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
                Selengkapnya <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-md text-blue-600">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Data Jurusan & Kelas</h3>
              <p className="mt-2 text-gray-600">
                Organisasi data jurusan dan kelas untuk pemantauan yang efektif.
              </p>
              <Link to="/dashboard/classes" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
                Selengkapnya <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-md text-blue-600">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Prestasi Sekolah</h3>
              <p className="mt-2 text-gray-600">
                Dokumentasi prestasi siswa dan sekolah dalam berbagai bidang.
              </p>
              <Link to="/achievements" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
                Selengkapnya <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-md text-blue-600">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">Kegiatan Sekolah</h3>
              <p className="mt-2 text-gray-600">
                Informasi dan jadwal kegiatan sekolah, baik akademik maupun non-akademik.
              </p>
              <Link to="/activities" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
                Selengkapnya <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-md text-blue-600">
                <UserPlus className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">PPDB Online</h3>
              <p className="mt-2 text-gray-600">
                Pendaftaran siswa baru secara online untuk kemudahan administrasi.
              </p>
              <Link to="/ppdb" className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800">
                Selengkapnya <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Siap mengelola sekolah?</span>
            <span className="block text-blue-200">Masuk ke dashboard sekarang.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <Button asChild size="lg" variant="secondary" className="rounded-md shadow px-8">
              <Link to="/login">Login ke Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
