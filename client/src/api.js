import axios from 'axios';

const API_BASE = 'http://localhost:4000';

export const fetchContentByCode = (code) =>
  axios.get(`${API_BASE}/api/code/${code}`).then(res => res.data);

export const uploadContent = (formData) =>
  axios.post(`${API_BASE}/api/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });