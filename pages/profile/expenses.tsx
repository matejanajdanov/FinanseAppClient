/* eslint-disable */
import { useGetExpenseByMonthQuery } from 'generated/generate';
import React, { useState } from 'react';

import { AppAccordion, AppFormCard, AppWrapper, AppSelect } from 'components';
import { CreateExpense, Navbar, Expense, CreateCategory } from 'sections';
import styles from 'styles/pages/profile/expenses.module.scss';
import { monthNames } from 'types';

const expenses = () => {
  const [date, setDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  const handleCredentials = (e: React.FormEvent<HTMLSelectElement>) => {
    setDate({
      ...date,
      [e.currentTarget.name]: parseInt(e.currentTarget.value),
    });
  };

  const { month, year } = date;

  const { data } = useGetExpenseByMonthQuery({
    variables: { month, year },
  });

  const renderExpenses = () => {
    if (data?.getExpenseByMonth && data.getExpenseByMonth.length > 0) {
      return (
        <div>
          {data.getExpenseByMonth.map((expense) => {
            return (
              <AppFormCard className='mb-3'>
                <Expense
                  date={expense.date}
                  month={month}
                  expenses={expense.expenses}
                />
              </AppFormCard>
            );
          })}
        </div>
      );
    } else {
      return <div>There is no expenses!</div>;
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

  return (
    <>
      <Navbar />
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
