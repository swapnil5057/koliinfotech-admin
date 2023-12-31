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

    const Role = localStorage.getItem('ROLE');

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
        localStorage.removeItem('ADMIN');
        localStorage.removeItem('ROLE');
        window.location.href = "/login";
    };
    const handleReset = async (e) => {
        e.preventDefault();
        setAnchorEl(null);
        history.push("/admindashboard/ChangePassword");
    };

    return (
        <div className="layout-topbar">
            <Link to="/admindashboard" className="layout-topbar-logo">
                <p style={{ marginRight: '15px' }}><span style={{ color: '#0066b2', fontWeight: 'bold' }}>KOLI</span> INFOTECH</p>
            </Link>
            <button type="button" className="p-link  layout-menu-button layout-topbar-button" onClick={props.onToggleMenuClick}>
                <i className="pi pi-bars" />
            </button>

            <button type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={props.onMobileTopbarMenuClick}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <ul className={classNames("layout-topbar-menu lg:flex origin-top", { "layout-topbar-menu-mobile-active": props.mobileTopbarMenuActive })}>
                <li>
                    <span style={{backgroundColor:'skyBlue',padding:'10px',borderRadius:'40px'}}>
                        {Role === 'Admin' ? <span style={{ fontWeight: 'bold', color: 'green' }}>
                            {Role}
                        </span> :
                            <span style={{ fontWeight: 'bold' }}>
                                {Role}
                            </span>
                        }</span>
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
                        <MenuItem onClick={handleReset}>Change Password</MenuItem>
                    </Menu>
                </li>
            </ul>
        </div>
    );
};
