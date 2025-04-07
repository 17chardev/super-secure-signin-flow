
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
  User,
  BarChart3,
  Settings
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Separator } from "@/components/ui/separator";

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const navItems = [
    { 
      name: 'Dashboard', 
      path: '/dashboard', 
      icon: <Home size={20} />,
      description: 'Overview of the school management system'
    },
    { 
      name: 'Data Siswa', 
      path: '/dashboard/students', 
      icon: <Users size={20} />,
      description: 'Manage student information and records'
    },
    { 
      name: 'Data Jurusan', 
      path: '/dashboard/majors', 
      icon: <BookOpen size={20} />,
      description: 'Manage academic departments and majors'
    },
    { 
      name: 'Data Kelas', 
      path: '/dashboard/classes', 
      icon: <FileText size={20} />,
      description: 'Manage classes and class information'
    },
    { 
      name: 'Data Angkatan', 
      path: '/dashboard/batches', 
      icon: <GraduationCap size={20} />,
      description: 'Manage student batches and years'
    },
    { 
      name: 'Data Orangtua', 
      path: '/dashboard/parents', 
      icon: <User size={20} />,
      description: 'Manage parent information and contacts'
    },
  ];

  const userInitials = user?.email ? user.email.substring(0, 2).toUpperCase() : "US";

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
            <HoverCard key={item.path} openDelay={300} closeDelay={100}>
              <HoverCardTrigger asChild>
                <Link
                  to={item.path}
                  className={`
                    flex items-center py-2 px-4 rounded-md group
                    ${location.pathname === item.path 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'}
                    ${collapsed ? 'justify-center' : ''}
                  `}
                >
                  <span className={`${collapsed ? '' : 'mr-3'} transition-all`}>{item.icon}</span>
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </HoverCardTrigger>
              {collapsed && (
                <HoverCardContent side="right" className="bg-gray-800 text-white border-gray-700">
                  <div className="flex flex-col space-y-1">
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-xs text-gray-400">{item.description}</p>
                  </div>
                </HoverCardContent>
              )}
            </HoverCard>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-gray-700">
        <div className={`flex ${collapsed ? 'justify-center' : 'items-center justify-between'} mb-4`}>
          {!collapsed ? (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-blue-600">{userInitials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-white truncate">{user?.email}</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>
            </div>
          ) : (
            <HoverCard openDelay={300} closeDelay={100}>
              <HoverCardTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarFallback className="bg-blue-600">{userInitials}</AvatarFallback>
                </Avatar>
              </HoverCardTrigger>
              <HoverCardContent side="right" className="bg-gray-800 text-white border-gray-700">
                <div className="flex flex-col space-y-1">
                  <h4 className="font-semibold">Account</h4>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
              </HoverCardContent>
            </HoverCard>
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
