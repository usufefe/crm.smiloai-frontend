import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  Calendar, 
  MapPin, 
  Clock, 
  Plus, 
  Search, 
  Filter,
  User,
  MessageSquare,
  Video,
  FileText,
  CheckCircle,
  AlertTriangle,
  Eye
} from 'lucide-react';

interface Activity {
  _id: string;
  type: 'call' | 'email' | 'meeting' | 'visit' | 'note' | 'task';
  title: string;
  description: string;
  customerName: string;
  customerId: string;
  status: 'completed' | 'scheduled' | 'cancelled' | 'in-progress';
  priority: 'low' | 'medium' | 'high';
  scheduledDate: string;
  completedDate?: string;
  duration?: number; // in minutes
  outcome?: string;
  notes?: string;
  createdAt: string;
}

const SalesActivities: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data
  useEffect(() => {
    const mockActivities: Activity[] = [
      {
        _id: '1',
        type: 'call',
        title: 'Ürün Tanıtım Görüşmesi',
        description: 'Yeni ürün serisini tanıtmak için arama',
        customerName: 'Ahmet Yılmaz',
        customerId: '1',
        status: 'completed',
        priority: 'high',
        scheduledDate: '2024-01-24T10:00:00Z',
        completedDate: '2024-01-24T10:15:00Z',
        duration: 15,
        outcome: 'Müşteri ürünlerle ilgilendi, teklif hazırlanacak',
        notes: 'Fiyat konusunda hassas, indirim bekliyor',
        createdAt: '2024-01-23T15:30:00Z'
      },
      {
        _id: '2',
        type: 'meeting',
        title: 'Sözleşme Görüşmesi',
        description: 'Yıllık sözleşme detaylarını görüşmek',
        customerName: 'Fatma Demir',
        customerId: '2',
        status: 'scheduled',
        priority: 'high',
        scheduledDate: '2024-01-25T14:00:00Z',
        createdAt: '2024-01-24T09:00:00Z'
      },
      {
        _id: '3',
        type: 'email',
        title: 'Teklif Gönderimi',
        description: 'Talep edilen ürünler için teklif maili',
        customerName: 'Mehmet Kaya',
        customerId: '3',
        status: 'completed',
        priority: 'medium',
        scheduledDate: '2024-01-23T16:00:00Z',
        completedDate: '2024-01-23T16:30:00Z',
        outcome: 'Teklif gönderildi, müşteri değerlendiriyor',
        createdAt: '2024-01-23T14:00:00Z'
      },
      {
        _id: '4',
        type: 'visit',
        title: 'Sahada Ziyaret',
        description: 'Müşteri lokasyonunda ürün demosu',
        customerName: 'Ayşe Özkan',
        customerId: '4',
        status: 'in-progress',
        priority: 'medium',
        scheduledDate: '2024-01-24T13:00:00Z',
        duration: 120,
        createdAt: '2024-01-22T11:00:00Z'
      },
      {
        _id: '5',
        type: 'task',
        title: 'Müşteri Dosyası Güncelleme',
        description: 'Müşteri bilgilerini güncellemek',
        customerName: 'Ali Veli',
        customerId: '5',
        status: 'scheduled',
        priority: 'low',
        scheduledDate: '2024-01-25T09:00:00Z',
        createdAt: '2024-01-24T08:00:00Z'
      },
      {
        _id: '6',
        type: 'note',
        title: 'Müşteri Geri Bildirimi',
        description: 'Satış sonrası müşteri memnuniyeti notu',
        customerName: 'Zeynep Ak',
        customerId: '6',
        status: 'completed',
        priority: 'low',
        scheduledDate: '2024-01-22T17:00:00Z',
        completedDate: '2024-01-22T17:10:00Z',
        outcome: 'Müşteri memnun, referans verebileceğini belirtti',
        createdAt: '2024-01-22T16:45:00Z'
      }
    ];

    setTimeout(() => {
      setActivities(mockActivities);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter activities
  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || activity.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Get activity type icon
  const getActivityTypeIcon = (type: string) => {
    switch (type) {
      case 'call':
        return Phone;
      case 'email':
        return Mail;
      case 'meeting':
        return Video;
      case 'visit':
        return MapPin;
      case 'note':
        return FileText;
      case 'task':
        return CheckCircle;
      default:
        return MessageSquare;
    }
  };

  // Get activity type text
  const getActivityTypeText = (type: string) => {
    switch (type) {
      case 'call':
        return 'Arama';
      case 'email':
        return 'E-posta';
      case 'meeting':
        return 'Toplantı';
      case 'visit':
        return 'Ziyaret';
      case 'note':
        return 'Not';
      case 'task':
        return 'Görev';
      default:
        return type;
    }
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Tamamlandı';
      case 'scheduled':
        return 'Planlandı';
      case 'in-progress':
        return 'Devam Ediyor';
      case 'cancelled':
        return 'İptal Edildi';
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

  // Calculate stats
  const stats = {
    total: activities.length,
    completed: activities.filter(a => a.status === 'completed').length,
    scheduled: activities.filter(a => a.status === 'scheduled').length,
    todayActivities: activities.filter(a => {
      const today = new Date().toDateString();
      const activityDate = new Date(a.scheduledDate).toDateString();
      return activityDate === today;
    }).length
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
            Aktivitelerim
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Müşteri aktivitelerinizi kaydedin ve takip edin
          </p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" />
          <span>Yeni Aktivite</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Toplam Aktivite</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Planlanmış</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.scheduled}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <Calendar className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Bugün</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.todayActivities}</p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Aktivite ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">Tüm Tipler</option>
                <option value="call">Arama</option>
                <option value="email">E-posta</option>
                <option value="meeting">Toplantı</option>
                <option value="visit">Ziyaret</option>
                <option value="note">Not</option>
                <option value="task">Görev</option>
              </select>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="completed">Tamamlandı</option>
              <option value="scheduled">Planlandı</option>
              <option value="in-progress">Devam Ediyor</option>
              <option value="cancelled">İptal Edildi</option>
            </select>
          </div>
        </div>
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        {filteredActivities.map((activity) => {
          const ActivityIcon = getActivityTypeIcon(activity.type);
          
          return (
            <div key={activity._id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex-shrink-0">
                    <ActivityIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {activity.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                        {getStatusText(activity.status)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(activity.priority)}`}>
                        {getPriorityText(activity.priority)}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {activity.description}
                    </p>

                    <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{activity.customerName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageSquare className="w-4 h-4" />
                        <span>{getActivityTypeText(activity.type)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(activity.scheduledDate).toLocaleDateString('tr-TR')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(activity.scheduledDate).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      {activity.duration && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{activity.duration} dk</span>
                        </div>
                      )}
                    </div>

                    {activity.outcome && (
                      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 mb-3">
                        <p className="text-sm text-green-800 dark:text-green-200">
                          <strong>Sonuç:</strong> {activity.outcome}
                        </p>
                      </div>
                    )}

                    {activity.notes && (
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          <strong>Notlar:</strong> {activity.notes}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
            Aktivite bulunamadı
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Arama kriterlerinize uygun aktivite bulunamadı.
          </p>
        </div>
      )}
    </div>
  );
};

export default SalesActivities;
