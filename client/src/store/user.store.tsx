import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetUserInfo } from "../actions/user.action";
import { type GetUserResponseType } from "../types/user";

const UserStoreContext = createContext<ReturnType<typeof useUserQuery> | null>(
  null
);

const useUserQuery = () => {
  return useQuery<GetUserResponseType | null>({
    queryKey: ["user-info"],
    queryFn: GetUserInfo,
    staleTime: 1000 * 60 * 5,
  });
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const userQuery = useUserQuery();

  return (
    <UserStoreContext.Provider value={userQuery}>
      {children}
    </UserStoreContext.Provider>
  );
};

export const useUserStore = () => {
  const context = useContext(UserStoreContext);
  if (!context)
    throw new Error("useUserStore must be used inside a <UserProvider>");
  return context;
};
