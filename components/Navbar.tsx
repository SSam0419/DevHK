"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  Avatar,
  Spinner,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Divider,
} from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect } from "react";
import ThemeSwitch from "./ThemeSwitch";
import { RxAvatar } from "react-icons/rx";
import { MdOutlineForum } from "react-icons/md";
import { CiPen } from "react-icons/ci";
import { supabase } from "@/lib/supabase/client";
import { useUserStore } from "@/lib/states/User";
import { FaExternalLinkAlt } from "react-icons/fa";

const Navbar = () => {
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const setUserProfile = useUserStore((state) => state.setUserProfile);
  const userProfile = useUserStore((state) => state.userProfile);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      const user = await supabase.auth.getUser();
      if (user.data.user?.id) {
        setUser(user.data.user);
        const { data, error } = await supabase
          .from("user_profile")
          .select("*")
          .eq("created_by", user.data.user.id)
          .maybeSingle();

        if (data) {
          setUserProfile(data);
        } else {
          setUserProfile(null);
        }
      } else {
        setUserProfile(null);
        setUser(null);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [setUser, setUserProfile]);

  const menuItems = [
    {
      link: "/posts",
      text: (
        <div className="flex gap-2 items-center">
          <MdOutlineForum />
          Forum
        </div>
      ),
    },
    {
      link: "/profile",
      text: (
        <div className="flex gap-2 items-center">
          <RxAvatar />
          Profile
        </div>
      ),
    },
  ];

  const signOut = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setUserProfile(null);
    setIsLoading(false);
  };

  return (
    <NextUINavbar
      onMenuOpenChange={setIsMenuOpen}
      className="shadow-lg bg-background"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <div className="flex gap-2 items-center">
            <Link href={"/"}>
              <p className="font-bold text-inherit">DevHK</p>
            </Link>
            <ThemeSwitch />
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/posts">
            <div className="flex gap-2 items-center">
              <MdOutlineForum />
              Forum
            </div>
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link color="foreground" href="/posts/write">
            <div className="flex gap-2 items-center">
              <CiPen />
              Write
            </div>
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Popover placement="bottom">
            <PopoverTrigger>
              {isLoading ? (
                <Spinner />
              ) : userProfile ? (
                <Avatar name={userProfile.username} />
              ) : (
                <Avatar />
              )}
            </PopoverTrigger>
            <PopoverContent>
              {user ? (
                <div className="flex flex-col gap-5 py-5 px-3 items-start justify-center">
                  <Link href="/profile">
                    <div className="hover:underline w-full text-lg flex items-center gap-2">
                      <FaExternalLinkAlt />
                      Profile
                    </div>
                  </Link>
                  <Divider />
                  <Button
                    color="danger"
                    className="w-full"
                    onClick={async () => await signOut()}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-5 py-5 px-3 items-start justify-center">
                  <Link href={"/profile"}>
                    <Button color="success" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href={item.link}>
              {item.text}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </NextUINavbar>
  );
};

export default Navbar;
