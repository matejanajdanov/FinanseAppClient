import React, { useState } from "react";

import { AppButton, AppWrapper, AppInput, AppSmallError } from "components";
import { useUpdateProfileMutation } from "../../generated/generate";

interface UpdateProfileState {
  firstName: string;
  lastName: string;
  salary: string;
  timeLeftToNextSalary: string;
  saving: string;
  bills: string;
  errors: string;
}

const updateProfile = () => {
  const [credentials, setCredentials] = useState<UpdateProfileState>({
    firstName: "",
    lastName: "",
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
      credentials.timeLeftToNextSalary.length < 1 &&
      credentials.firstName.length < 1 &&
      credentials.lastName.length < 1
    ) {
      return setCredentials({ ...credentials, errors: "Nothing to update." });
    }
    const { data } = await updateProfile({
      variables: {
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        bills: parseFloat(credentials.bills),
        salary: parseFloat(credentials.salary),
        saving: parseFloat(credentials.saving),
        timeLeftToNextSalary: credentials.timeLeftToNextSalary,
      },
    });
  };
  return (
    <AppWrapper className="wrapper-sm">
      <div className="auth-container mt-3">
        <form onSubmit={onFormSubmit}>
          <AppInput
            placeholder="First name:"
            label={{ text: "First name" }}
            id="create_profile_first_name"
            name="firstName"
            type="text"
            handleInput={handleCredentials}
            value={credentials.firstName}
          />
          <AppInput
            placeholder="Last name:"
            label={{ text: "Last name" }}
            id="create_profile_last_name"
            name="lastName"
            type="text"
            handleInput={handleCredentials}
            value={credentials.lastName}
          />
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
            text="Update profile"
            type="submit"
          />
        </form>
      </div>
    </AppWrapper>
  );
};

export default updateProfile;
