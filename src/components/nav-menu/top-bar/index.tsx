import React from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import {
  Box,
  IconButton,
} from "@mui/material";
import { NavItem } from "@/components/nav-menu";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NavDrop } from "./nav-drop";
gsap.registerPlugin(ScrollTrigger);

interface Props {
  defaultItems: NavItem[];
  dropdownItems: NavItem[];
  authItems: NavItem[];
  isSmallestScreen: boolean;
  isOpen: boolean;
  toggleDrawer: (b: boolean) => () => void;
}

export default function TopBar(props: Props): React.ReactNode {
  const [isTop, setIsTop] = useState(true);
  useEffect(() => {
    const bodyScrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onToggle: ({ isActive }) => setIsTop(isActive),
      markers: {
        startColor: "green",
        endColor: "transparent",
        fontSize: "12px",
        indent: 20,
      },
    });

    return () => bodyScrollTrigger.kill();
  }, []);

  const Logo = (
    <div className="flex items-center">
      <div className="text-2xl font-bold">Logo</div>
    </div>
  );

  const toggleButton = (
    <div className="flex md:hidden">
      <IconButton onClick={props.toggleDrawer(true)}>
        <MenuIcon sx={{ color: "white" }} fontSize="large" />
      </IconButton>
    </div>
  );

  const NavLink: React.FC<{ label: string; link: string }> = ({
    label,
    link,
  }) => {
    return (
      <a className={`hover:underline flex items-center`} href={link}>
        {label}
      </a>
    );
  };

  const NavItems = (
    <div className="hidden md:flex gap-4 justify-center">
      {props.defaultItems.map((d, i) => (
        <NavLink key={i} label={d.label} link={d.link || "#"} />
      ))}
      {props.dropdownItems.map((d, i) => (
        <NavDrop
          key={i}
          label={d.label}
          items={d.items}
        />
      ))}
      {props.authItems.map((d, i) => (
        <NavLink key={i} label={d.label} link={d.link || "#"} />
      ))}
    </div>
  );

  return (
    <Box
      className={`px-5 text-white h-16 flex justify-between overflow-hidden fixed w-screen ${
        isTop ? "bg-black" : ""
      }`}
      sx={{
        zIndex: (theme) => theme.zIndex.modal + 1,
      }}
    >
      {Logo}
      {NavItems}
      {toggleButton}
    </Box>
  );
}
