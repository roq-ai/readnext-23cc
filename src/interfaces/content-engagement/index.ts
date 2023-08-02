import { ContentInterface } from 'interfaces/content';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ContentEngagementInterface {
  id?: string;
  content_id?: string;
  user_id?: string;
  engagement_date: any;
  engagement_type: string;
  created_at?: any;
  updated_at?: any;

  content?: ContentInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ContentEngagementGetQueryInterface extends GetQueryInterface {
  id?: string;
  content_id?: string;
  user_id?: string;
  engagement_type?: string;
}
