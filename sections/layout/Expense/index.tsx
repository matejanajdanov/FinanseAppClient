import { FC } from "react";

import { AppWrapper } from "components";
import { monthNames } from "types";
import "./index.module.scss";
import { Maybe, Scalars, Category, Profile } from "generated/generate";
import { ScalarTypeExtensionNode } from "graphql";

export type ExpenseType = {
  __typename?: "Expense";
  id: string;
  purpose?: Maybe<Scalars["String"]>;
  category?: Maybe<Category>;
  moneySpent: Scalars["Float"];
  date: Scalars["DateTime"];
};

interface ExpenseProps {
  expenses: Array<ExpenseType>;
  month: number;
  date: number;
}

const Expense: FC<ExpenseProps> = ({ date, month, expenses }) => {
  const renderExpenses = () => {
    return expenses.map((expense) => {
      return (
        <div>
          <p>{expense.category?.categoryName}</p>
          <p>{expense.purpose}</p>
          <p>{expense.moneySpent}</p>
          <hr />
        </div>
      );
    });
  };
  return (
    <AppWrapper width="wrapper-md">
      <div>
        <div>{`${monthNames[month]} ${date}`}</div>
        {renderExpenses()}
      </div>
    </AppWrapper>
  );
};

export default Expense;
