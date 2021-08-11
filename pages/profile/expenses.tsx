import React, { useState } from "react";

import { useGetExpenseByMonthQuery } from "generated/generate";
import { AppAccordion, AppWrapper } from "components";
import { monthNames } from "types";
import Navbar from "sections/Navbar";

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
            return <div>{expense.date}</div>;
          })}
        </div>
      );
    } else {
      return <div>There is no expenses!</div>;
    }
  };

  return (
    <>
      <Navbar />
      <AppWrapper>
        <AppAccordion text="some text" className="">
          blabla
        </AppAccordion>
        <br />
        {renderExpenses()}
      </AppWrapper>
    </>
  );
};

export default monthlyExpenses;
