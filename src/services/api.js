import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // adjust this to your backend URL
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

export const boardsAPI = {
  getBoards: () => api.get('/boards'),
  createBoard: (board) => api.post('/boards', board),
  getBoard: (id) => api.get(`/boards/${id}`),
  updateBoard: (id, updates) => api.put(`/boards/${id}`, updates),
  deleteBoard: (id) => api.delete(`/boards/${id}`),
};

export const listsAPI = {
  getLists: (boardId) => api.get(`/boards/${boardId}/lists`),
  createList: (boardId, list) => api.post(`/boards/${boardId}/lists`, list),
  updateList: (listId, updates) => api.put(`/lists/${listId}`, updates),
  deleteList: (listId) => api.delete(`/lists/${listId}`),
};

export const cardsAPI = {
  getCards: (listId) => api.get(`/lists/${listId}/cards`),
  createCard: (listId, card) => api.post(`/lists/${listId}/cards`, card),
  updateCard: (cardId, updates) => api.put(`/cards/${cardId}`, updates),
  deleteCard: (cardId) => api.delete(`/cards/${cardId}`),
};

export default api; 