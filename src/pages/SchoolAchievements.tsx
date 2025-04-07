
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';

const SchoolAchievements = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold">Prestasi Sekolah</h1>
            <p className="mt-4 text-xl">Pencapaian dan prestasi yang telah diraih oleh siswa dan sekolah kami</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-16">
            {/* Year Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Prestasi Tahun 2023</h2>
              <div className="mt-6 space-y-8">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <img className="h-48 w-full object-cover md:w-48" src="https://via.placeholder.com/400x400?text=Science+Olympiad" alt="Science Olympiad" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center">
                        <Badge className="bg-yellow-500 hover:bg-yellow-600">Juara 1</Badge>
                        <span className="ml-2 text-sm text-gray-500">Olimpiade Sains Nasional</span>
                      </div>
                      <h3 className="mt-2 text-xl font-semibold text-gray-900">Juara 1 Olimpiade Fisika Tingkat Nasional</h3>
                      <p className="mt-3 text-gray-600">
                        Siswa kami, Ahmad Rizky, berhasil meraih juara 1 dalam Olimpiade Fisika Tingkat Nasional yang diselenggarakan oleh Kementerian Pendidikan dan Kebudayaan.
                      </p>
                      <div className="mt-4 text-sm text-gray-500">10 November 2023</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <img className="h-48 w-full object-cover md:w-48" src="https://via.placeholder.com/400x400?text=Debate+Competition" alt="Debate Competition" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center">
                        <Badge className="bg-gray-500 hover:bg-gray-600">Juara 2</Badge>
                        <span className="ml-2 text-sm text-gray-500">Kompetisi Debat</span>
                      </div>
                      <h3 className="mt-2 text-xl font-semibold text-gray-900">Juara 2 Kompetisi Debat Bahasa Inggris</h3>
                      <p className="mt-3 text-gray-600">
                        Tim debat sekolah kami meraih juara 2 dalam Kompetisi Debat Bahasa Inggris Tingkat Provinsi yang diselenggarakan oleh Dinas Pendidikan Provinsi.
                      </p>
                      <div className="mt-4 text-sm text-gray-500">25 September 2023</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <img className="h-48 w-full object-cover md:w-48" src="https://via.placeholder.com/400x400?text=Football+Championship" alt="Football Championship" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center">
                        <Badge className="bg-rose-500 hover:bg-rose-600">Juara 3</Badge>
                        <span className="ml-2 text-sm text-gray-500">Turnamen Olahraga</span>
                      </div>
                      <h3 className="mt-2 text-xl font-semibold text-gray-900">Juara 3 Turnamen Sepak Bola Antar SMA</h3>
                      <p className="mt-3 text-gray-600">
                        Tim sepak bola sekolah kami berhasil meraih juara 3 dalam Turnamen Sepak Bola Antar SMA se-Kabupaten yang diselenggarakan oleh KONI Kabupaten.
                      </p>
                      <div className="mt-4 text-sm text-gray-500">15 Agustus 2023</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Year Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 border-b pb-2">Prestasi Tahun 2022</h2>
              <div className="mt-6 space-y-8">
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <img className="h-48 w-full object-cover md:w-48" src="https://via.placeholder.com/400x400?text=Robotics+Competition" alt="Robotics Competition" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center">
                        <Badge className="bg-yellow-500 hover:bg-yellow-600">Juara 1</Badge>
                        <span className="ml-2 text-sm text-gray-500">Kompetisi Robotik</span>
                      </div>
                      <h3 className="mt-2 text-xl font-semibold text-gray-900">Juara 1 Kompetisi Robotik Tingkat Provinsi</h3>
                      <p className="mt-3 text-gray-600">
                        Tim robotik sekolah kami meraih juara 1 dalam Kompetisi Robotik Tingkat Provinsi dan mewakili provinsi di tingkat nasional.
                      </p>
                      <div className="mt-4 text-sm text-gray-500">20 Oktober 2022</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="md:flex">
                    <div className="md:flex-shrink-0">
                      <img className="h-48 w-full object-cover md:w-48" src="https://via.placeholder.com/400x400?text=Art+Competition" alt="Art Competition" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center">
                        <Badge className="bg-yellow-500 hover:bg-yellow-600">Juara 1</Badge>
                        <span className="ml-2 text-sm text-gray-500">Festival Seni</span>
                      </div>
                      <h3 className="mt-2 text-xl font-semibold text-gray-900">Juara 1 Lomba Melukis Tingkat Kota</h3>
                      <p className="mt-3 text-gray-600">
                        Siswi kami, Anisa Putri, berhasil meraih juara 1 dalam Lomba Melukis Tingkat Kota dengan tema "Keindahan Alam Indonesia".
                      </p>
                      <div className="mt-4 text-sm text-gray-500">5 Mei 2022</div>
                    </div>
                  </div>
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

export default SchoolAchievements;
