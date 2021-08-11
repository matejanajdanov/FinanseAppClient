import { FC } from "react";

import Wrapper from "components/layout/AppWrapper";
import { Expense as ExpenseType } from "generated/generate";
import "./index.module.scss";
interface ExpenseProps {
  month: string;
  date: number;
  expenses: ExpenseType[];
}

const Expense: FC<ExpenseProps> = ({ date, month, expenses }) => {
  const renderExpenses = () => {
    return expenses.map((expense) => {
      return (
        <div>
          <p>{expense.category}</p>
          <p>{expense.purpose}</p>
          <p>{expense.moneySpent}</p>
          <hr />
        </div>
      );
    });
  };
  console.log(date);
  return (
    <Wrapper width="wrapper-md">
      <div>
        <div>{`${month} ${date}`}</div>
        {renderExpenses()}
      </div>
    </Wrapper>
  );
};

export default Expense;
