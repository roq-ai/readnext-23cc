import { BookInterface } from 'interfaces/book';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ReadingHistoryInterface {
  id?: string;
  book_id?: string;
  user_id?: string;
  date_read: any;
  created_at?: any;
  updated_at?: any;

  book?: BookInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ReadingHistoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  book_id?: string;
  user_id?: string;
}
