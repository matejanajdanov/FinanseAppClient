import React, { useState } from 'react';
import {
  useCreateExpenseMutation,
  useCurrentUserQuery,
} from 'generated/generate';

import { checkIfEmpty } from 'hooks/validation';
import {
  AppSmallError,
  AppFormCard,
  AppWrapper,
  AppButton,
  AppSelect,
  AppInput,
} from 'components';

interface AddExpenseState {
  moneySpent: string;
  errors: string;
  date: string;
  note: string;
}

const CreateExpense = () => {
  const { data } = useCurrentUserQuery();

  const [credentials, setCredentials] = useState<AddExpenseState>({
    moneySpent: '',
    note: '',
    errors: '',
    date: '',
  });
  const [createExpense] = useCreateExpenseMutation();

  const handleCredentials = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>
  ) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const renderCategories = () => {
    if (
      data?.currentUser?.category &&
      data?.currentUser?.category?.length > 0
    ) {
      const optionsArray: { text: string; key: string; value: string }[] = [];
      data.currentUser.category.forEach((category) => {
        optionsArray.push({
          key: category.id,
          text: category.categoryName,
          value: category.categoryName,
        });
      });
      return (
        <AppSelect handleInput={handleCredentials} options={optionsArray} />
      );
    } else {
      return (
        <p className='text-center text-light'>
          <i className='fas fa-info-circle mr-1'></i>
          Create category if you&apos;d like to track expenses by categories.
        </p>
      );
    }
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      checkIfEmpty([credentials.date, credentials.moneySpent, credentials.note])
    ) {
      return setCredentials({
        ...credentials,
        errors: 'Please enter all forms',
      });
    }
    const { data } = await createExpense({
      variables: {
        purpose: credentials.note,
        moneySpent: credentials.moneySpent,
        date: new Date().toString(),
      },
    });
  };

  return (
    <div className='auth-container'>
      <AppFormCard className='mb-3'>
        <form onSubmit={onFormSubmit}>
          <AppInput
            placeholder='Note:'
            id='create_profile_note'
            name='note'
            type='text'
            handleInput={handleCredentials}
            value={credentials.note}
            className='mb-3'
          />
          <AppInput
            placeholder='Money spent:'
            id='create_profile_money_spent'
            name='moneySpent'
            type='number'
            handleInput={handleCredentials}
            value={credentials.moneySpent}
            className='mb-3'
          />
          {renderCategories()}
          <AppSmallError text={credentials.errors} />
          <AppButton
            className='mt-1 secondary'
            text='Create expense'
            type='submit'
          />
        </form>
      </AppFormCard>
    </div>
  );
};

export default CreateExpense;
