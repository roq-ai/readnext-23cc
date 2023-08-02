import * as yup from 'yup';

export const readingHistoryValidationSchema = yup.object().shape({
  date_read: yup.date().required(),
  book_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
