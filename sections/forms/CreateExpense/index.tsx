import React, { useEffect, useState } from 'react';
import {
  GetExpenseByMonthDocument,
  useCreateExpenseMutation,
  GetExpenseByMonthQuery,
  useCurrentUserQuery,
} from 'generated/generate';

import { getFormattedDate } from 'hooks/utilFunctions';
import { checkIfEmpty } from 'hooks/validation';
import { expenseDates } from 'pages/_app';
import {
  AppSmallError,
  AppFormCard,
  AppButton,
  AppSelect,
  AppInput,
} from 'components';

interface AddExpenseState {
  categoryId: string;
  moneySpent: string;
  errors: string;
  date: string;
  note: string;
}

const CreateExpense = () => {
  const { data } = useCurrentUserQuery();

  const [credentials, setCredentials] = useState<AddExpenseState>({
    date: '',
    categoryId: '',
    moneySpent: '',
    errors: '',
    note: '',
  });

  const [createExpense] = useCreateExpenseMutation();

  useEffect(() => {
    setCredentials({ ...credentials, date: getFormattedDate() });
  }, []);

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
      optionsArray.push({ key: '0', text: 'None', value: '0' });
      data.currentUser.category.forEach((category) => {
        optionsArray.push({
          key: category.id,
          text: category.categoryName,
          value: category.id,
        });
      });
      return (
        <AppSelect
          handleInput={handleCredentials}
          options={optionsArray}
          name='categoryId'
        />
      );
    } else {
      return (
        <p className='text-center text-light mb-2'>
          <i className='fas fa-info-circle mr-1'></i>
          Create category if you&apos;d like to track expenses by categories.
        </p>
      );
    }
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkIfEmpty([credentials.moneySpent, credentials.note])) {
      return setCredentials({
        ...credentials,
        errors: 'Money spent field is mandatory.',
      });
    }
    // DECLARE VARIABLES FOR REQUEST
    let createExpenseVariables: {
      categoryId?: number;
      moneySpent: string;
      purpose: string;
      date: string;
    };
    credentials.categoryId.length > 0 && credentials.categoryId !== '0'
      ? (createExpenseVariables = {
          categoryId: Number.parseFloat(credentials.categoryId),
          moneySpent: credentials.moneySpent,
          purpose: credentials.note,
          date: credentials.date,
        })
      : (createExpenseVariables = {
          moneySpent: credentials.moneySpent,
          purpose: credentials.note,
          date: credentials.date,
        });
    // END VARIABLE REQUEST
    await createExpense({
      variables: createExpenseVariables,
      update: (cache, data) => {
        const expenses = cache.readQuery<GetExpenseByMonthQuery>({
          query: GetExpenseByMonthDocument,
          variables: expenseDates(),
        });

        if (data.data?.createExpense.expense && expenses?.getExpenseByMonth) {
          let newData = data.data.createExpense as any;
          cache.writeQuery<GetExpenseByMonthQuery>({
            query: GetExpenseByMonthDocument,
            variables: expenseDates(),
            data: {
              getExpenseByMonth: [data.data.createExpense.expense, newData],
            },
          });
        }
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
          <AppInput
            placeholder='Date:'
            name='date'
            type='date'
            handleInput={handleCredentials}
            value={credentials.date}
            className='mb-3'
          />
          {credentials.errors.length > 0 && (
            <AppSmallError text={credentials.errors} />
          )}
          {renderCategories()}
          <AppButton className='mt-3 secondary' type='submit'>
            Create expense
          </AppButton>
        </form>
      </AppFormCard>
    </div>
  );
};

export default CreateExpense;
