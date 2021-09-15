import React, { useState } from 'react';
import {
  useGetExpenseByMonthQuery,
  GetExpenseByMonthDocument,
  useDeleteExpenseMutation,
  GetExpenseByMonthQuery,
  ExpensesByMonth,
} from 'generated/generate';

import styles from 'styles/pages/profile/expenses.module.scss';
import { CreateExpense, CreateCategory } from 'sections';
import { getCategories } from 'hooks/getCategories';
import { expenseDates } from 'pages/_app';
import { monthNames } from 'types';
import {
  AppAccordion,
  AppFormCard,
  AppWrapper,
  AppExpense,
  AppSelect,
  AppNavbar,
  AppButton,
  AppModal,
  AppInput,
} from 'components';

const expenses = () => {
  const [modifyExpense, setModifyExpense] = useState({
    moneySpent: '',
    category: '',
    note: '',
    date: '',
  });

  // Get all categories for render categorires
  const categories = getCategories();

  const handleModifyExpenses = (e: React.FormEvent<HTMLInputElement>) => {
    setModifyExpense({
      ...modifyExpense,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  const [deleteModalState, setDeleteModalState] = useState({
    isDisplayed: false,
    id: '',
  });
  const [modifyModalState, setModifyModalState] = useState({
    isDisplayed: false,
    id: '',
  });
  const [deleteExpense] = useDeleteExpenseMutation();

  const onDeleteSubmit = async (id: string) => {
    await deleteExpense({
      variables: {
        id: Number.parseInt(id),
      },
      update: (cache, data) => {
        if (data.data?.deleteExpense.isDeleted) {
          const expenses = cache.readQuery<GetExpenseByMonthQuery>({
            query: GetExpenseByMonthDocument,
            variables: expenseDates(),
          });
          const newExpenses =
            expenses &&
            expenses.getExpenseByMonth.map((expense) => {
              const filteredExepnses = expense.expenses.filter((exp) => {
                return exp.id !== id;
              });

              let mapedExpense: ExpensesByMonth;

              if (filteredExepnses.length === 0) {
                return null;
              } else {
                mapedExpense = { date: 1, expenses: [] };
                mapedExpense.date = expense.date;
                mapedExpense.expenses = filteredExepnses;
                mapedExpense.__typename = expense.__typename;
                return mapedExpense;
              }
            });
          const witouthNullExpenses =
            newExpenses &&
            newExpenses.filter((newExpense) => {
              return newExpense !== null;
            });

          cache.writeQuery<GetExpenseByMonthQuery>({
            query: GetExpenseByMonthDocument,
            variables: expenseDates(),
            data: {
              getExpenseByMonth: {
                ...(witouthNullExpenses as any),
              },
            },
          });
        }
      },
    });
  };

  const changeDeleteModalVisibility = (isDisplayed: boolean, id: string) => {
    setDeleteModalState({
      isDisplayed,
      id,
    });
  };

  const changeModifyModalVisibility = (isDisplayed: boolean, id: string) => {
    setModifyModalState({
      isDisplayed,
      id,
    });
  };

  const handleCredentials = (e: React.FormEvent<HTMLSelectElement>) => {
    setDate({
      ...date,
      [e.currentTarget.name]: parseInt(e.currentTarget.value),
    });
  };

  const { month, year } = date;

  const { data } = useGetExpenseByMonthQuery({
    variables: { month, year },
    onCompleted: () => {
      expenseDates({ year, month });
    },
  });

  const renderExpenses = () => {
    if (data?.getExpenseByMonth && data.getExpenseByMonth.length > 0) {
      return (
        <div>
          {data.getExpenseByMonth.map((expense) => {
            return (
              <AppFormCard
                className={`${styles['expenses']} ${styles['table-container']} mb-3`}
                key={expense.date}
              >
                <AppExpense
                  date={expense.date}
                  month={month}
                  expenses={expense.expenses}
                  setDeleteModalState={changeDeleteModalVisibility}
                  setModifyModalState={changeModifyModalVisibility}
                />
              </AppFormCard>
            );
          })}
        </div>
      );
    } else {
      return <div style={{ color: '#fff' }}>There is no expenses!</div>;
    }
  };

  const monthOptions: { text: string; value: string; key: string }[] =
    monthNames.map((month, index) => {
      return { key: month, value: index.toString(), text: month };
    });

  const yearsOptions: { text: string; value: string; key: string }[] = [];
  let getFullYear = new Date().getFullYear();

  for (let i = getFullYear; i >= getFullYear - 5; i--) {
    yearsOptions.push({
      key: i.toString(),
      text: i.toString(),
      value: i.toString(),
    });
  }

  // CLOSE MODALS
  const closeDeleteModal = () => {
    setDeleteModalState({ isDisplayed: false, id: '0' });
  };

  const closeModifyModal = () => {
    setModifyModalState({ isDisplayed: false, id: '0' });
  };
  return (
    <>
      <AppNavbar />
      <AppModal
        closeModal={closeDeleteModal}
        isDisplayed={deleteModalState.isDisplayed}
      >
        <p className='font-20'>Are your sure you want to delete expense?</p>
        <div className='d-flex mt-4'>
          <AppButton
            className='mr-3'
            color='danger'
            onClick={async () => {
              await onDeleteSubmit(deleteModalState.id);
              setDeleteModalState({ isDisplayed: false, id: '0' });
            }}
          >
            Yes
          </AppButton>
          <AppButton
            color='secondary'
            onClick={() => setDeleteModalState({ isDisplayed: false, id: '0' })}
          >
            No
          </AppButton>
        </div>
      </AppModal>
      <AppModal
        closeModal={closeModifyModal}
        isDisplayed={modifyModalState.isDisplayed}
      >
        <p className='mb-4 font-18'>Modify products:</p>
        <div className={styles['modify-inputs']}>
          <AppInput
            name='note'
            placeholder='Note'
            handleInput={handleModifyExpenses}
            value={modifyExpense.note}
            className='mb-2'
          />
          <AppInput
            name='moneySpent'
            placeholder='Money spent'
            handleInput={handleModifyExpenses}
            value={modifyExpense.moneySpent}
            className='mb-2'
          />
          <AppInput
            name='date'
            type='date'
            handleInput={handleModifyExpenses}
            value={modifyExpense.date}
            className='mb-2'
          />
          <AppSelect options={categories} className='mb-4' />
        </div>
        <AppButton>Modify expense</AppButton>
      </AppModal>
      <AppWrapper className='mt-5'>
        <div className={styles['accordions-container']}>
          <AppAccordion text='Create expense' buttonClass='dark'>
            <CreateExpense />
          </AppAccordion>
          <AppAccordion text='Create category'>
            <CreateCategory />
          </AppAccordion>
        </div>
        <div className={`${styles['divider']}`}></div>
        <div className='center-element mb-5'>
          <h2 className={`${styles['exp-heading']} text-light mr-3`}>
            Expenses:
          </h2>
          <div className='center-element w-100 '>
            <AppSelect
              className='w-100 mr-3'
              options={monthOptions}
              defaultValue={month}
              handleInput={handleCredentials}
              name='month'
            />
            <AppSelect
              className='w-100'
              options={yearsOptions}
              handleInput={handleCredentials}
              name='year'
            />
          </div>
        </div>
        {renderExpenses()}
      </AppWrapper>
    </>
  );
};

export default expenses;
