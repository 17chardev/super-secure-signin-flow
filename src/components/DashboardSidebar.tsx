
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Users, 
  BookOpen, 
  FileText,
  GraduationCap,
  Calendar,
  Award,
  LogOut,
  User
} from 'lucide-react';

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home size={20} /> },
    { name: 'Data Siswa', path: '/dashboard/students', icon: <Users size={20} /> },
    { name: 'Data Jurusan', path: '/dashboard/majors', icon: <BookOpen size={20} /> },
    { name: 'Data Kelas', path: '/dashboard/classes', icon: <FileText size={20} /> },
    { name: 'Data Angkatan', path: '/dashboard/batches', icon: <GraduationCap size={20} /> },
    { name: 'Data Orangtua', path: '/dashboard/parents', icon: <User size={20} /> },
  ];

  return (
    <div 
      className={`bg-gray-900 text-white flex flex-col h-screen transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <h1 className="text-xl font-bold">School Admin</h1>}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white hover:bg-gray-800"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center py-2 px-4 rounded-md 
                ${location.pathname === item.path 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
                ${collapsed ? 'justify-center' : ''}
              `}
            >
              <span className="mr-3">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-700">
        <div className={`flex ${collapsed ? 'justify-center' : 'items-center justify-between'} mb-4`}>
          {!collapsed && (
            <div>
              <p className="text-sm font-medium text-white truncate">{user?.email}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
          )}
        </div>
        <Button 
          variant="outline" 
          onClick={handleLogout} 
          className={`text-white border-gray-600 hover:bg-gray-800 hover:text-white ${
            collapsed ? 'w-full p-2 justify-center' : 'w-full'
          }`}
        >
          <LogOut size={18} className={collapsed ? '' : 'mr-2'} />
          {!collapsed && 'Logout'}
        </Button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
