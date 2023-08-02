import { UserInterface } from 'interfaces/user';
import { ContentInterface } from 'interfaces/content';
import { GetQueryInterface } from 'interfaces';

export interface SpacedRepetitionScheduleInterface {
  id?: string;
  user_id?: string;
  content_id?: string;
  next_date: any;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  content?: ContentInterface;
  _count?: {};
}

export interface SpacedRepetitionScheduleGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  content_id?: string;
}
