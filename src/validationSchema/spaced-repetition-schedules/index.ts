import * as yup from 'yup';

export const spacedRepetitionScheduleValidationSchema = yup.object().shape({
  next_date: yup.date().required(),
  user_id: yup.string().nullable(),
  content_id: yup.string().nullable(),
});
