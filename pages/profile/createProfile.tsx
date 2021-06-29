import React, { useState } from "react";
import { useCreateProfileMutation } from "../../generated/generate";
import Wrapper from "../../components/utils/Wrapper";
import InputComponent from "../../components/utils/formComponents/InputComponent";
import Button from "../../components/utils/formComponents/ButtonComponent";

interface CreateProfileState {
  salary: string;
  timeLeftToNextSalary: string;
  saving: string;
  bills: string;
  errors: {
    salary: string;
    bills: string;
    saving: string;
    timeLeftToNextSalary: string;
  };
}

const createProfile = () => {
  const [credentials, setCredentials] = useState<CreateProfileState>({
    salary: "",
    bills: "",
    saving: "",
    timeLeftToNextSalary: "",
    errors: {
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
  console.log(credentials);
  const onFormSubmit = (e: React.FormEvent) => {
    let isFormValid = true;
    const stateErrors = {
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
      stateErrors.salary = "Please enter valid date!!";
      isFormValid = false;
    }
  };

  return (
    <Wrapper className="wrapper-sm">
      <div className="auth-container mt-3">
        <form onSubmit={onFormSubmit}>
          <InputComponent
            placeholder="Enter you salary here:"
            label={{ text: "Salary" }}
            id="create_profile_salary"
            name="salary"
            type="number"
            handleInput={handleCredentials}
            value={credentials.salary}
            errorText={credentials.errors.salary}
          />
          <InputComponent
            placeholder="Enter your bills here:"
            label={{ text: "Bills (optional)" }}
            id="create_profile_bills"
            type="number"
            name="bills"
            handleInput={handleCredentials}
            value={credentials.bills}
            errorText={credentials.errors.bills}
          />
          <InputComponent
            placeholder="Add your saving here:"
            label={{ text: "Total saving (optional)" }}
            id="create_profile_saving"
            type="number"
            name="saving"
            handleInput={handleCredentials}
            value={credentials.saving}
            errorText={credentials.errors.saving}
          />
          <InputComponent
            placeholder="Date to your next salary:"
            label={{ text: "Date to salary:" }}
            id="create_profile_date"
            type="date"
            name="timeLeftToNextSalary"
            handleInput={handleCredentials}
            value={credentials.timeLeftToNextSalary}
            errorText={credentials.errors.timeLeftToNextSalary}
          />
          <Button
            className="secondary mt-2"
            text="Create profile"
            type="submit"
          />
        </form>
      </div>
    </Wrapper>
  );
};

export default createProfile;
