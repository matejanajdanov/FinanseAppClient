import router from "next/router";
import Link from "next/link";
import React from "react";

import Wrapper from "components/AppWrapper";
import styles from "./Navbar.module.scss";
import {
  useCurrentUserQuery,
  useLogoutMutation,
  CurrentUserDocument,
} from "../../generated/generate";

const Navbar = () => {
  const { data } = useCurrentUserQuery();
  const [logout] = useLogoutMutation();
  const renderLoggedUserNav = () => {
    const onLogout = () => {
      logout({
        update: (cache, data) => {
          data.data?.logout &&
            cache.writeQuery({
              query: CurrentUserDocument,
              data: { currentUser: null },
            });
        },
      });
      router.push("/");
    };
    if (data?.currentUser) {
      return (
        <>
          {!data.currentUser.profile ? (
            <>
              <Link href="/profile/createProfile">Create profile</Link>
            </>
          ) : (
            <>
              <Link href="/">{data.currentUser.username}</Link>
              <Link href="/profile/updateProfile">Update profile</Link>
              <Link href="/profile/monthlyExpenses">Monthly expenses</Link>
              <Link href="/profile/addExpense">Add expense</Link>
            </>
          )}
          <button onClick={onLogout}>Logout</button>
        </>
      );
    }
    return (
      <>
        <Link href="/auth/register">Register</Link>
        <Link href="/auth/login">Login</Link>
      </>
    );
  };

  return (
    <Wrapper className="wrapper-md">
      <nav className={styles["nav"] + " bg-primary"}>
        <div className={styles["link-wrapper"]}>{renderLoggedUserNav()}</div>
      </nav>
    </Wrapper>
  );
};

export default Navbar;
