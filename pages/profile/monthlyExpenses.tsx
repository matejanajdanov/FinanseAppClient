import React, { useState } from 'react';

import { useGetExpenseByMonthQuery } from 'generated/generate';
import { AppExpense } from 'components';
import { AppWrapper } from 'components';
import { monthNames } from 'types';

const monthlyExpenses = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const { data } = useGetExpenseByMonthQuery({
    variables: { year, month },
  });
  const renderExpenses = () => {
    if (data?.getExpenseByMonth && data.getExpenseByMonth.length > 0) {
      return (
        <div>
          {data.getExpenseByMonth.map((expense) => {
            return (
              <AppExpense
                month={monthNames[month]}
                date={expense.date}
                // expenses={expense.expenses}
              />
            );
          })}
        </div>
      );
    } else {
      return <div>There is no expenses!</div>;
    }
  };

  return (
    <div>
      <AppWrapper>{renderExpenses()}</AppWrapper>
    </div>
  );
};

export default monthlyExpenses;
