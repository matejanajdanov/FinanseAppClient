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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  categoryName: Scalars['String'];
};

export type CategoryResponse = {
  __typename?: 'CategoryResponse';
  category?: Maybe<Category>;
  error?: Maybe<Scalars['String']>;
};


export type ErrorFieldUser = {
  __typename?: 'ErrorFieldUser';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Expense = {
  __typename?: 'Expense';
  id: Scalars['ID'];
  purpose?: Maybe<Scalars['String']>;
  category?: Maybe<Category>;
  moneySpent: Scalars['Float'];
  date: Scalars['DateTime'];
  profile: Profile;
};

export type ExpenseDeleteResponse = {
  __typename?: 'ExpenseDeleteResponse';
  isDeleted: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type ExpenseError = {
  __typename?: 'ExpenseError';
  message: Scalars['String'];
  serrverError?: Maybe<Scalars['Boolean']>;
};

export type ExpenseOrMessage = {
  __typename?: 'ExpenseOrMessage';
  message?: Maybe<Scalars['String']>;
  expense?: Maybe<Expense>;
};

export type ExpenseResponse = {
  __typename?: 'ExpenseResponse';
  expense?: Maybe<Expense>;
  errorFields?: Maybe<Array<ExpenseError>>;
};

export type ExpensesByCategory = {
  __typename?: 'ExpensesByCategory';
  categoryName: Scalars['String'];
  totalExpense: Scalars['Float'];
};

export type ExpensesByMonth = {
  __typename?: 'ExpensesByMonth';
  date: Scalars['Float'];
  expenses: Array<Expense>;
};

export type Income = {
  __typename?: 'Income';
  id: Scalars['ID'];
  purpose?: Maybe<Scalars['String']>;
  ammountOfMoney: Scalars['Float'];
  date: Scalars['DateTime'];
};

export type IncomeResponse = {
  __typename?: 'IncomeResponse';
  message?: Maybe<Scalars['String']>;
  income?: Maybe<Income>;
};

export type MainExpensesCategories = {
  __typename?: 'MainExpensesCategories';
  category: Scalars['String'];
  totalAmount: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCategory: CategoryResponse;
  deleteCategory: Scalars['Boolean'];
  createProfile: ProfileResponse;
  updateProfile: ProfileResponse;
  createExpense: ExpenseResponse;
  deleteExpense: ExpenseDeleteResponse;
  updateExpense: ExpenseOrMessage;
  createIncome: IncomeResponse;
  deleteIncome: Scalars['Boolean'];
  register?: Maybe<UserResponse>;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationCreateCategoryArgs = {
  category: Scalars['String'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['Float'];
};


export type MutationCreateProfileArgs = {
  bills?: Maybe<Scalars['Float']>;
  saving?: Maybe<Scalars['Float']>;
  currentBalance?: Maybe<Scalars['Float']>;
  timeLeftToNextSalary: Scalars['String'];
  salary: Scalars['Float'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  bills?: Maybe<Scalars['Float']>;
  saving?: Maybe<Scalars['Float']>;
  timeLeftToNextSalary?: Maybe<Scalars['String']>;
  salary?: Maybe<Scalars['Float']>;
  lastName?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
};


export type MutationCreateExpenseArgs = {
  categoryId?: Maybe<Scalars['Float']>;
  purpose?: Maybe<Scalars['String']>;
  date: Scalars['String'];
  moneySpent: Scalars['String'];
};


export type MutationDeleteExpenseArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateExpenseArgs = {
  categoryId?: Maybe<Scalars['Float']>;
  date?: Maybe<Scalars['String']>;
  moneySpent?: Maybe<Scalars['String']>;
  purpose?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationCreateIncomeArgs = {
  date?: Maybe<Scalars['DateTime']>;
  purpose: Scalars['String'];
  ammountOfMoney: Scalars['Float'];
};


export type MutationDeleteIncomeArgs = {
  id: Scalars['Float'];
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

export type Profile = {
  __typename?: 'Profile';
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  salary: Scalars['Float'];
  timeLeftToNextSalary: Scalars['DateTime'];
  saving: Scalars['Float'];
  bills: Scalars['Float'];
};

export type ProfileError = {
  __typename?: 'ProfileError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ProfileMainExpenses = {
  __typename?: 'ProfileMainExpenses';
  categories: MainExpensesCategories;
  todayLeft: Scalars['Float'];
  monthlyLeft: Scalars['Float'];
  spentThisMonth: Scalars['Float'];
};

export type ProfileResponse = {
  __typename?: 'ProfileResponse';
  profile?: Maybe<Profile>;
  errorFeilds?: Maybe<Array<ProfileError>>;
};

export type Query = {
  __typename?: 'Query';
  getCategories: Array<Category>;
  getExpensesFromCategory: TotalExpensesFromCategories;
  getMainExpenses: ProfileMainExpenses;
  getAllExpenses: Array<Expense>;
  getOneExpense: ExpenseResponse;
  getExpenseByDate: Array<Expense>;
  getExpenseByMonth: Array<ExpensesByMonth>;
  getIncomes: Array<Income>;
  getIncomesByMonth: Array<Income>;
  users: Array<User>;
  currentUser?: Maybe<User>;
};


export type QueryGetExpensesFromCategoryArgs = {
  month: Scalars['Float'];
  year: Scalars['Float'];
};


export type QueryGetOneExpenseArgs = {
  id: Scalars['Float'];
};


export type QueryGetExpenseByDateArgs = {
  date: Scalars['String'];
};


export type QueryGetExpenseByMonthArgs = {
  month: Scalars['Float'];
  year: Scalars['Float'];
};


export type QueryGetIncomesByMonthArgs = {
  month: Scalars['Float'];
  year: Scalars['Float'];
};

export type TotalExpensesFromCategories = {
  __typename?: 'TotalExpensesFromCategories';
  expensesByCategory?: Maybe<Array<ExpensesByCategory>>;
  message?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  profile?: Maybe<Profile>;
  category?: Maybe<Array<Category>>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  errors?: Maybe<Array<ErrorFieldUser>>;
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
    & { category?: Maybe<Array<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'categoryName'>
    )>>, profile?: Maybe<(
      { __typename?: 'Profile' }
      & Pick<Profile, 'firstName' | 'lastName' | 'salary' | 'timeLeftToNextSalary' | 'saving' | 'bills'>
    )> }
  )> }
);

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
        & Pick<Profile, 'firstName' | 'lastName' | 'salary' | 'timeLeftToNextSalary' | 'saving' | 'bills'>
      )> }
    )>, errors?: Maybe<Array<(
      { __typename?: 'ErrorFieldUser' }
      & Pick<ErrorFieldUser, 'field' | 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register?: Maybe<(
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'ErrorFieldUser' }
      & Pick<ErrorFieldUser, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  )> }
);

export type CreateCategoryMutationVariables = Exact<{
  category: Scalars['String'];
}>;


export type CreateCategoryMutation = (
  { __typename?: 'Mutation' }
  & { createCategory: (
    { __typename?: 'CategoryResponse' }
    & Pick<CategoryResponse, 'error'>
    & { category?: Maybe<(
      { __typename?: 'Category' }
      & Pick<Category, 'id' | 'categoryName'>
    )> }
  ) }
);

export type CreateExpenseMutationVariables = Exact<{
  purpose: Scalars['String'];
  moneySpent: Scalars['String'];
  date: Scalars['String'];
  categoryId?: Maybe<Scalars['Float']>;
}>;


export type CreateExpenseMutation = (
  { __typename?: 'Mutation' }
  & { createExpense: (
    { __typename?: 'ExpenseResponse' }
    & { expense?: Maybe<(
      { __typename?: 'Expense' }
      & Pick<Expense, 'id' | 'purpose' | 'moneySpent' | 'date'>
      & { profile: (
        { __typename?: 'Profile' }
        & Pick<Profile, 'firstName' | 'lastName' | 'salary'>
      ) }
    )>, errorFields?: Maybe<Array<(
      { __typename?: 'ExpenseError' }
      & Pick<ExpenseError, 'message'>
    )>> }
  ) }
);

export type DeleteExpenseMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteExpenseMutation = (
  { __typename?: 'Mutation' }
  & { deleteExpense: (
    { __typename?: 'ExpenseDeleteResponse' }
    & Pick<ExpenseDeleteResponse, 'isDeleted' | 'message'>
  ) }
);

export type GetExpenseByMonthQueryVariables = Exact<{
  year: Scalars['Float'];
  month: Scalars['Float'];
}>;


export type GetExpenseByMonthQuery = (
  { __typename?: 'Query' }
  & { getExpenseByMonth: Array<(
    { __typename?: 'ExpensesByMonth' }
    & Pick<ExpensesByMonth, 'date'>
    & { expenses: Array<(
      { __typename?: 'Expense' }
      & Pick<Expense, 'id' | 'purpose' | 'moneySpent' | 'date'>
      & { profile: (
        { __typename?: 'Profile' }
        & Pick<Profile, 'firstName' | 'lastName' | 'salary' | 'timeLeftToNextSalary' | 'saving' | 'bills'>
      ), category?: Maybe<(
        { __typename?: 'Category' }
        & Pick<Category, 'id' | 'categoryName'>
      )> }
    )> }
  )> }
);

export type CreateProfileMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  salary: Scalars['Float'];
  timeLeftToNextSalary: Scalars['String'];
  saving?: Maybe<Scalars['Float']>;
  bills?: Maybe<Scalars['Float']>;
  currentBalance?: Maybe<Scalars['Float']>;
}>;


export type CreateProfileMutation = (
  { __typename?: 'Mutation' }
  & { createProfile: (
    { __typename?: 'ProfileResponse' }
    & { profile?: Maybe<(
      { __typename?: 'Profile' }
      & Pick<Profile, 'firstName' | 'lastName' | 'salary' | 'timeLeftToNextSalary' | 'saving' | 'bills'>
    )>, errorFeilds?: Maybe<Array<(
      { __typename?: 'ProfileError' }
      & Pick<ProfileError, 'field' | 'message'>
    )>> }
  ) }
);

export type UpdateProfileMutationVariables = Exact<{
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  salary?: Maybe<Scalars['Float']>;
  timeLeftToNextSalary?: Maybe<Scalars['String']>;
  saving?: Maybe<Scalars['Float']>;
  bills?: Maybe<Scalars['Float']>;
}>;


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateProfile: (
    { __typename?: 'ProfileResponse' }
    & { profile?: Maybe<(
      { __typename?: 'Profile' }
      & Pick<Profile, 'firstName' | 'lastName' | 'salary' | 'timeLeftToNextSalary' | 'saving' | 'bills'>
    )>, errorFeilds?: Maybe<Array<(
      { __typename?: 'ProfileError' }
      & Pick<ProfileError, 'field' | 'message'>
    )>> }
  ) }
);


export const CurrentUserDocument = gql`
    query currentUser {
  currentUser {
    id
    username
    category {
      id
      categoryName
    }
    profile {
      firstName
      lastName
      salary
      timeLeftToNextSalary
      saving
      bills
    }
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const LoginDocument = gql`
    mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    user {
      id
      username
      profile {
        firstName
        lastName
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
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation register($username: String!, $password: String!, $confirmPassword: String!) {
  register(
    username: $username
    password: $password
    confirmPassword: $confirmPassword
  ) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation createCategory($category: String!) {
  createCategory(category: $category) {
    category {
      id
      categoryName
    }
    error
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const CreateExpenseDocument = gql`
    mutation createExpense($purpose: String!, $moneySpent: String!, $date: String!, $categoryId: Float) {
  createExpense(
    purpose: $purpose
    moneySpent: $moneySpent
    date: $date
    categoryId: $categoryId
  ) {
    expense {
      id
      purpose
      moneySpent
      date
      profile {
        firstName
        lastName
        salary
      }
    }
    errorFields {
      message
    }
  }
}
    `;
export type CreateExpenseMutationFn = Apollo.MutationFunction<CreateExpenseMutation, CreateExpenseMutationVariables>;

/**
 * __useCreateExpenseMutation__
 *
 * To run a mutation, you first call `useCreateExpenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExpenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExpenseMutation, { data, loading, error }] = useCreateExpenseMutation({
 *   variables: {
 *      purpose: // value for 'purpose'
 *      moneySpent: // value for 'moneySpent'
 *      date: // value for 'date'
 *      categoryId: // value for 'categoryId'
 *   },
 * });
 */
export function useCreateExpenseMutation(baseOptions?: Apollo.MutationHookOptions<CreateExpenseMutation, CreateExpenseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateExpenseMutation, CreateExpenseMutationVariables>(CreateExpenseDocument, options);
      }
export type CreateExpenseMutationHookResult = ReturnType<typeof useCreateExpenseMutation>;
export type CreateExpenseMutationResult = Apollo.MutationResult<CreateExpenseMutation>;
export type CreateExpenseMutationOptions = Apollo.BaseMutationOptions<CreateExpenseMutation, CreateExpenseMutationVariables>;
export const DeleteExpenseDocument = gql`
    mutation deleteExpense($id: Float!) {
  deleteExpense(id: $id) {
    isDeleted
    message
  }
}
    `;
export type DeleteExpenseMutationFn = Apollo.MutationFunction<DeleteExpenseMutation, DeleteExpenseMutationVariables>;

/**
 * __useDeleteExpenseMutation__
 *
 * To run a mutation, you first call `useDeleteExpenseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExpenseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExpenseMutation, { data, loading, error }] = useDeleteExpenseMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteExpenseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExpenseMutation, DeleteExpenseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExpenseMutation, DeleteExpenseMutationVariables>(DeleteExpenseDocument, options);
      }
export type DeleteExpenseMutationHookResult = ReturnType<typeof useDeleteExpenseMutation>;
export type DeleteExpenseMutationResult = Apollo.MutationResult<DeleteExpenseMutation>;
export type DeleteExpenseMutationOptions = Apollo.BaseMutationOptions<DeleteExpenseMutation, DeleteExpenseMutationVariables>;
export const GetExpenseByMonthDocument = gql`
    query getExpenseByMonth($year: Float!, $month: Float!) {
  getExpenseByMonth(month: $month, year: $year) {
    date
    expenses {
      id
      purpose
      moneySpent
      date
      profile {
        firstName
        lastName
        salary
        timeLeftToNextSalary
        saving
        bills
      }
      category {
        id
        categoryName
      }
    }
  }
}
    `;

/**
 * __useGetExpenseByMonthQuery__
 *
 * To run a query within a React component, call `useGetExpenseByMonthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpenseByMonthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetExpenseByMonthQuery({
 *   variables: {
 *      year: // value for 'year'
 *      month: // value for 'month'
 *   },
 * });
 */
export function useGetExpenseByMonthQuery(baseOptions: Apollo.QueryHookOptions<GetExpenseByMonthQuery, GetExpenseByMonthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetExpenseByMonthQuery, GetExpenseByMonthQueryVariables>(GetExpenseByMonthDocument, options);
      }
export function useGetExpenseByMonthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetExpenseByMonthQuery, GetExpenseByMonthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetExpenseByMonthQuery, GetExpenseByMonthQueryVariables>(GetExpenseByMonthDocument, options);
        }
export type GetExpenseByMonthQueryHookResult = ReturnType<typeof useGetExpenseByMonthQuery>;
export type GetExpenseByMonthLazyQueryHookResult = ReturnType<typeof useGetExpenseByMonthLazyQuery>;
export type GetExpenseByMonthQueryResult = Apollo.QueryResult<GetExpenseByMonthQuery, GetExpenseByMonthQueryVariables>;
export const CreateProfileDocument = gql`
    mutation createProfile($firstName: String!, $lastName: String!, $salary: Float!, $timeLeftToNextSalary: String!, $saving: Float, $bills: Float, $currentBalance: Float) {
  createProfile(
    firstName: $firstName
    lastName: $lastName
    salary: $salary
    timeLeftToNextSalary: $timeLeftToNextSalary
    saving: $saving
    bills: $bills
    currentBalance: $currentBalance
  ) {
    profile {
      firstName
      lastName
      salary
      timeLeftToNextSalary
      saving
      bills
    }
    errorFeilds {
      field
      message
    }
  }
}
    `;
export type CreateProfileMutationFn = Apollo.MutationFunction<CreateProfileMutation, CreateProfileMutationVariables>;

/**
 * __useCreateProfileMutation__
 *
 * To run a mutation, you first call `useCreateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProfileMutation, { data, loading, error }] = useCreateProfileMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      salary: // value for 'salary'
 *      timeLeftToNextSalary: // value for 'timeLeftToNextSalary'
 *      saving: // value for 'saving'
 *      bills: // value for 'bills'
 *      currentBalance: // value for 'currentBalance'
 *   },
 * });
 */
export function useCreateProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateProfileMutation, CreateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProfileMutation, CreateProfileMutationVariables>(CreateProfileDocument, options);
      }
export type CreateProfileMutationHookResult = ReturnType<typeof useCreateProfileMutation>;
export type CreateProfileMutationResult = Apollo.MutationResult<CreateProfileMutation>;
export type CreateProfileMutationOptions = Apollo.BaseMutationOptions<CreateProfileMutation, CreateProfileMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation updateProfile($firstName: String, $lastName: String, $salary: Float, $timeLeftToNextSalary: String, $saving: Float, $bills: Float) {
  updateProfile(
    firstName: $firstName
    lastName: $lastName
    salary: $salary
    timeLeftToNextSalary: $timeLeftToNextSalary
    saving: $saving
    bills: $bills
  ) {
    profile {
      firstName
      lastName
      salary
      timeLeftToNextSalary
      saving
      bills
    }
    errorFeilds {
      field
      message
    }
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      salary: // value for 'salary'
 *      timeLeftToNextSalary: // value for 'timeLeftToNextSalary'
 *      saving: // value for 'saving'
 *      bills: // value for 'bills'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;