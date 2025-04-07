
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Extracurricular = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold">Ekstrakurikuler</h1>
            <p className="mt-4 text-xl">Kegiatan ekstrakurikuler untuk mengembangkan bakat dan minat siswa</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Temukan Minat dan Bakat Anda</h2>
            <p className="mt-4 text-xl text-gray-500">
              Kami menyediakan berbagai kegiatan ekstrakurikuler untuk membantu siswa mengembangkan bakat dan minat mereka di luar pembelajaran akademik.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Ekstrakurikuler Card 1 */}
            <div className="bg-white overflow-hidden shadow-lg rounded-lg">
              <img className="w-full h-56 object-cover" src="https://via.placeholder.com/600x400?text=Basketball" alt="Basketball" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">Basket</h3>
                <p className="mt-3 text-gray-600">
                  Ekstrakurikuler basket melatih keterampilan olahraga, kerja sama tim, dan kedisiplinan. Tim basket sekolah kami telah memenangkan berbagai kompetisi tingkat kabupaten dan provinsi.
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Jadwal: Senin & Jumat, 15:00 - 17:00
                  </div>
                  <Button variant="outline" size="sm">Detail</Button>
                </div>
              </div>
            </div>
            
            {/* Ekstrakurikuler Card 2 */}
            <div className="bg-white overflow-hidden shadow-lg rounded-lg">
              <img className="w-full h-56 object-cover" src="https://via.placeholder.com/600x400?text=Robotics" alt="Robotics" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">Robotika</h3>
                <p className="mt-3 text-gray-600">
                  Klub robotika mengajarkan siswa tentang dasar-dasar mekanika, elektronika, dan pemrograman dalam membangun dan mengoperasikan robot.
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Jadwal: Rabu, 15:00 - 17:00
                  </div>
                  <Button variant="outline" size="sm">Detail</Button>
                </div>
              </div>
            </div>
            
            {/* Ekstrakurikuler Card 3 */}
            <div className="bg-white overflow-hidden shadow-lg rounded-lg">
              <img className="w-full h-56 object-cover" src="https://via.placeholder.com/600x400?text=Music" alt="Music" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">Musik</h3>
                <p className="mt-3 text-gray-600">
                  Klub musik memberikan kesempatan bagi siswa untuk belajar berbagai alat musik, berlatih bersama, dan tampil di berbagai acara sekolah dan kompetisi.
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Jadwal: Selasa & Kamis, 15:00 - 17:00
                  </div>
                  <Button variant="outline" size="sm">Detail</Button>
                </div>
              </div>
            </div>
            
            {/* Ekstrakurikuler Card 4 */}
            <div className="bg-white overflow-hidden shadow-lg rounded-lg">
              <img className="w-full h-56 object-cover" src="https://via.placeholder.com/600x400?text=Debate" alt="Debate" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">Debat</h3>
                <p className="mt-3 text-gray-600">
                  Tim debat melatih kemampuan berpikir kritis, penelitian, dan berbicara di depan umum. Kami berpartisipasi dalam kompetisi debat bahasa Indonesia dan bahasa Inggris.
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Jadwal: Jumat, 15:00 - 17:00
                  </div>
                  <Button variant="outline" size="sm">Detail</Button>
                </div>
              </div>
            </div>
            
            {/* Ekstrakurikuler Card 5 */}
            <div className="bg-white overflow-hidden shadow-lg rounded-lg">
              <img className="w-full h-56 object-cover" src="https://via.placeholder.com/600x400?text=Scouts" alt="Scouts" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">Pramuka</h3>
                <p className="mt-3 text-gray-600">
                  Pramuka mengajarkan kedisiplinan, kepemimpinan, kemandirian, dan berbagai keterampilan hidup melalui kegiatan-kegiatan yang menarik dan menantang.
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Jadwal: Sabtu, 08:00 - 11:00
                  </div>
                  <Button variant="outline" size="sm">Detail</Button>
                </div>
              </div>
            </div>
            
            {/* Ekstrakurikuler Card 6 */}
            <div className="bg-white overflow-hidden shadow-lg rounded-lg">
              <img className="w-full h-56 object-cover" src="https://via.placeholder.com/600x400?text=Theater" alt="Theater" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">Teater</h3>
                <p className="mt-3 text-gray-600">
                  Klub teater melatih siswa dalam seni peran, penulisan naskah, dan produksi teater. Kami mengadakan pertunjukan teater setiap semester.
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    Jadwal: Rabu & Jumat, 15:00 - 17:00
                  </div>
                  <Button variant="outline" size="sm">Detail</Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold text-gray-900">Tertarik untuk Bergabung?</h3>
            <p className="mt-4 text-gray-600">
              Silakan hubungi guru pembimbing atau kunjungi ruang OSIS untuk informasi pendaftaran. 
            </p>
            <Button className="mt-6">Hubungi Kami</Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Extracurricular;
