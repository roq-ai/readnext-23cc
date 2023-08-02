import axios from 'axios';
import queryString from 'query-string';
import { ContentEngagementInterface, ContentEngagementGetQueryInterface } from 'interfaces/content-engagement';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getContentEngagements = async (
  query?: ContentEngagementGetQueryInterface,
): Promise<PaginatedInterface<ContentEngagementInterface>> => {
  const response = await axios.get('/api/content-engagements', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createContentEngagement = async (contentEngagement: ContentEngagementInterface) => {
  const response = await axios.post('/api/content-engagements', contentEngagement);
  return response.data;
};

export const updateContentEngagementById = async (id: string, contentEngagement: ContentEngagementInterface) => {
  const response = await axios.put(`/api/content-engagements/${id}`, contentEngagement);
  return response.data;
};

export const getContentEngagementById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/content-engagements/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteContentEngagementById = async (id: string) => {
  const response = await axios.delete(`/api/content-engagements/${id}`);
  return response.data;
};
