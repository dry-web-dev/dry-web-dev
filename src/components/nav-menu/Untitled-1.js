import { IconButton } from "@mui/material";
import { useMediaQuery } from '@mui/material';
// import Logo from "/favicon.svg"
import {
    AppRegistration,
    Dashboard,
    Home,
    Login,
    Logout,
    Favorite,
    Category,
    Menu as MenuIcon
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Fragment, useState } from "react";
const defaultItems = [
    { icon: <Home />, text: "HOME", link: "/" },
    { icon: <Favorite />, text: "FAVOURITE", link: "#" },
];

const dropdownItems = [
    {
        label: "Categories",
        icon: <Category />,
        items: [
            { icon: <Dashboard />, text: "Category 1", link: "#" },
            { icon: <Dashboard />, text: "Category 2", link: "#" },
            { icon: <Dashboard />, text: "Category 3", link: "#" },
            { icon: <Dashboard />, text: "Category 4", link: "#" },
        ]
    }
]

const authItem = {
    login: [
        { icon: <Logout />, text: "LOGOUT", link: "#" },
    ],
    logout: [
        { icon: <Login />, text: "LOGIN", link: "#" },
        { icon: <AppRegistration />, text: "SIGNUP", link: "/" },
    ]
}
export default function NavMenu() {
    const isSmallestScreen = useMediaQuery('(max-width: 768px)');
    const [isOpen, setIsOpen] = useState(false);
    const authCtx = useSelector((state) => state.auth);
    const toggleDrawer = (open: boolean) => () => {
        setIsOpen(open);
    };

    const Logo = (
        <a href="/" className=" mb-7 bg-green-200 px-1 max-w-20 h-full flex justify-center items-center">
            <img
                src="/favicon.svg"
                alt="Placeholder"
                width={10}
                height={10}
            />
        </a>
    )
    const toggleButton = (
        <div className="flex md:hidden">
            <IconButton onClick={toggleDrawer(true)}>
                <MenuIcon sx={{ color: "white" }} fontSize="large" />
            </IconButton>
        </div>
    )
    const NavLinks = (
        <div className="hidden md:flex gap-4 items-center justify-center">
            {defaultItems.map((d, i) => <NavLink key={i} text={d.text} link={d.link} />)}
            {dropdownItems.map((d, i) => <NavDrop key={i} label={d.label} items={d.items} forceClose={isSmallestScreen} />)}
            {(authCtx.isLoggedIn ? authItem.login : authItem.logout).map((d, i) => <NavLink key={i} text={d.text} link={d.link} />)}
        </div>
    )
    return (
        <Fragment>
            <div className="p-2 bg-gradient-to-r from-white to-primary text-white h-[80px] flex justify-between items-center overflow-hidden">
                {Logo}
                {NavLinks}
                {toggleButton}
            </div>
            {/* <SidePanel
                open={!isSmallestScreen ? false : isOpen}
                authCtx={authCtx}
                authItem={authItem}
                defaultItems={defaultItems}
                dropdownItems={dropdownItems}
                toggleDrawer={toggleDrawer}
            /> */}
        </Fragment>
    );
}

// function NavLink({ text, link }) {
//     return (
//         <Link
//             className={`hover:underline`}
//             href={link}
//         >
//             {text}
//         </Link>
//     )
// }

