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

import { createContentEngagement } from 'apiSdk/content-engagements';
import { contentEngagementValidationSchema } from 'validationSchema/content-engagements';
import { ContentInterface } from 'interfaces/content';
import { UserInterface } from 'interfaces/user';
import { getContents } from 'apiSdk/contents';
import { getUsers } from 'apiSdk/users';
import { ContentEngagementInterface } from 'interfaces/content-engagement';

function ContentEngagementCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: ContentEngagementInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createContentEngagement(values);
      resetForm();
      router.push('/content-engagements');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<ContentEngagementInterface>({
    initialValues: {
      engagement_date: new Date(new Date().toDateString()),
      engagement_type: '',
      content_id: (router.query.content_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: contentEngagementValidationSchema,
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
              label: 'Content Engagements',
              link: '/content-engagements',
            },
            {
              label: 'Create Content Engagement',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Content Engagement
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="engagement_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Engagement Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.engagement_date ? new Date(formik.values?.engagement_date) : null}
              onChange={(value: Date) => formik.setFieldValue('engagement_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.engagement_type}
            label={'Engagement Type'}
            props={{
              name: 'engagement_type',
              placeholder: 'Engagement Type',
              value: formik.values?.engagement_type,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<ContentInterface>
            formik={formik}
            name={'content_id'}
            label={'Select Content'}
            placeholder={'Select Content'}
            fetcher={getContents}
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
              onClick={() => router.push('/content-engagements')}
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
    entity: 'content_engagement',
    operation: AccessOperationEnum.CREATE,
  }),
)(ContentEngagementCreatePage);
