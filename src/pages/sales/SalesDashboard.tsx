import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  Target, 
  ShoppingCart, 
  Phone,
  DollarSign,
  Calendar,
  Award,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Eye
} from 'lucide-react';

interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  assignedCustomers: number;
  activeTargets: number;
  completedTargets: number;
  thisMonthCalls: number;
  thisMonthRevenue: number;
  thisMonthOrders: number;
}

interface Target {
  _id: string;
  title: string;
  targetType: string;
  targetValue: number;
  currentValue: number;
  progressPercentage: number;
  endDate: string;
  status: string;
  priority: string;
}

const SalesDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats>({
    totalRevenue: 0,
    totalOrders: 0,
    assignedCustomers: 0,
    activeTargets: 0,
    completedTargets: 0,
    thisMonthCalls: 0,
    thisMonthRevenue: 0,
    thisMonthOrders: 0
  });
  const [targets, setTargets] = useState<Target[]>([]);
  const [user, setUser] = useState<any>(null);

  // Get user info
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // This will be implemented when we have the API endpoints
      // For now, we'll use mock data
      
      // Mock stats
      setStats({
        totalRevenue: 125000,
        totalOrders: 45,
        assignedCustomers: 23,
        activeTargets: 3,
        completedTargets: 7,
        thisMonthCalls: 89,
        thisMonthRevenue: 35000,
        thisMonthOrders: 12
      });

      // Mock targets
      setTargets([
        {
          _id: '1',
          title: 'Aylık Satış Hedefi',
          targetType: 'revenue',
          targetValue: 50000,
          currentValue: 35000,
          progressPercentage: 70,
          endDate: '2024-01-31',
          status: 'active',
          priority: 'high'
        },
        {
          _id: '2',
          title: 'Yeni Müşteri Kazanımı',
          targetType: 'customers',
          targetValue: 10,
          currentValue: 7,
          progressPercentage: 70,
          endDate: '2024-01-31',
          status: 'active',
          priority: 'medium'
        },
        {
          _id: '3',
          title: 'Sipariş Sayısı',
          targetType: 'orders',
          targetValue: 20,
          currentValue: 12,
          progressPercentage: 60,
          endDate: '2024-01-31',
          status: 'active',
          priority: 'medium'
        }
      ]);
      
    } catch (error) {
      console.error('Dashboard data fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  // Get priority color
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Get progress color
  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-500';
    if (percentage >= 70) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Hoş geldin, {user?.name || 'Satış Temsilcisi'}! 👋
            </h1>
            <p className="text-blue-100">
              Bugün harika satışlar yapmanın zamanı! Hedeflerine bir adım daha yaklaş.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-right">
              <p className="text-sm text-blue-100">Bugünün Tarihi</p>
              <p className="text-lg font-semibold">
                {new Date().toLocaleDateString('tr-TR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Toplam Gelir</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(stats.totalRevenue)}
              </p>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 dark:text-green-400">+12.5%</span>
                <span className="text-gray-500 ml-1">bu ay</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Toplam Sipariş</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalOrders}
              </p>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUp className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-blue-600 dark:text-blue-400">+8</span>
                <span className="text-gray-500 ml-1">bu ay</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        {/* Assigned Customers */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Müşterilerim</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.assignedCustomers}
              </p>
              <div className="flex items-center mt-2 text-sm">
                <ArrowUp className="w-4 h-4 text-purple-500 mr-1" />
                <span className="text-purple-600 dark:text-purple-400">+3</span>
                <span className="text-gray-500 ml-1">bu ay</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        {/* Active Targets */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Aktif Hedefler</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.activeTargets}
              </p>
              <div className="flex items-center mt-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 dark:text-green-400">{stats.completedTargets}</span>
                <span className="text-gray-500 ml-1">tamamlandı</span>
              </div>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Targets Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Targets */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Aktif Hedeflerim
            </h2>
            <a 
              href="/targets"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center space-x-1"
            >
              <span>Tümünü Gör</span>
              <Eye className="w-4 h-4" />
            </a>
          </div>

          <div className="space-y-4">
            {targets.map((target) => (
              <div key={target._id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {target.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(target.priority)}`}>
                      {target.priority === 'high' ? 'Yüksek' : target.priority === 'medium' ? 'Orta' : 'Düşük'}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {target.targetType === 'revenue' ? formatCurrency(target.currentValue) : target.currentValue}
                      <span className="text-gray-500 mx-1">/</span>
                      {target.targetType === 'revenue' ? formatCurrency(target.targetValue) : target.targetValue}
                    </p>
                    <p className="text-xs text-gray-500">
                      Bitiş: {new Date(target.endDate).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(target.progressPercentage)}`}
                    style={{ width: `${Math.min(target.progressPercentage, 100)}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    %{Math.round(target.progressPercentage)} tamamlandı
                  </span>
                  <span className="text-gray-500">
                    {target.targetType === 'revenue' ? 'Gelir' : 
                     target.targetType === 'customers' ? 'Müşteri' : 
                     target.targetType === 'orders' ? 'Sipariş' : 'Hedef'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Recent Activity */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Hızlı İşlemler
            </h2>
            
            <div className="grid grid-cols-2 gap-3">
              <a
                href="/customers"
                className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Users className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Müşterilerim</span>
              </a>

              <a
                href="/orders"
                className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ShoppingCart className="w-8 h-8 text-green-600 dark:text-green-400 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Yeni Sipariş</span>
              </a>

              <a
                href="/activities"
                className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Phone className="w-8 h-8 text-purple-600 dark:text-purple-400 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Aktivite Ekle</span>
              </a>

              <a
                href="/targets"
                className="flex flex-col items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <Target className="w-8 h-8 text-orange-600 dark:text-orange-400 mb-2" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">Hedeflerim</span>
              </a>
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Bu Ay Performansım
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg">
                    <DollarSign className="w-4 h-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Aylık Gelir</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {formatCurrency(stats.thisMonthRevenue)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <ShoppingCart className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Aylık Sipariş</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {stats.thisMonthOrders}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Yapılan Arama</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {stats.thisMonthCalls}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
