import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ErrorField = {
  __typename?: 'ErrorField';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  register?: Maybe<UserResponse>;
  login: UserResponse;
  createProfile: ProfileResponse;
  updateProfile: ProfileResponse;
};


export type MutationRegisterArgs = {
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationCreateProfileArgs = {
  bills?: Maybe<Scalars['Float']>;
  saving?: Maybe<Scalars['Float']>;
  timeLeftToNextSalary: Scalars['String'];
  salary: Scalars['Float'];
};


export type MutationUpdateProfileArgs = {
  bills?: Maybe<Scalars['Float']>;
  saving?: Maybe<Scalars['Float']>;
  timeLeftToNextSalary?: Maybe<Scalars['String']>;
  salary?: Maybe<Scalars['Float']>;
};

export type Profile = {
  __typename?: 'Profile';
  salary: Scalars['Float'];
  timeLeftToNextSalary: Scalars['String'];
  saving: Scalars['Float'];
  bills: Scalars['Float'];
};

export type ProfileResponse = {
  __typename?: 'ProfileResponse';
  profile?: Maybe<Profile>;
  errorFeilds?: Maybe<ErrorField>;
};

export type Query = {
  __typename?: 'Query';
  users: Array<User>;
  me?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  profile?: Maybe<Profile>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  errors?: Maybe<Array<FieldError>>;
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
      & { profile?: Maybe<(
        { __typename?: 'Profile' }
        & Pick<Profile, 'salary' | 'timeLeftToNextSalary' | 'saving' | 'bills'>
      )> }
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);


export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    user {
      id
      username
      profile {
        salary
        timeLeftToNextSalary
        saving
        bills
      }
    }
    errors {
      field
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;