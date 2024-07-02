import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

export const fetchEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};

export const createEvent = async (event: { title: string; description: string; date: string; status: string }) => {
  const response = await api.post('/events', event);
  return response.data;
};

export const registerForEvent = async (registration: { userId: string; eventId: string }) => {
  const response = await api.post('/registrations', registration);
  return response.data;
};

export const cancelRegistration = async (id: string) => {
  const response = await api.delete(`/registrations/${id}`);
  return response.data;
};
