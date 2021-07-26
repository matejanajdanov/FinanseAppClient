import React, { useState } from "react";

import { AppButton, AppInput, AppWrapper } from "components";
import {
  useCreateProfileMutation,
  CurrentUserDocument,
  CurrentUserQuery,
} from "../../generated/generate";

interface CreateProfileState {
  firstName: string;
  lastName: string;
  currentBalance: string;
  salary: string;
  timeLeftToNextSalary: string;
  saving: string;
  bills: string;
  errors: {
    firstName: string;
    lastName: string;
    salary: string;
    bills: string;
    saving: string;
    timeLeftToNextSalary: string;
  };
}

const createProfile = () => {
  const [credentials, setCredentials] = useState<CreateProfileState>({
    firstName: "",
    lastName: "",
    currentBalance: "",
    salary: "",
    bills: "",
    saving: "",
    timeLeftToNextSalary: "",
    errors: {
      firstName: "",
      lastName: "",
      salary: "",
      bills: "",
      saving: "",
      timeLeftToNextSalary: "",
    },
  });
  const [createProfile] = useCreateProfileMutation();

  const handleCredentials = (e: React.FormEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let isFormValid = true;
    const stateErrors = {
      firstName: "",
      lastName: "",
      salary: "",
      bills: "",
      saving: "",
      timeLeftToNextSalary: "",
    };

    if (credentials.salary.length < 2) {
      stateErrors.salary = "Please enter your salary!";
      isFormValid = false;
    }
    if (credentials.timeLeftToNextSalary.length !== 10) {
      stateErrors.timeLeftToNextSalary = "Please enter valid date!!";
      isFormValid = false;
    }
    if (!isFormValid)
      return setCredentials({ ...credentials, errors: stateErrors });

    const { data } = await createProfile({
      variables: {
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        currentBalance: parseFloat(credentials.currentBalance),
        salary: parseFloat(credentials.salary),
        timeLeftToNextSalary: credentials.timeLeftToNextSalary,
        bills: credentials.bills.length > 0 ? parseFloat(credentials.bills) : 0,
        saving:
          credentials.saving.length > 0 ? parseFloat(credentials.saving) : 0,
      },
      update: (cache, data) => {
        if (!data.errors) {
          const user = cache.readQuery<CurrentUserQuery>({
            query: CurrentUserDocument,
          });
          if (user?.currentUser)
            cache.writeQuery<CurrentUserQuery>({
              query: CurrentUserDocument,
              data: {
                currentUser: {
                  ...user.currentUser,
                  profile: data.data?.createProfile.profile,
                },
              },
            });
        }
      },
    });
    if (data?.createProfile.errorFeilds) {
      data.createProfile.errorFeilds.map((error) => {
        let field = error.field as
          | "firstName"
          | "lastName"
          | "bills"
          | "timeLeftToNextSalary"
          | "saving"
          | "salary";
        stateErrors[field] = error.message;
      });
      return setCredentials({ ...credentials, errors: stateErrors });
    }
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
            errorText={credentials.errors.salary}
          />
          <AppInput
            placeholder="Last name:"
            label={{ text: "Last name" }}
            id="create_profile_last_name"
            name="lastName"
            type="text"
            handleInput={handleCredentials}
            value={credentials.lastName}
            errorText={credentials.errors.salary}
          />
          <AppInput
            placeholder="Enter you salary here:"
            label={{ text: "Salary" }}
            id="create_profile_salary"
            name="salary"
            type="number"
            handleInput={handleCredentials}
            value={credentials.salary}
            errorText={credentials.errors.salary}
          />
          <AppInput
            placeholder="Current balance:"
            label={{ text: "Current balance (optional)" }}
            id="create_profile_salary"
            name="currentBalance"
            type="number"
            handleInput={handleCredentials}
            value={credentials.currentBalance}
            errorText={credentials.errors.salary}
          />
          <AppInput
            placeholder="Enter your bills here:"
            label={{ text: "Bills (optional)" }}
            id="create_profile_bills"
            type="number"
            name="bills"
            handleInput={handleCredentials}
            value={credentials.bills}
            errorText={credentials.errors.bills}
          />
          <AppInput
            placeholder="Add your saving here:"
            label={{ text: "Total saving (optional)" }}
            id="create_profile_saving"
            type="number"
            name="saving"
            handleInput={handleCredentials}
            value={credentials.saving}
            errorText={credentials.errors.saving}
          />
          <AppInput
            placeholder="Date to your next salary:"
            label={{ text: "Date to salary:" }}
            id="create_profile_date"
            type="date"
            name="timeLeftToNextSalary"
            handleInput={handleCredentials}
            value={credentials.timeLeftToNextSalary}
            errorText={credentials.errors.timeLeftToNextSalary}
          />
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

export default createProfile;
