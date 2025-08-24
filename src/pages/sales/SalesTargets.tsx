import React, { useState, useEffect } from 'react';
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  Users, 
  ShoppingCart,
  Award,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Filter
} from 'lucide-react';

interface SalesTarget {
  _id: string;
  title: string;
  description: string;
  targetType: 'revenue' | 'orders' | 'customers' | 'calls';
  targetValue: number;
  currentValue: number;
  progressPercentage: number;
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'paused' | 'failed';
  priority: 'low' | 'medium' | 'high';
  createdBy: string;
  notes?: string;
}

const SalesTargets: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [targets, setTargets] = useState<SalesTarget[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [periodFilter, setPeriodFilter] = useState<string>('all');

  // Mock data
  useEffect(() => {
    const mockTargets: SalesTarget[] = [
      {
        _id: '1',
        title: 'Ocak Ayı Satış Hedefi',
        description: 'Bu ay içerisinde 50.000 TL gelir elde etmek',
        targetType: 'revenue',
        targetValue: 50000,
        currentValue: 35000,
        progressPercentage: 70,
        period: 'monthly',
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        status: 'active',
        priority: 'high',
        createdBy: 'Satış Müdürü',
        notes: 'Yeni müşteri kazanımına odaklan'
      },
      {
        _id: '2',
        title: 'Yeni Müşteri Kazanımı',
        description: 'Bu ay 10 yeni müşteri kazanmak',
        targetType: 'customers',
        targetValue: 10,
        currentValue: 7,
        progressPercentage: 70,
        period: 'monthly',
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        status: 'active',
        priority: 'medium',
        createdBy: 'Satış Müdürü'
      },
      {
        _id: '3',
        title: 'Haftalık Sipariş Hedefi',
        description: 'Bu hafta 5 sipariş almak',
        targetType: 'orders',
        targetValue: 5,
        currentValue: 3,
        progressPercentage: 60,
        period: 'weekly',
        startDate: '2024-01-22',
        endDate: '2024-01-28',
        status: 'active',
        priority: 'medium',
        createdBy: 'Satış Müdürü'
      },
      {
        _id: '4',
        title: 'Aralık Ayı Hedefi',
        description: 'Geçen ay 40.000 TL gelir hedefi',
        targetType: 'revenue',
        targetValue: 40000,
        currentValue: 42000,
        progressPercentage: 105,
        period: 'monthly',
        startDate: '2023-12-01',
        endDate: '2023-12-31',
        status: 'completed',
        priority: 'high',
        createdBy: 'Satış Müdürü',
        notes: 'Hedef aşıldı! Tebrikler!'
      },
      {
        _id: '5',
        title: 'Günlük Arama Hedefi',
        description: 'Her gün en az 10 müşteri araması',
        targetType: 'calls',
        targetValue: 10,
        currentValue: 8,
        progressPercentage: 80,
        period: 'daily',
        startDate: '2024-01-24',
        endDate: '2024-01-24',
        status: 'active',
        priority: 'low',
        createdBy: 'Satış Müdürü'
      }
    ];

    setTimeout(() => {
      setTargets(mockTargets);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter targets
  const filteredTargets = targets.filter(target => {
    const matchesStatus = statusFilter === 'all' || target.status === statusFilter;
    const matchesPeriod = periodFilter === 'all' || target.period === periodFilter;
    return matchesStatus && matchesPeriod;
  });

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(amount);
  };

  // Get target type icon
  const getTargetTypeIcon = (type: string) => {
    switch (type) {
      case 'revenue':
        return DollarSign;
      case 'customers':
        return Users;
      case 'orders':
        return ShoppingCart;
      case 'calls':
        return Target;
      default:
        return Target;
    }
  };

  // Get target type text
  const getTargetTypeText = (type: string) => {
    switch (type) {
      case 'revenue':
        return 'Gelir';
      case 'customers':
        return 'Müşteri';
      case 'orders':
        return 'Sipariş';
      case 'calls':
        return 'Arama';
      default:
        return type;
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'completed':
        return 'Tamamlandı';
      case 'paused':
        return 'Duraklatıldı';
      case 'failed':
        return 'Başarısız';
      default:
        return status;
    }
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

  // Get priority text
  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Yüksek';
      case 'medium':
        return 'Orta';
      case 'low':
        return 'Düşük';
      default:
        return priority;
    }
  };

  // Get progress color
  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 80) return 'bg-blue-500';
    if (percentage >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Get period text
  const getPeriodText = (period: string) => {
    switch (period) {
      case 'daily':
        return 'Günlük';
      case 'weekly':
        return 'Haftalık';
      case 'monthly':
        return 'Aylık';
      case 'quarterly':
        return 'Üç Aylık';
      case 'yearly':
        return 'Yıllık';
      default:
        return period;
    }
  };

  // Calculate stats
  const stats = {
    total: targets.length,
    active: targets.filter(t => t.status === 'active').length,
    completed: targets.filter(t => t.status === 'completed').length,
    averageProgress: targets.length > 0 ? 
      Math.round(targets.reduce((sum, t) => sum + t.progressPercentage, 0) / targets.length) : 0
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Hedeflerim
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Satış hedeflerinizi takip edin ve performansınızı izleyin
          </p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Yeni Hedef</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Toplam Hedef</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Aktif Hedef</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.active}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Tamamlanan</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.completed}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Ortalama İlerleme</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">%{stats.averageProgress}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="active">Aktif</option>
                <option value="completed">Tamamlandı</option>
                <option value="paused">Duraklatıldı</option>
                <option value="failed">Başarısız</option>
              </select>
            </div>

            <select
              value={periodFilter}
              onChange={(e) => setPeriodFilter(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">Tüm Periyotlar</option>
              <option value="daily">Günlük</option>
              <option value="weekly">Haftalık</option>
              <option value="monthly">Aylık</option>
              <option value="quarterly">Üç Aylık</option>
              <option value="yearly">Yıllık</option>
            </select>
          </div>
        </div>
      </div>

      {/* Targets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTargets.map((target) => {
          const IconComponent = getTargetTypeIcon(target.targetType);
          
          return (
            <div key={target._id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {target.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {getTargetTypeText(target.targetType)} • {getPeriodText(target.period)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(target.priority)}`}>
                    {getPriorityText(target.priority)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(target.status)}`}>
                    {getStatusText(target.status)}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {target.description}
              </p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {target.targetType === 'revenue' ? formatCurrency(target.currentValue) : target.currentValue}
                    <span className="text-gray-500 mx-1">/</span>
                    {target.targetType === 'revenue' ? formatCurrency(target.targetValue) : target.targetValue}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    %{Math.round(target.progressPercentage)}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(target.progressPercentage)}`}
                    style={{ width: `${Math.min(target.progressPercentage, 100)}%` }}
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(target.startDate).toLocaleDateString('tr-TR')} - {new Date(target.endDate).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                
                {target.status === 'active' && (
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>
                      {Math.ceil((new Date(target.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} gün kaldı
                    </span>
                  </div>
                )}
              </div>

              {/* Notes */}
              {target.notes && (
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Not:</strong> {target.notes}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredTargets.length === 0 && (
        <div className="text-center py-12">
          <Target className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            Hedef bulunamadı
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Seçilen kriterlere uygun hedef bulunamadı.
          </p>
        </div>
      )}
    </div>
  );
};

export default SalesTargets;
