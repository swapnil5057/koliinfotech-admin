import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import { Route, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "../assets/demo/flags/flags.css";
import "../assets/demo/Demos.scss";
import "../assets/layout/layout.scss";
import "../App.scss";
import { Tooltip } from "primereact/tooltip";
import { AppTopbar } from "./AppTopbar";
import { AppFooter } from "./AppFooter";
import { AppMenu } from "./AppMenu";
import Dashboard from "./Dashboard";
import ChangePassword from "../pages/ChangePassword";
// -----------------------------------List Page--------------------------------------------------
import Users from "./menu/User";
import OurServices from "./menu/OurServices";
import OurProduct from "./menu/OurProduct";
import OurClients from "./menu/OurClients";
import OurTopBlogs from "./menu/OurTopBlogs";
import OurEmployees from "./menu/OurEmployees";
import OurOpenings from "./menu/OurOpenings";
import ContactUs from "./menu/ContactUs";
// -----------------------------------Single data page-------------------------------------------
import SinglrUsers from "../pages/SingleViews/SingleUser"
import SingleService from "../pages/SingleViews/SingleService";
import SingleProduct from "../pages/SingleViews/SingleProduct";
import SingleClient from "../pages/SingleViews/SingleClient";
import SingleBlog from "../pages/SingleViews/SingleBlog";
import SingleEmployee from "../pages/SingleViews/SingleEmployee";
import SingleOpening from "../pages/SingleViews/SingleOpening";
import SingleContact from "../pages/SingleViews/SingleContact";
import SingleAppliedForJob from "../pages/SingleViews/SingleAppliedForJob";
// -----------------------------------Add Edit page----------------------------------------------
import AddUser from "../pages/EditComponent/AddUser";
import AddEditOurServices from "../pages/EditComponent/AddEditOurService";
import AddEditOurProducts from "../pages/EditComponent/AddEditOurProducts";
import AddEditOurClients from "../pages/EditComponent/AddClient";
import AddEditOurTopBlog from "../pages/EditComponent/AddEditOurTopBlogs";
import AddEditOurEmployee from "../pages/EditComponent/AddEditOurEmployee";
import AddEditOuropenings from "../pages/EditComponent/AddEditOuropenings";
import AppliedForJob from "./menu/AppliedForJob";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
    const [layoutMode, setLayoutMode] = useState("static");
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();
    let menuClick = false;
    let mobileTopbarMenuClick = false;
    // console.log("location~~~",location)
    // const userLogin= useSelector((state)=>state?.userDetails    );
    // console.log('admin dashboard userLogin~~>',userLogin)

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    };

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === "overlay") {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }
                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            } else if (layoutMode === "static") {
                setStaticMenuInactive((prevState) => !prevState);
            }
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }
        event.preventDefault();
    };

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;
        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    };

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;
        event.preventDefault();
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };
    const isDesktop = () => {
        return window.innerWidth >= 992;
    };

    const menu = [
        { 
            label: "Dashboard",
            items: [
                {
                    label: "DASHBOARD",
                    icon: "pi pi-fw pi-home",
                    to: "/admindashboard/",
                },
            ],
        },
        {
            label: "Menu Hierarchy",
            icon: "pi pi-fw pi-search",
            items: [
                { label: "USERS INFO", icon: "pi pi-fw pi-user-edit", to: "/admindashboard/users-list" },
                { label: "OUR EMPLOYEES", icon: "pi pi-fw pi-users", to: "/admindashboard/OurEmployees-list" },
                { label: "OUR CLIENTS", icon: "pi pi-fw pi-heart", to: "/admindashboard/ourClients-list" },
                { label: "OUR SERVICES", icon: "pi pi-fw pi-id-card", to: "/admindashboard/our-services-list" },
                { label: "OUR PRODUCTS", icon: "pi pi-fw pi-inbox", to: "/admindashboard/our-products-list" },
                { label: "OUR TOP BLOGS", icon: "pi pi-fw pi-list", to: "/admindashboard/ourOurTopBlogs-list" },
                { label: "OUR OPENINGS", icon: "pi pi-fw pi-comments", to: "/admindashboard/ourOurOpenings-list" },
                { label: "APPLIED FOR JOB", icon: "pi pi-fw pi-briefcase", to: "/admindashboard/AppliedForJob-list" },
                { label: "CONTACT US PAGE", icon: "pi pi-fw pi-users", to: "/admindashboard/contactUs-list" },
                // {
                //     label: "BANNERS",
                //     icon: "pi pi-fw pi-images",
                //     items: [
                //         {
                //             label: "BANNERS", icon: "pi pi-fw pi-list", to: "/admindashboard/banners-list",
                //         },
                //         {
                //             label: "RECENT BANNERS", icon: "pi pi-fw pi-images", to: "/admindashboard/recentbanner-list"
                //         },
                //     ]
                // },
            ],
        },
    ];

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList) element.classList.remove(className);
        else element.className = element.className.replace(new RegExp("(^|\\b)" + className.split(" ").join("|") + "(\\b|$)", "gi"), " ");
    };

    const wrapperClass = classNames("layout-wrapper", {
        "layout-overlay": layoutMode === "overlay",
        "layout-static": layoutMode === "static",
        "layout-static-sidebar-inactive": staticMenuInactive && layoutMode === "static",
        "layout-overlay-sidebar-active": overlayMenuActive && layoutMode === "overlay",
        "layout-mobile-sidebar-active": mobileMenuActive,
    });

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />
            <AppTopbar onToggleMenuClick={onToggleMenuClick} mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />
            <div className="layout-sidebar pointer-events-auto" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} />
            </div>
            <div className="layout-main-container">
                <div className="layout-main">
                    <Route path="/admindashboard" exact render={() => <Dashboard location={location} />} />
                    <Route path="/admindashboard/ChangePassword" component={ChangePassword} />
                    {/* -----------------------------------List Page-------------------------------------------------- */}
                    <Route path="/admindashboard/users-list" component={Users} />
                    <Route path="/admindashboard/our-services-list" component={OurServices} />
                    <Route path="/admindashboard/our-products-list" component={OurProduct} />
                    <Route path="/admindashboard/ourClients-list" component={OurClients} />
                    <Route path="/admindashboard/ourOurTopBlogs-list" component={OurTopBlogs} />
                    <Route path="/admindashboard/OurEmployees-list" component={OurEmployees} />
                    <Route path="/admindashboard/ourOurOpenings-list" component={OurOpenings} />
                    <Route path="/admindashboard/contactUs-list" component={ContactUs} />
                    <Route path="/admindashboard/AppliedForJob-list" component={AppliedForJob} />
                    {/* -----------------------------------Single data page------------------------------------------- */}
                    <Route path="/singleusers/:id" component={SinglrUsers} />
                    <Route path="/serviceSingle/:id/" component={SingleService} />
                    <Route path="/productSingle/:id/" component={SingleProduct} />
                    <Route path="/singleClient/:id/" component={SingleClient} />
                    <Route path="/SingleBlog/:id/" component={SingleBlog} />
                    <Route path="/singleEmployee/:id/" component={SingleEmployee} />
                    <Route path="/SingleOpening/:id/" component={SingleOpening} />
                    <Route path="/SingleContact/:id/" component={SingleContact} />
                    <Route path="/SingleAppliedForJob/:id/" component={SingleAppliedForJob} />
                    {/* -----------------------------------Add page---------------------------------------------- */}
                    <Route path="/addnew-ourService" component={AddEditOurServices} />
                    <Route path="/addnew-user" component={AddUser} />
                    <Route path="/addnew-client" component={AddEditOurClients} />
                    <Route path="/addnew-our-products" component={AddEditOurProducts} />
                    <Route path="/addnew-our-blog" component={AddEditOurTopBlog} />
                    <Route path="/addnew-our-employee" component={AddEditOurEmployee} />
                    <Route path="/addnew-opening" component={AddEditOuropenings} />
                    {/* -----------------------------------Edit page---------------------------------------------- */}
                    <Route path="/update-our-servive/:id" component={AddEditOurServices} />
                    <Route path="/update-user/:id" component={AddUser} />
                    <Route path="/update-client/:id" component={AddEditOurClients} />
                    <Route path="/update-our-product/:id" component={AddEditOurProducts} />
                    <Route path="/update-our-blog/:id" component={AddEditOurTopBlog} />
                    <Route path="/update-our-employee/:id" component={AddEditOurEmployee} />
                    <Route path="/update-Opening/:id" component={AddEditOuropenings} />
                </div>
                <AppFooter />
            </div >
            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>
        </div>
    );
};

export default AdminDashboard;
