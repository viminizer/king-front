import axios from "axios";
import { serverApi } from "../../libs/config";
import {
	LoginInput,
	Member,
	MemberInput,
	MemberUpdateInput,
} from "../../libs/types/member";

class MemberService {
	private readonly path;
	constructor() {
		this.path = serverApi;
	}

	public async getTopUsers(): Promise<Member[]> {
		try {
			const url = `${this.path}/member/top-users`;
			const result = await axios.get(url);

			return result.data;
		} catch (err) {
			console.log("ERROR: getTopUsers:", err);
			throw err;
		}
	}

	public async getRestaurant(): Promise<Member> {
		try {
			const url = `${this.path}/member/restaurant`;
			const result = await axios.get(url);
			return result.data;
		} catch (err) {
			console.log("ERROR: getRestaurant:", err);
			throw err;
		}
	}

	public async updateMember(input: MemberUpdateInput): Promise<Member> {
		try {
			const formData = new FormData();
			formData.append("memberNick", input.memberNick || "");
			formData.append("memberPhone", input.memberPhone || "");
			formData.append("memberAddress", input.memberAddress || "");
			formData.append("memberDesc", input.memberDesc || "");
			formData.append("memberImage", input.memberImage || "");

			const result = await axios(`${serverApi}/member/update`, {
				method: "POST",
				data: formData,
				withCredentials: true,
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			const member: Member = result.data;
			console.log("Update Member", member);
			localStorage.setItem("memberData", JSON.stringify(member));
			return member;
		} catch (err) {
			console.log("ERROR: updateMember:", err);
			throw err;
		}
	}
	public async signup(input: MemberInput): Promise<Member> {
		try {
			const url = `${this.path}/member/signup`;
			const result = await axios.post(url, input, { withCredentials: true });
			const member: Member = result.data.member;
			localStorage.setItem("memberData", JSON.stringify(member));
			return member;
		} catch (err) {
			console.log("ERROR: signup:", err);
			throw err;
		}
	}

	public async login(input: LoginInput): Promise<Member> {
		try {
			const url = `${this.path}/member/login`;
			const result = await axios.post(url, input, { withCredentials: true });
			const member: Member = result.data.member;
			localStorage.setItem("memberData", JSON.stringify(member));
			return member;
		} catch (err) {
			console.log("ERROR: login:", err);
			throw err;
		}
	}

	public async logout(): Promise<void> {
		try {
			const url = `${this.path}/member/logout`;
			await axios.post(url, {}, { withCredentials: true });
			localStorage.removeItem("memberData");
		} catch (err) {
			console.log("ERROR: logout:", err);
			throw err;
		}
	}
}

export default MemberService;
