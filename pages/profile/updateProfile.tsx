import React, { useState } from "react";

import { AppButton, AppWrapper, AppInput, AppSmallError } from "components";
import { useUpdateProfileMutation } from "../../generated/generate";

interface UpdateProfileState {
  salary: string;
  timeLeftToNextSalary: string;
  saving: string;
  bills: string;
  errors: string;
}

const updateProfile = () => {
  const [credentials, setCredentials] = useState<UpdateProfileState>({
    salary: "",
    bills: "",
    saving: "",
    timeLeftToNextSalary: "",
    errors: "",
  });

  const [updateProfile] = useUpdateProfileMutation();

  const handleCredentials = (e: React.FormEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      credentials.salary.length < 1 &&
      credentials.bills.length < 1 &&
      credentials.saving.length < 1 &&
      credentials.timeLeftToNextSalary.length < 1
    ) {
      return setCredentials({ ...credentials, errors: "Nothing to update." });
    }
  };
  return (
    <AppWrapper className="wrapper-sm">
      <div className="auth-container mt-3">
        <form onSubmit={onFormSubmit}>
          <AppInput
            placeholder="Enter you salary here:"
            label={{ text: "Salary" }}
            id="create_profile_salary"
            name="salary"
            type="number"
            handleInput={handleCredentials}
            value={credentials.salary}
          />
          <AppInput
            placeholder="Enter your bills here:"
            label={{ text: "Bills (optional)" }}
            id="create_profile_bills"
            type="number"
            name="bills"
            handleInput={handleCredentials}
            value={credentials.bills}
          />
          <AppInput
            placeholder="Add your saving here:"
            label={{ text: "Total saving (optional)" }}
            id="create_profile_saving"
            type="number"
            name="saving"
            handleInput={handleCredentials}
            value={credentials.saving}
          />
          <AppInput
            placeholder="Date to your next salary:"
            label={{ text: "Date to salary:" }}
            id="create_profile_date"
            type="date"
            name="timeLeftToNextSalary"
            handleInput={handleCredentials}
            value={credentials.timeLeftToNextSalary}
          />
          <AppSmallError text={credentials.errors} />
          <AppButton
            className="secondary mt-2"
            text="Create profile"
            type="submit"
          />
        </form>
      </div>
    </AppWrapper>
  );
};

export default updateProfile;
