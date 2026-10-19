import axios from "axios";

const API = "http://127.0.0.1:8000/api/uhi";

// ANALYZE
export const analyzeUHI = async (payload) => {
  const response = await axios.post(`${API}/analyze`, payload);
  return response.data;
};

// HISTORY
export const getUHIHistory = async () => {
  const response = await axios.get(`${API}/history`);
  return response.data;
};

// DETAIL
export const getUHIById = async (analysisId) => {
  const response = await axios.get(`${API}/${analysisId}`);
  return response.data;
};

// DELETE
export const deleteUHI = async (analysisId) => {
  const response = await axios.delete(`${API}/${analysisId}`);
  return response.data;
};