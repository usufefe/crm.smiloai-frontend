import axios, { AxiosInstance, AxiosResponse } from 'axios';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('crm_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor to handle auth errors
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('crm_token');
          localStorage.removeItem('crm_user');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic API methods
  async get<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(url);
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(url, data);
    return response.data;
  }

  async patch<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.api.patch(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(url);
    return response.data;
  }

  // Sales Team specific endpoints
  async getSalesTargets() {
    return this.get('/crm/sales-team/targets');
  }

  async getSalesPerformance() {
    return this.get('/crm/sales-team/performance');
  }

  async getAssignedCustomers() {
    return this.get('/crm/customers/assigned');
  }

  async getSalesOrders() {
    return this.get('/crm/sales-orders/my-orders');
  }

  async getSalesActivities() {
    return this.get('/crm/activities/my-activities');
  }

  // Dashboard stats
  async getDashboardStats() {
    return this.get('/crm/sales-team/dashboard-stats');
  }

  // Create new records
  async createSalesOrder(orderData: any) {
    return this.post('/crm/sales-orders', orderData);
  }

  async createActivity(activityData: any) {
    return this.post('/crm/activities', activityData);
  }

  async updateCustomer(customerId: string, customerData: any) {
    return this.put(`/crm/customers/${customerId}`, customerData);
  }

  // Update activity
  async updateActivity(activityId: string, activityData: any) {
    return this.put(`/crm/activities/${activityId}`, activityData);
  }

  // Complete activity
  async completeActivity(activityId: string, completionData: any) {
    return this.patch(`/crm/activities/${activityId}/complete`, completionData);
  }
}

export default new ApiService();
