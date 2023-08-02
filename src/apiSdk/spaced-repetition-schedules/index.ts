import axios from 'axios';
import queryString from 'query-string';
import {
  SpacedRepetitionScheduleInterface,
  SpacedRepetitionScheduleGetQueryInterface,
} from 'interfaces/spaced-repetition-schedule';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getSpacedRepetitionSchedules = async (
  query?: SpacedRepetitionScheduleGetQueryInterface,
): Promise<PaginatedInterface<SpacedRepetitionScheduleInterface>> => {
  const response = await axios.get('/api/spaced-repetition-schedules', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createSpacedRepetitionSchedule = async (spacedRepetitionSchedule: SpacedRepetitionScheduleInterface) => {
  const response = await axios.post('/api/spaced-repetition-schedules', spacedRepetitionSchedule);
  return response.data;
};

export const updateSpacedRepetitionScheduleById = async (
  id: string,
  spacedRepetitionSchedule: SpacedRepetitionScheduleInterface,
) => {
  const response = await axios.put(`/api/spaced-repetition-schedules/${id}`, spacedRepetitionSchedule);
  return response.data;
};

export const getSpacedRepetitionScheduleById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/spaced-repetition-schedules/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteSpacedRepetitionScheduleById = async (id: string) => {
  const response = await axios.delete(`/api/spaced-repetition-schedules/${id}`);
  return response.data;
};
