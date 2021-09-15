import React, { useState } from 'react';
import {
  CurrentUserDocument,
  CurrentUserQuery,
  useCreateCategoryMutation,
} from 'generated/generate';

import { checkIfEmpty } from 'hooks/validation';
import {
  AppSmallError,
  AppFormCard,
  AppWrapper,
  AppButton,
  AppInput,
} from 'components';

interface AddExpenseState {
  categoryName: string;
  errors: string;
}

const CreateCategory = () => {
  const [createCategory] = useCreateCategoryMutation();
  const [credentials, setCredentials] = useState<AddExpenseState>({
    categoryName: '',
    errors: '',
  });

  const handleCredentials = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>
  ) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIfEmpty([credentials.categoryName])) {
      return setCredentials({
        ...credentials,
        errors: 'Please enter category name',
      });
    }
    await createCategory({
      variables: {
        category: credentials.categoryName,
      },
      update: (cache, data) => {
        if (!data.errors) {
          const user = cache.readQuery<CurrentUserQuery>({
            query: CurrentUserDocument,
          });
          if (user?.currentUser && data.data?.createCategory.category) {
            if (user.currentUser.category)
              cache.writeQuery<CurrentUserQuery>({
                query: CurrentUserDocument,
                data: {
                  currentUser: {
                    ...user.currentUser,
                    category: [
                      ...user.currentUser.category,
                      data.data.createCategory.category,
                    ],
                  },
                },
              });
          }
        }
        if (!data.errors) {
          const user = cache.readQuery<CurrentUserQuery>({
            query: CurrentUserDocument,
          });
          let newCategories = user?.currentUser?.category;
        }
      },
    });
  };

  return (
    <div className='auth-container'>
      <AppFormCard className='mb-3'>
        <form onSubmit={onFormSubmit}>
          <AppInput
            placeholder='Create category:'
            name='categoryName'
            type='text'
            handleInput={handleCredentials}
            value={credentials.categoryName}
            className='mb-1'
          />
          <AppSmallError text={credentials.errors} />
          <AppButton className='secondary' type='submit'>
            Create category
          </AppButton>
        </form>
      </AppFormCard>
    </div>
  );
};

export default CreateCategory;
