import { ReadingHistoryInterface } from 'interfaces/reading-history';
import { GetQueryInterface } from 'interfaces';

export interface BookInterface {
  id?: string;
  title: string;
  author: string;
  created_at?: any;
  updated_at?: any;
  reading_history?: ReadingHistoryInterface[];

  _count?: {
    reading_history?: number;
  };
}

export interface BookGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  author?: string;
}
