import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Button from "@mui/material/Button";
import MemberService from "../../services/MemberService";
import { Box } from "@mui/material";
import { useGlobals } from "../../hooks/useGlobals";
import { useState } from "react";
import { sweetErrorHandling, sweetTopSmallSuccessAlert } from "../../../libs/sweetAlert";
import { Messages, serverApi } from "../../../libs/config";
import { MemberUpdateInput } from "../../../libs/types/member";
import { T } from "../../../libs/types/common";

export function Settings() {
	const { authMember, setAuthMember } = useGlobals();
	const [memberImage, setMemberImage] = useState<string>(
		authMember?.memberImage
			? `${serverApi}/${authMember.memberImage}`
			: "/icons/default-user.svg"
	);
	const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>({
		memberNick: authMember?.memberNick,
		memberPhone: authMember?.memberPhone,
		memberPassword: authMember?.memberPassword,
		memberAddress: authMember?.memberAddress,
		memberDesc: authMember?.memberDesc,
		memberImage: authMember?.memberImage,
	});

	/** HANDLERS */

	const submitButtonHandler = async () => {
		try {
			if (!authMember) throw new Error(Messages.error2);
			if (
				memberUpdateInput.memberNick === "" ||
				memberUpdateInput.memberPhone === "" ||
				memberUpdateInput.memberDesc === "" ||
				memberUpdateInput.memberAddress === ""
			) {
				throw new Error(Messages.error3);
			}

			const member = new MemberService();
			const result = await member.updateMember(memberUpdateInput);
			setAuthMember(result);
			await sweetTopSmallSuccessAlert("Modified successfully", 700);
		} catch (err) {
			console.log(err);
			sweetErrorHandling(err);
		}
	};

	const memberNickHandler = (e: T) => {
		memberUpdateInput.memberNick = e.target.value;
		setMemberUpdateInput({ ...memberUpdateInput });
	};

	const memberPhoneHandler = (e: T) => {
		memberUpdateInput.memberPhone = e.target.value;
		setMemberUpdateInput({ ...memberUpdateInput });
	};

	const memberAddressHandler = (e: T) => {
		memberUpdateInput.memberAddress = e.target.value;
		setMemberUpdateInput({ ...memberUpdateInput });
	};

	const memberDescHandler = (e: T) => {
		memberUpdateInput.memberDesc = e.target.value;
		setMemberUpdateInput({ ...memberUpdateInput });
	};

	const memberImageHandler = (e: T) => {
		memberUpdateInput.memberImage = e.target.value;
		setMemberUpdateInput({ ...memberUpdateInput });
	};

	const imageViewHandler = (e: T) => {
		const file = e.target.files[0];
		const fileType = file.type,
			validateImageTypes = ["image/jpg", "image/jpeg", "image/png"];
		if (!validateImageTypes.includes(fileType)) sweetErrorHandling(Messages.error5);
		else {
			if (file) {
				memberUpdateInput.memberImage = file;
				setMemberUpdateInput({ ...memberUpdateInput });
				setMemberImage(URL.createObjectURL(file));
			}
		}
	};

	return (
		<Box className={"settings"}>
			<Box className={"member-media-frame"}>
				<img src={memberImage} className={"mb-image"} />
				<div className={"media-change-box"}>
					<span>Upload image</span>
					<p>JPG, JPEG, PNG formats only!</p>
					<div className={"up-del-box"}>
						<Button component="label" onChange={imageViewHandler}>
							<CloudDownloadIcon />
							<input type="file" hidden />
						</Button>
					</div>
				</div>
			</Box>
			<Box className={"input-frame"}>
				<div className={"long-input"}>
					<label className={"spec-label"}>Username</label>
					<input
						className={"spec-input mb-nick"}
						type="text"
						placeholder={authMember?.memberNick}
						value={memberUpdateInput.memberNick}
						name="memberNick"
						onChange={memberNickHandler}
					/>
				</div>
			</Box>
			<Box className={"input-frame"}>
				<div className={"short-input"}>
					<label className={"spec-label"}>Phone</label>
					<input
						className={"spec-input mb-phone"}
						type="text"
						placeholder={authMember?.memberPhone}
						value={memberUpdateInput.memberPhone}
						name="memberPhone"
						onChange={memberPhoneHandler}
					/>
				</div>
				<div className={"short-input"}>
					<label className={"spec-label"}>Address</label>
					<input
						className={"spec-input  mb-address"}
						type="text"
						placeholder={authMember?.memberAddress || "no address"}
						value={memberUpdateInput.memberAddress}
						name="memberAddress"
						onChange={memberAddressHandler}
					/>
				</div>
			</Box>
			<Box className={"input-frame"}>
				<div className={"long-input"}>
					<label className={"spec-label"}>Description</label>
					<textarea
						className={"spec-textarea mb-description"}
						placeholder={
							authMember?.memberDesc ? authMember.memberDesc : "no description"
						}
						value={memberUpdateInput.memberDesc}
						name="memberDesc"
						onChange={memberDescHandler}
					/>
				</div>
			</Box>
			<Box className={"save-box"}>
				<Button variant={"contained"} onClick={submitButtonHandler}>
					Save
				</Button>
			</Box>
		</Box>
	);
}
