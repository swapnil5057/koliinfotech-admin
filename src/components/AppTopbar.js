import React from "react";
import { useDispatch } from "react-redux";
import { adminLogoutStart } from "../redux/Actions/actions";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useHistory } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";

export const AppTopbar = (props) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const history = useHistory();

    const handleChange = async (e) => {
        e.preventDefault();
        setAnchorEl(null);
        history.push("/changePass");
    };

    const handleUserLogOut = async (e) => {
        e.preventDefault();
        setAnchorEl(null);
        localStorage.clear();
        history.push("/login");
        // window.location.reload();
    };

    return (
        <div className="layout-topbar">
            <Link to="/admindashboard" className="layout-topbar-logo">
                {/* <div style={{justifyContent:"space-between"}}> */}
                <p style={{marginRight:'15px'}}><span style={{color:'blue'}}>KOLI</span> INFOTECH</p>
                {/* <img src={"assets/layout/images/app_icon.png"} alt="logo" style={{ width: '20%' }} /> */}
                {/* </div> */}
            </Link>
            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
                <li>
                    <Button className="p-link layout-topbar-button" aria-controls={open ? "fade-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick}>
                        <i className="pi pi-user" />
                        <span>Profile</span>
                    </Button>
                    <Menu
                        id="fade-menu absolute top-0 right-0"
                        MenuListProps={{
                            "aria-labelledby": "fade-button",
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={handleUserLogOut}>Logout</MenuItem>
                    </Menu>
                </li>
            </ul>
        </div>
    );
};
