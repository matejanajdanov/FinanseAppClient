import React, { useState } from "react";

import { AppButton, AppWrapper, AppInput, AppSmallError } from "components";
import { useCreateExpenseMutation } from "../../generated/generate";
import { checkIfEmpty } from "hooks/validation";

interface AddExpenseState {
  purpose: string;
  moneySpent: string;
  date: string;
  errors: string;
}

const addExpense = () => {
  const [credentials, setCredentials] = useState<AddExpenseState>({
    purpose: "",
    moneySpent: "",
    date: "",
    errors: "",
  });
  const [createExpense] = useCreateExpenseMutation();

  const handleCredentials = (e: React.FormEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      checkIfEmpty([
        credentials.date,
        credentials.moneySpent,
        credentials.purpose,
      ])
    ) {
      return setCredentials({
        ...credentials,
        errors: "Please enter all forms",
      });
    }
    const { data } = await createExpense({
      variables: {
        purpose: credentials.purpose,
        moneySpent: credentials.moneySpent,
        date: new Date().toString(),
      },
    });
  };
  return (
    <AppWrapper width="wrapper-sm">
      <div className="auth-container mt-3">
        <form onSubmit={onFormSubmit}>
          <AppInput
            placeholder="Purpose:"
            label={{ text: "Purpose" }}
            id="create_profile_purpose"
            name="purpose"
            type="text"
            handleInput={handleCredentials}
            value={credentials.purpose}
          />
          <AppInput
            placeholder="Money spent:"
            label={{ text: "Money spent" }}
            id="create_profile_money_spent"
            name="moneySpent"
            type="number"
            handleInput={handleCredentials}
            value={credentials.moneySpent}
          />
          <AppSmallError text={credentials.errors} />
          <AppButton className="secondary" text="Add expense" type="submit" />
        </form>
      </div>
    </AppWrapper>
  );
};

export default addExpense;
