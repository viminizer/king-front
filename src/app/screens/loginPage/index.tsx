import MemberService from "../../services/MemberService";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Messages } from "../../../libs/config";
import { sweetErrorHandling } from "../../../libs/sweetAlert";
import { T } from "../../../libs/types/common";
import { LoginInput, MemberInput } from "../../../libs/types/member";
import { useGlobals } from "../../hooks/useGlobals";
import { Button } from "@mui/material";
import "../../../css/login.css";

const LoginPage = () => {
  const [signupMode, setSignupMode] = useState<string>("");
  const [memberNick, setMemberNick] = useState<string>("");
  const [memberPhone, setMemberPhone] = useState<string>("");
  const [memberPassword, setMemberPassword] = useState<string>("");
  const { setAuthMember } = useGlobals();
  const history = useHistory();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  /** HANDLERS */
  const singinHandler = () => {
    setSignupMode("");
  };

  const singupHandler = () => {
    setSignupMode("sign-up-mode");
  };

  const handleReset = () => {
    setMemberNick("");
    setMemberPhone("");
    setMemberPassword("");
  };

  const handleUsername = (e: T) => {
    setMemberNick(e.target.value);
  };

  const handlePhone = (e: T) => {
    setMemberPhone(e.target.value);
  };

  const handlePassword = (e: T) => {
    setMemberPassword(e.target.value);
  };

  const handlePasswordKeyDown = (e: T) => {
    if (e.key === "Enter" && signupMode) handleSignupRequest().then();
    else if (e.key === "Enter") handleLoginRequest().then();
  };

  const handleLoginRequest = async () => {
    console.log("LOGIN REQUEST");
    try {
      const isFulfill = memberNick !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const loginInput: LoginInput = {
        memberNick,
        memberPassword,
      };
      const member = new MemberService();
      const result = await member.login(loginInput);
      setAuthMember(result);
      history.push("/");
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  const handleSignupRequest = async () => {
    console.log("SIGNUP REQUEST");
    try {
      const isFulfill =
        memberNick !== "" && memberPhone !== "" && memberPassword !== "";
      if (!isFulfill) throw new Error(Messages.error3);

      const singupInput: MemberInput = {
        memberNick,
        memberPassword,
        memberPhone,
      };
      console.log("SIGNUP INPUT", singupInput);
      const member = new MemberService();
      const result = await member.signup(singupInput);
      setAuthMember(result);
      history.push("products");
    } catch (err) {
      console.log(err);
      sweetErrorHandling(err).then();
    }
  };

  return (
    <div className={`container ${signupMode}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                onChange={handleUsername}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
            </div>
            <Button
              sx={{ color: "#fff", fontWeight: "600" }}
              variant="contained"
              className="btn"
              onClick={handleLoginRequest}
            >
              Sign in
            </Button>
          </form>
          <form className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                onChange={handleUsername}
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="tel" placeholder="Phone" onChange={handlePhone} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                onChange={handlePassword}
                onKeyDown={handlePasswordKeyDown}
              />
            </div>
            <Button
              sx={{ color: "#fff", fontWeight: "600" }}
              variant="contained"
              className="btn"
              onClick={handleSignupRequest}
            >
              Sign up
            </Button>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New to King Kebab?</h3>
            <p>
              Discover a world of possibilities! Join us and explore a vibrant
              community where ideas flourish and connections thrive.
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={() => singupHandler()}
            >
              Sign up
            </button>
          </div>
          <img
            src="https://i.ibb.co/6HXL6q1/Privacy-policy-rafiki.png"
            className="image"
            alt=""
          />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of Our Valued Members</h3>
            <p>
              Thank you for being part of King Kebab. Your presence enriches our
              shared experiences. Let's continue this journey together!
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={() => singinHandler()}
            >
              Sign in
            </button>
          </div>
          <img
            src="https://i.ibb.co/nP8H853/Mobile-login-rafiki.png"
            className="image"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
