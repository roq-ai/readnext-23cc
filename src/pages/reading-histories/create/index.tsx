import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createReadingHistory } from 'apiSdk/reading-histories';
import { readingHistoryValidationSchema } from 'validationSchema/reading-histories';
import { BookInterface } from 'interfaces/book';
import { UserInterface } from 'interfaces/user';
import { getBooks } from 'apiSdk/books';
import { getUsers } from 'apiSdk/users';
import { ReadingHistoryInterface } from 'interfaces/reading-history';

function ReadingHistoryCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ReadingHistoryInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createReadingHistory(values);
      resetForm();
      router.push('/reading-histories');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ReadingHistoryInterface>({
    initialValues: {
      date_read: new Date(new Date().toDateString()),
      book_id: (router.query.book_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: readingHistoryValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Reading Histories',
              link: '/reading-histories',
            },
            {
              label: 'Create Reading History',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Reading History
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="date_read" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Date Read
            </FormLabel>
            <DatePicker
              selected={formik.values?.date_read ? new Date(formik.values?.date_read) : null}
              onChange={(value: Date) => formik.setFieldValue('date_read', value)}
            />
          </FormControl>
          <AsyncSelect<BookInterface>
            formik={formik}
            name={'book_id'}
            label={'Select Book'}
            placeholder={'Select Book'}
            fetcher={getBooks}
            labelField={'title'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/reading-histories')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'reading_history',
    operation: AccessOperationEnum.CREATE,
  }),
)(ReadingHistoryCreatePage);
