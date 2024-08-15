import React, { useRef } from "react";
import { Menu as MenuIcon } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { NavItem } from "@/components/nav-menu";
import { Button, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
    gsap.to(window, {
      scrollTrigger: {
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
        }
      },
    });
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
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

  const NavItems = (
    <div className="hidden md:flex gap-4 justify-center">
      {props.defaultItems.map((d, i) => <NavLink key={i} label={d.label} link={d.link || "#"} />)}
      {props.dropdownItems.map((d, i) => <NavDrop key={i} label={d.label} items={d.items} forceClose={props.isSmallestScreen} />)}
      {props.authItems.map((d, i) => <NavLink key={i} label={d.label} link={d.link || "#"} />)}
    </div>
  );

  return (
    <div className={`px-5 text-white h-16 flex justify-between overflow-hidden fixed w-screen ${isTop ? "bg-black" : ""}`}>
      {Logo}
      {NavItems}
      {toggleButton}
    </div>
  );
}

const NavLink: React.FC<{label: string, link: string}> = ({ label, link })  =>{
    return (
        <a
            className={`hover:underline flex items-center`}
            href={link}
        >
            {label}
        </a>
    )
}


const NavDrop: React.FC<{label: string, items?: NavItem[], forceClose: boolean}> = ({label, items, forceClose}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const uniqueIdRef = useRef<string>(`nav-drop-${Math.random().toString(36).substring(7)}`);
  const intervalIdRef = useRef<number | null>(null);
  useEffect(() => handleClose(), [forceClose]);
   useEffect(() => {
    if (!anchorEl) return;

    const handleFocusOut = (e: MouseEvent) => {
      if (e.target instanceof Node && document.querySelector(`.${uniqueIdRef.current}`)?.contains(e.target)) return;
      window.removeEventListener('mouseover', handleFocusOut);
      console.log('closing');
      handleClose();
    };

    intervalIdRef.current = window.setInterval(() => {
      if (document.querySelector(`.${uniqueIdRef.current}`)) {
        window.addEventListener('mouseover', handleFocusOut);
        console.log('listening');
        if (intervalIdRef.current !== null) {
          clearInterval(intervalIdRef.current);
        }
      }
    }, 500);

    return () => {
      if (intervalIdRef.current !== null) {
        clearInterval(intervalIdRef.current);
      }
    };
  }, [anchorEl]);
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => setAnchorEl(e.currentTarget as HTMLElement);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  return (
      <div className={`flex items-center`}>
          <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              aria-owns={open ? 'simple-menu' : undefined}
              onClick={(e) => handleOpen(e)}
              onMouseEnter={(e) => handleOpen(e)}
          >
              {label}
          </Button>
          <Menu
              MenuListProps={{
                  // onMouseLeave: handleClose,
                  style: {
                    backgroundColor: 'whitesmoke'
                  }
              }}
              id="simple-menu"
              open={open}
              anchorEl={anchorEl}
              // onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              slotProps={{
                paper: {
                    style: {
                        marginTop: '-3rem', // Adjust the margin to position the menu below the top bar
                        paddingTop: '4rem', // Adjust the padding to position the menu below the top bar
                        backgroundColor: 'transparent'
                    },
                    className: `${uniqueIdRef.current} bg-transparent`
                },
            }}
          >
              {items?.map((item, index) => (
                  <MenuItem key={index} onClick={handleClose} >
                      <a href={item.link}>{item.label}</a>
                  </MenuItem>
              ))}
          </Menu>
      </div>
  );
}
