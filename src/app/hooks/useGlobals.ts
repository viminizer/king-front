import { createContext, useContext } from "react";
import { Member } from "../../libs/types/member";

export interface GlobalInteface {
  authMember: Member | null;
  setAuthMember: (member: Member | null) => void;
  orderBuilder: Date;
  setOrderBuilder: (input: Date) => void;
  activeTab: string;
  setActiveTab: (input: string) => void;
}

export const GlobalContext = createContext<GlobalInteface | undefined>(
  undefined,
);

export const useGlobals = () => {
  const context = useContext(GlobalContext);
  if (!context) throw Error("useGlobals within Provider");
  return context;
};
