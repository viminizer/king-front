import Basket from "./Basket";
import ReusableButton from "../other/ResusableButton";
import {
  Box,
  Container,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { CartItem } from "../../../libs/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { serverApi, slashRemover } from "../../../libs/config";
import { Logout } from "@mui/icons-material";
import { useEffect, useState } from "react";

interface HomeNavbarProps {
  anchorEl: HTMLElement | null;
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleCloseLogout: () => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  handleLogoutRequest: () => void;
}

export function HomeNavbar(props: HomeNavbarProps) {
  const location = useLocation();
  const {
    cartItems,
    onAdd,
    onDelete,
    onDeleteAll,
    onRemove,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
    handleLogoutClick,
  } = props;

  const history = useHistory();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { authMember, activeTab, setActiveTab } = useGlobals();
  const imagePath = authMember?.memberImage
    ? `${serverApi}/${authMember?.memberImage}`
    : "icons/default-user.svg";

  useEffect(() => {
    setActiveTab(slashRemover(location.pathname));
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /**HANDLERS */
  const isActiveHandler = (str: string) => setActiveTab(str);

  const handleScroll = () => {
    if (window.scrollY > 50) setIsScrolled(true);
    else setIsScrolled(false);
  };

  const signinClickHandler = () => {
    setActiveTab("signin");
    history.push("signin");
  };

  return (
    <div className={`home-navbar ${isScrolled ? "scrolled" : ""}`}>
      <Container className="navbar-container">
        <Stack className="menu">
          <Box>
            <NavLink to="/">
              <img
                src="https://ml8lsmj0ltnv.i.optimole.com/w:200/h:145/q:mauto/f:avif/https://www.kingkebab.co.kr/wp-content/uploads/2023/03/cropped-kinglogo.png"
                className="brand-logo"
                alt="brand-logo"
              />
            </NavLink>
          </Box>
          <Stack className="links">
            {["", "Products"].map((ele) => (
              <NavLink
                className={
                  activeTab === `${ele.toLowerCase()}`
                    ? "active-link"
                    : "nav-link"
                }
                to={`/${ele.toLocaleLowerCase()}`}
                onClick={() => isActiveHandler(ele.toLocaleLowerCase())}
              >
                {ele ? ele : "Home"}
              </NavLink>
            ))}
            {authMember ? (
              <NavLink
                to="/orders"
                className={activeTab === "orders" ? "active-link" : "nav-link"}
                onClick={() => isActiveHandler("orders")}
              >
                Orders
              </NavLink>
            ) : null}
            {authMember ? (
              <NavLink
                className={
                  activeTab === "member-page" ? "active-link" : "nav-link"
                }
                to="/member-page"
                onClick={() => isActiveHandler("member-page")}
              >
                My Page
              </NavLink>
            ) : null}
            <NavLink
              to="/help"
              className={activeTab === "help" ? "active-link" : "nav-link"}
              onClick={() => isActiveHandler("help")}
            >
              Help
            </NavLink>
            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
              onRemove={onRemove}
            />
            {!authMember ? (
              <Box>
                <ReusableButton
                  className={
                    activeTab === "signin" ? "reusable-btn-active" : ""
                  }
                  width={150}
                  height={40}
                  handleClick={() => signinClickHandler()}
                >
                  Sign in
                </ReusableButton>
              </Box>
            ) : (
                <img
                  style={{ cursor: "pointer" }}
                  className="user-avatar"
                  src={imagePath}
                  aria-haspopup={"true"}
                  alt="profile-img"
                  onClick={handleLogoutClick}
                />
              )}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              id="account-menu"
              onClose={handleCloseLogout}
              onClick={handleCloseLogout}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogoutRequest}>
                <ListItemIcon>
                  <Logout fontSize="small" style={{ color: "blue" }} />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
      </Container>
    </div>
  );
}
