import React, { useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  BarChart3,
  Users,
  Target,
  ShoppingCart,
  Phone,
  LogOut,
  Menu,
  X,
  User,
  Bell,
  TrendingUp
} from 'lucide-react';

// Import sales pages
import SalesDashboard from '../pages/sales/SalesDashboard';
import SalesCustomers from '../pages/sales/SalesCustomers';
import SalesTargets from '../pages/sales/SalesTargets';
import SalesOrders from '../pages/sales/SalesOrders';
import SalesActivities from '../pages/sales/SalesActivities';

interface CRMLayoutProps {}

const CRMLayout: React.FC<CRMLayoutProps> = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();

  // Navigation items based on role
  const getNavigationItems = () => {
    const baseItems = [
      {
        path: '/dashboard',
        title: 'Dashboard',
        icon: BarChart3,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100 dark:bg-blue-900'
      }
    ];

    // Add role-specific items
    if (user?.role === 'sales-representative') {
      return [
        ...baseItems,
        {
          path: '/customers',
          title: 'Müşterilerim',
          icon: Users,
          color: 'text-green-600',
          bgColor: 'bg-green-100 dark:bg-green-900'
        },
        {
          path: '/targets',
          title: 'Hedeflerim',
          icon: Target,
          color: 'text-purple-600',
          bgColor: 'bg-purple-100 dark:bg-purple-900'
        },
        {
          path: '/orders',
          title: 'Siparişlerim',
          icon: ShoppingCart,
          color: 'text-orange-600',
          bgColor: 'bg-orange-100 dark:bg-orange-900'
        },
        {
          path: '/activities',
          title: 'Aktivitelerim',
          icon: Phone,
          color: 'text-pink-600',
          bgColor: 'bg-pink-100 dark:bg-pink-900'
        }
      ];
    }

    // Add other roles here in the future
    return baseItems;
  };

  const navigationItems = getNavigationItems();

  const handleLogout = () => {
    logout();
  };

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // User will be available from AuthContext, no need for loading check here

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                CRM Portal
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {user?.name}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => {
            const isActive = isActivePath(item.path);
            
            return (
              <a
                key={item.path}
                href={item.path}
                className={`
                  flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 group
                  ${isActive 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }
                `}
              >
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-lg transition-colors
                  ${isActive ? item.bgColor : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-gray-200 dark:group-hover:bg-gray-600'}
                `}>
                  <item.icon className={`w-5 h-5 ${isActive ? item.color : 'text-gray-600 dark:text-gray-400'}`} />
                </div>
                <span className="font-medium">{item.title}</span>
              </a>
            );
          })}
        </nav>

        {/* User Profile & Logout */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full">
              <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
                {user?.role === 'sales-representative' ? 'Satış Temsilcisi' : 
                 user?.role === 'sales-manager' ? 'Satış Müdürü' : 
                 user?.role}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full mt-3 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 lg:px-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <div>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {navigationItems.find(item => isActivePath(item.path))?.title || 'CRM Portal'}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Hoş geldiniz, {user?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<SalesDashboard />} />
            <Route path="/customers" element={<SalesCustomers />} />
            <Route path="/targets" element={<SalesTargets />} />
            <Route path="/orders" element={<SalesOrders />} />
            <Route path="/activities" element={<SalesActivities />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default CRMLayout;
