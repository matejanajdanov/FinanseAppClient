import React, { useState } from "react";

import { AppButton, AppFormCard, AppInput, AppWrapper } from "components";
import {
  useCreateProfileMutation,
  CurrentUserDocument,
  CurrentUserQuery,
  useCurrentUserQuery,
} from "../../generated/generate";
import router, { useRouter } from "next/router";
import Navbar from "sections/Navbar";

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
  const router = useRouter();
  const { data } = useCurrentUserQuery();

  if (data?.currentUser?.profile) {
    router.push("/");
  }

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
      timeLeftToNextSalary: "",
      firstName: "",
      lastName: "",
      salary: "",
      bills: "",
      saving: "",
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
    router.push("/");
  };

  return (
    <>
      <Navbar />
      <AppWrapper width="wrapper-sm">
        <div className="auth-container mt-10 mb-5">
          <AppFormCard>
            <h1 className="text-light text-center mb-5">Create profile</h1>
            <form onSubmit={onFormSubmit}>
              <AppInput
                placeholder="First name:"
                id="create_profile_first_name"
                name="firstName"
                type="text"
                handleInput={handleCredentials}
                value={credentials.firstName}
                errorText={credentials.errors.salary}
                className="mb-3"
              />
              <AppInput
                placeholder="Last name:"
                id="create_profile_last_name"
                name="lastName"
                type="text"
                handleInput={handleCredentials}
                value={credentials.lastName}
                errorText={credentials.errors.salary}
                className="mb-3"
              />
              <AppInput
                placeholder="Enter you salary here:"
                id="create_profile_salary"
                name="salary"
                type="number"
                handleInput={handleCredentials}
                value={credentials.salary}
                errorText={credentials.errors.salary}
                className="mb-3"
              />
              <AppInput
                placeholder="(optional) Current balance:"
                id="create_profile_salary"
                name="currentBalance"
                type="number"
                handleInput={handleCredentials}
                value={credentials.currentBalance}
                errorText={credentials.errors.salary}
                className="mb-3"
              />
              <AppInput
                placeholder="(optional) Enter your bills here:"
                id="create_profile_bills"
                type="number"
                name="bills"
                handleInput={handleCredentials}
                value={credentials.bills}
                errorText={credentials.errors.bills}
                className="mb-3"
              />
              <AppInput
                placeholder="(optional) Add your saving here:"
                id="create_profile_saving"
                type="number"
                name="saving"
                handleInput={handleCredentials}
                value={credentials.saving}
                errorText={credentials.errors.saving}
                className="mb-3"
              />
              <AppInput
                placeholder="Date to your next salary:"
                id="create_profile_date"
                type="date"
                name="timeLeftToNextSalary"
                handleInput={handleCredentials}
                value={credentials.timeLeftToNextSalary}
                errorText={credentials.errors.timeLeftToNextSalary}
                className="mb-3"
              />
              <AppButton
                className="secondary mt-2"
                text="Create profile"
                type="submit"
              />
            </form>
          </AppFormCard>
        </div>
      </AppWrapper>
    </>
  );
};

export default createProfile;
