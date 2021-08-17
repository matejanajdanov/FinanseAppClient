import router from "next/router";
import React from "react";

import { AppLink, AppWrapper } from "components";
import styles from "./index.module.scss";
import {
  useCurrentUserQuery,
  CurrentUserDocument,
  useLogoutMutation,
} from "generated/generate";

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
              <AppLink
                type="small-link"
                color="light"
                href="/profile/createProfile"
              >
                Create profile
              </AppLink>
              <AppLink
                type="small-link"
                color="light"
                bgColor="bg-dark"
                href="/"
                linkClick={onLogout}
              >
                Logout
              </AppLink>
            </>
          ) : (
            <>
              <AppLink
                type="small-link"
                color="light"
                bgColor="bg-dark"
                href="/profile"
              >
                {data.currentUser.profile.firstName}'s stats
              </AppLink>
              <AppLink
                type="small-link"
                color="light"
                bgColor="bg-dark"
                href="/profile/expenses"
              >
                Expenses
              </AppLink>
              <AppLink
                type="small-link"
                color="light"
                bgColor="bg-dark"
                href="/profile/incomes"
              >
                Incomes
              </AppLink>
              <AppLink
                type="small-link"
                color="light"
                bgColor="bg-dark"
                href="/"
                linkClick={onLogout}
              >
                Logout
              </AppLink>
            </>
          )}
        </>
      );
    }
  };

  return (
    <AppWrapper width="wrapper-md">
      <nav className={styles["nav"] + " bg-primary"}>
        <div className={styles["link-wrapper"]}>{renderLoggedUserNav()}</div>
      </nav>
    </AppWrapper>
  );
};

export default Navbar;
