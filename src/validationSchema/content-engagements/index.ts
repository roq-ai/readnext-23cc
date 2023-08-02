import * as yup from 'yup';

export const contentEngagementValidationSchema = yup.object().shape({
  engagement_date: yup.date().required(),
  engagement_type: yup.string().required(),
  content_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
