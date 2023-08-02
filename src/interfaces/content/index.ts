import { ContentEngagementInterface } from 'interfaces/content-engagement';
import { SpacedRepetitionScheduleInterface } from 'interfaces/spaced-repetition-schedule';
import { PublisherInterface } from 'interfaces/publisher';
import { GetQueryInterface } from 'interfaces';

export interface ContentInterface {
  id?: string;
  type: string;
  title: string;
  publisher_id?: string;
  created_at?: any;
  updated_at?: any;
  content_engagement?: ContentEngagementInterface[];
  spaced_repetition_schedule?: SpacedRepetitionScheduleInterface[];
  publisher?: PublisherInterface;
  _count?: {
    content_engagement?: number;
    spaced_repetition_schedule?: number;
  };
}

export interface ContentGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  title?: string;
  publisher_id?: string;
}
