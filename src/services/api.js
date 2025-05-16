// src/services/api.js
const API_BASE = 'https://kai-vettio.onrender.com/api';

// src/services/api.js
export const getCalls = async (successful, page = 1, limit = 10) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `${API_BASE}/executive/${successful}?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching calls:', error);
    throw error;
  }
};
export const getSuccessfulCount = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE}/executive/trueCount`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const getUnsuccessfulCount = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE}/executive/falseCount`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const markAsRead = async (callId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE}/executive/markRead/${callId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

export const markAsFavorite = async (callId) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_BASE}/executive/markFavourite/${callId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};