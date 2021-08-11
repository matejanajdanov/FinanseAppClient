import { useCurrentUserQuery } from "generated/generate";
import { useRouter } from "next/router";

export const useRedirectIfLoged = (ifUser: string, ifProfile: string) => {
  const { data } = useCurrentUserQuery();
  const router = useRouter();
  if (data?.currentUser?.profile) {
    return router.push(ifProfile);
  }
  if (data?.currentUser) {
    router.push(ifUser);
  }
};

export const useRedirectIfNotLoged = (page: string) => {
  const { data } = useCurrentUserQuery();
  const router = useRouter();
  if (!data?.currentUser) {
    router.push(page);
  }
};
