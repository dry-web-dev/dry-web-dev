import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import { SwipeableDrawer } from "@mui/material";
import { NavItem } from "@/components/nav-menu";

interface Props {
  defaultItems: NavItem[];
  dropdownItems: NavItem[];
  authItems: NavItem[];
  isSmallestScreen: boolean;
  isOpen: boolean;
  toggleDrawer: (b: boolean) => () => void;
  sx: { width: number };
}

export default function SidePanel(props: Props) {
  return (
    <SwipeableDrawer
      anchor="left"
      open={props.isOpen}
      onClose={props.toggleDrawer(false)}
      onOpen={props.toggleDrawer(true)}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 2,
      }}
    >
      <Box sx={props.sx} role="presentation">
        <List>
          {props.defaultItems.map((v, i) => (
            <NavLink key={i} {...v} />
          ))}
          {props.dropdownItems.map((v, i) => (
            <ListDropdownItem key={i} {...v} />
          ))}
          {props.authItems.map((v, i) => (
            <NavLink key={i} {...v} />
          ))}
        </List>
      </Box>
    </SwipeableDrawer>
  );
}

const NavLink: React.FC<{
  label: string;
  link?: string;
  icon: JSX.Element;
}> = ({ label, link, icon }) => {
  return (
    <ListItem>
      <ListItemButton
        onClick={() => {
          if (link) {
            window.location.href = link;
          }
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
};


const ListDropdownItem: React.FC<{
  label: string;
  icon: JSX.Element;
  items?: { link?: string; icon: JSX.Element; label: string }[];
}> = ({
  label,
  icon,
  items,
}) => {
  const [dropDown, setDropdown] = React.useState(false);
  return (
    <>
      <ListItem>
        <ListItemButton onClick={() => setDropdown((d) => !d)}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={label} />
          {!dropDown ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={dropDown} timeout="auto" unmountOnExit>
        <List component="div">
          {items?.map((item, index) => (
            <ListItemButton key={index} sx={{ pl: 8 }} href={item.link || "#"}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </>
  );
}
