
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const SchoolActivities = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <div className="bg-blue-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold">Kegiatan Sekolah</h1>
            <p className="mt-4 text-xl">Berbagai aktivitas yang dilaksanakan di sekolah kami</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {/* Activity Card 1 */}
            <div className="bg-white overflow-hidden shadow-lg rounded-lg">
              <img className="w-full h-48 object-cover" src="https://via.placeholder.com/600x400?text=School+Activity" alt="School Activity" />
              <div className="p-6">
                <div className="text-xs text-gray-500 uppercase font-semibold">12 Desember 2023</div>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">Upacara Hari Pahlawan</h3>
                <p className="mt-3 text-gray-600">
                  Upacara peringatan Hari Pahlawan yang diikuti oleh seluruh siswa dan guru untuk mengenang jasa para pahlawan.
                </p>
                <Button variant="outline" className="mt-4">Lihat Detail</Button>
              </div>
            </div>
            
            {/* Activity Card 2 */}
            <div className="bg-white overflow-hidden shadow-lg rounded-lg">
              <img className="w-full h-48 object-cover" src="https://via.placeholder.com/600x400?text=Science+Fair" alt="Science Fair" />
              <div className="p-6">
                <div className="text-xs text-gray-500 uppercase font-semibold">5 November 2023</div>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">Science Fair 2023</h3>
                <p className="mt-3 text-gray-600">
                  Pameran sains tahunan yang menampilkan proyek-proyek inovatif dari para siswa di bidang ilmu pengetahuan.
                </p>
                <Button variant="outline" className="mt-4">Lihat Detail</Button>
              </div>
            </div>
            
            {/* Activity Card 3 */}
            <div className="bg-white overflow-hidden shadow-lg rounded-lg">
              <img className="w-full h-48 object-cover" src="https://via.placeholder.com/600x400?text=Sports+Day" alt="Sports Day" />
              <div className="p-6">
                <div className="text-xs text-gray-500 uppercase font-semibold">20 Oktober 2023</div>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">Hari Olahraga Sekolah</h3>
                <p className="mt-3 text-gray-600">
                  Kompetisi olahraga antar kelas yang meliputi berbagai cabang olahraga seperti sepak bola, basket, dan atletik.
                </p>
                <Button variant="outline" className="mt-4">Lihat Detail</Button>
              </div>
            </div>
            
            {/* Activity Card 4 */}
            <div className="bg-white overflow-hidden shadow-lg rounded-lg">
              <img className="w-full h-48 object-cover" src="https://via.placeholder.com/600x400?text=Cultural+Day" alt="Cultural Day" />
              <div className="p-6">
                <div className="text-xs text-gray-500 uppercase font-semibold">15 September 2023</div>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">Hari Kebudayaan</h3>
                <p className="mt-3 text-gray-600">
                  Perayaan keragaman budaya dengan menampilkan tarian, musik, dan makanan tradisional dari berbagai daerah.
                </p>
                <Button variant="outline" className="mt-4">Lihat Detail</Button>
              </div>
            </div>
            
            {/* Activity Card 5 */}
            <div className="bg-white overflow-hidden shadow-lg rounded-lg">
              <img className="w-full h-48 object-cover" src="https://via.placeholder.com/600x400?text=Graduation+Day" alt="Graduation Day" />
              <div className="p-6">
                <div className="text-xs text-gray-500 uppercase font-semibold">30 Juni 2023</div>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">Wisuda Angkatan 2023</h3>
                <p className="mt-3 text-gray-600">
                  Acara wisuda untuk melepas para siswa yang telah menyelesaikan pendidikan di sekolah kami.
                </p>
                <Button variant="outline" className="mt-4">Lihat Detail</Button>
              </div>
            </div>
            
            {/* Activity Card 6 */}
            <div className="bg-white overflow-hidden shadow-lg rounded-lg">
              <img className="w-full h-48 object-cover" src="https://via.placeholder.com/600x400?text=Workshop" alt="Workshop" />
              <div className="p-6">
                <div className="text-xs text-gray-500 uppercase font-semibold">10 Mei 2023</div>
                <h3 className="mt-2 text-xl font-semibold text-gray-900">Workshop Kewirausahaan</h3>
                <p className="mt-3 text-gray-600">
                  Workshop yang bertujuan untuk membekali siswa dengan pengetahuan dan keterampilan dasar berwirausaha.
                </p>
                <Button variant="outline" className="mt-4">Lihat Detail</Button>
              </div>
            </div>
          </div>
          
          <div className="mt-12 flex justify-center">
            <Button>Lihat Kegiatan Lainnya</Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SchoolActivities;
