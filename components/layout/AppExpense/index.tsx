import { FC } from 'react';
import {
  ExpensesByMonth,
  useDeleteExpenseMutation,
  Category,
  Scalars,
  Maybe,
  GetExpenseByMonthDocument,
  GetExpenseByMonthQuery,
} from 'generated/generate';

import { expenseDates } from 'pages/_app';
import styles from './index.module.scss';
import { AppWrapper } from 'components';
import { monthNames } from 'types';

export type ExpenseType = {
  purpose?: Maybe<Scalars['String']>;
  moneySpent: Scalars['Float'];
  category?: Maybe<Category>;
  date: Scalars['DateTime'];
  __typename?: 'Expense';
  id: string;
};

interface ExpenseProps {
  setDeleteModalState: (isDisplayed: boolean, id: string) => void;
  setModifyModalState: (isDisplayed: boolean, id: string) => void;
  expenses: Array<ExpenseType>;
  month: number;
  date: number;
}

const Expense: FC<ExpenseProps> = ({
  date,
  month,
  expenses,
  setDeleteModalState,
  setModifyModalState,
}) => {
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

  const renderExpenses = () => {
    return expenses.map((expense) => {
      return (
        <div className={styles['expense-table']} key={expense.id}>
          <p>{expense.purpose}</p>
          <p>{expense.moneySpent}</p>
          <p>{expense.category?.categoryName}</p>
          <p>
            <button onClick={() => setModifyModalState(true, expense.id)}>
              <i className='fas fa-pen'></i>
            </button>
            <button onClick={() => setDeleteModalState(true, expense.id)}>
              <i className='fas fa-trash'></i>
            </button>
          </p>
        </div>
      );
    });
  };
  return (
    <AppWrapper width='wrapper-md'>
      <div className={styles['month']}>{`${monthNames[month]} ${date}`}</div>
      <div className={`${styles['expense-table']} ${styles['table-heading']}`}>
        <div>Note</div>
        <div>Money spent</div>
        <div>Category</div>
        <div></div>
      </div>
      {renderExpenses()}
    </AppWrapper>
  );
};

export default Expense;
