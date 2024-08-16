/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  TooltipProps,
  Tooltip,
  tooltipClasses,
  // MenuItem,
  Button,
  Fade,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { NavItem } from "..";
import { useState } from "react";

const MenuDrop = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "100vw",
    border: "1px solid #dadde9",
  },
  [`&.${tooltipClasses.popper}[data-popper-placement*="bottom"] .${tooltipClasses.tooltip}`]:
    {
      marginTop: "0px",
    },
  [`&.${tooltipClasses.popper}[data-popper-placement*="top"] .${tooltipClasses.tooltip}`]:
    {
      marginBottom: "0px",
    },
  [`&.${tooltipClasses.popper}[data-popper-placement*="right"] .${tooltipClasses.tooltip}`]:
    {
      marginLeft: "0px",
    },
  [`&.${tooltipClasses.popper}[data-popper-placement*="left"] .${tooltipClasses.tooltip}`]:
    {
      marginRight: "0px",
    },
});

// const Menu = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 2;
// `;

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5;
  width: 100vw;
  flex-wrap: wrap;
`;
const defaultImg = "https://via.placeholder.com/200x150";
const NavLink: React.FC<{
  label: string;
  link?: string;
  icon: JSX.Element;
}> = ({ label, link, icon }) => {
  return (
    <Box
      onClick={() => {
        if (link) {
          window.location.href = link;
        }
      }}
      className="min-w-60 m-2"
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'pointer' }}
    >
      <img src={defaultImg} alt={label} style={{ width: '100%', height: '90%', marginBottom: '8px' }} />
      <Typography variant="body1">{label}</Typography>
    </Box>
  );
};
export const NavDrop: React.FC<{
  label: string;
  items?: NavItem[];
}> = ({ label, items }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <MenuDrop
      TransitionComponent={Fade}
      title={
        <Menu
          onMouseEnter={() => setIsActive(true)}
          onMouseLeave={() => setIsActive(false)}
        >
          {items?.map((v, i) => (
            // <MenuItem key={index}>{item.label}</MenuItem>
            <NavLink {...v} key={i} />
          ))}
        </Menu>
      }
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <Button>
        <span className={isActive ? "underline" : "hover:underline"}>
          {label}
        </span>
      </Button>
    </MenuDrop>
  );
};
