import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Building API
export const getBuildings = async () => {
  try {
    const response = await axios.get(`${API_URL}/buildings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching buildings:', error);
    throw error;
  }
};

export const getBuilding = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/buildings/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching building ${id}:`, error);
    throw error;
  }
};

export const createBuilding = async (buildingData) => {
  try {
    const response = await axios.post(`${API_URL}/buildings`, buildingData);
    return response.data;
  } catch (error) {
    console.error('Error creating building:', error);
    throw error;
  }
};

export const updateBuilding = async (id, buildingData) => {
  try {
    const response = await axios.put(`${API_URL}/buildings/${id}`, buildingData);
    return response.data;
  } catch (error) {
    console.error(`Error updating building ${id}:`, error);
    throw error;
  }
};

export const deleteBuilding = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/buildings/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting building ${id}:`, error);
    throw error;
  }
};

// Hall API
export const getHalls = async () => {
  try {
    const response = await axios.get(`${API_URL}/halls`);
    return response.data;
  } catch (error) {
    console.error('Error fetching halls:', error);
    throw error;
  }
};

export const getHallsByBuilding = async (buildingId) => {
  try {
    const response = await axios.get(`${API_URL}/halls/building/${buildingId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching halls for building ${buildingId}:`, error);
    throw error;
  }
};

export const getHall = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/halls/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching hall ${id}:`, error);
    throw error;
  }
};

export const createHall = async (hallData) => {
  try {
    const response = await axios.post(`${API_URL}/halls`, hallData);
    return response.data;
  } catch (error) {
    console.error('Error creating hall:', error);
    throw error;
  }
};

export const updateHall = async (id, hallData) => {
  try {
    const response = await axios.put(`${API_URL}/halls/${id}`, hallData);
    return response.data;
  } catch (error) {
    console.error(`Error updating hall ${id}:`, error);
    throw error;
  }
};

export const deleteHall = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/halls/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting hall ${id}:`, error);
    throw error;
  }
}; 