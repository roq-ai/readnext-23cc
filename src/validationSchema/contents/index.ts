import * as yup from 'yup';

export const contentValidationSchema = yup.object().shape({
  type: yup.string().required(),
  title: yup.string().required(),
  publisher_id: yup.string().nullable(),
});
