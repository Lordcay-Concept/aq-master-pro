import axios from 'axios';

const API_BASE = '/api';

export const adminAPI = {
  getDashboardStats: async () => {
    const { data } = await axios.get(`${API_BASE}/admin/dashboard/stats`);
    return data;
  },

  getRecentActivities: async () => {
    const { data } = await axios.get(`${API_BASE}/admin/activities/recent`);
    return data;
  },

  getQueueStatus: async () => {
    const { data } = await axios.get(`${API_BASE}/admin/queue/status`);
    return data;
  },

  getStaffPerformance: async () => {
    const { data } = await axios.get(`${API_BASE}/admin/staff/performance`);
    return data;
  },

  getPendingApprovals: async () => {
    const { data } = await axios.get(`${API_BASE}/admin/staff/pending`);
    return data;
  }
};