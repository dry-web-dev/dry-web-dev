import { useMediaQuery } from '@mui/material';
import {
    AppRegistration,
    Dashboard,
    Home,
    Login,
    Logout,
    Favorite,
    Category,
} from "@mui/icons-material";
import { useState } from "react";
import TopBar from "../nav-menu/top-bar";
import { useSelector } from 'react-redux';
import SidePanel from './mobile/side-panel';

export interface NavItem {
  icon: JSX.Element;
  label: string;
  link?: string;
  items?: NavItem[];
}

const defaultItems = [
  { icon: <Home />, label: "HOME", link: "/" },
  { icon: <Favorite />, label: "FAVOURITE", link: "#" },
];

const dropdownItems = [
  {
      label: "Categories",
      icon: <Category />,
      items: [
          { icon: <Dashboard />, label: "Category 1", link: "#" },
          { icon: <Dashboard />, label: "Category 2", link: "#" },
          { icon: <Dashboard />, label: "Category 3", link: "#" },
          { icon: <Dashboard />, label: "Category 4", link: "#" },
      ]
  }
];

const authItem = {
  login: [
      { icon: <Logout />, label: "LOGOUT", link: "#" },
  ],
  logout: [
      { icon: <Login />, label: "LOGIN", link: "#" },
      { icon: <AppRegistration />, label: "SIGNUP", link: "#" },
  ]
};

export default function NavMenu(){
    const isSmallestScreen = useMediaQuery('(max-width: 768px)');
    const [isOpen, setIsOpen] = useState(false);
    const authCtx = useSelector((state) => state.auth);
    const toggleDrawer = (open: boolean) => () => {
        setIsOpen(open);
    };

  return (
    <>
      <TopBar
        defaultItems={defaultItems}
        dropdownItems={dropdownItems}
        authItems={authCtx.isLoggedIn ? authItem.login : authItem.logout}
        isSmallestScreen={isSmallestScreen}
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
      />
      <SidePanel
        defaultItems={defaultItems}
        dropdownItems={dropdownItems}
        authItems={authCtx.isLoggedIn ? authItem.login : authItem.logout}
        isSmallestScreen={isSmallestScreen}
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        sx={{ width: 280 }}
      />
  </>
  )
}