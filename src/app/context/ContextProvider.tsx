import Cookies from "universal-cookie";
import { ReactNode, useState } from "react";
import { Member } from "../../libs/types/member";
import { GlobalContext } from "../hooks/useGlobals";

const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const cookies = new Cookies();
	if (!cookies.get("accessToken")) localStorage.removeItem("memberData");
	const [authMember, setAuthMember] = useState<Member | null>(
		localStorage.getItem("memberData")
			? JSON.parse(localStorage.getItem("memberData") as string)
			: null
	);

	const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
	const [activeTab, setActiveTab] = useState<string>("");

	return (
		<GlobalContext.Provider
			value={{
				authMember,
				setAuthMember,
				orderBuilder,
				setOrderBuilder,
				activeTab,
				setActiveTab,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default ContextProvider;
