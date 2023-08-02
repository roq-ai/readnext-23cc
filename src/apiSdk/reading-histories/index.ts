import axios from 'axios';
import queryString from 'query-string';
import { ReadingHistoryInterface, ReadingHistoryGetQueryInterface } from 'interfaces/reading-history';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getReadingHistories = async (
  query?: ReadingHistoryGetQueryInterface,
): Promise<PaginatedInterface<ReadingHistoryInterface>> => {
  const response = await axios.get('/api/reading-histories', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createReadingHistory = async (readingHistory: ReadingHistoryInterface) => {
  const response = await axios.post('/api/reading-histories', readingHistory);
  return response.data;
};

export const updateReadingHistoryById = async (id: string, readingHistory: ReadingHistoryInterface) => {
  const response = await axios.put(`/api/reading-histories/${id}`, readingHistory);
  return response.data;
};

export const getReadingHistoryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/reading-histories/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteReadingHistoryById = async (id: string) => {
  const response = await axios.delete(`/api/reading-histories/${id}`);
  return response.data;
};
