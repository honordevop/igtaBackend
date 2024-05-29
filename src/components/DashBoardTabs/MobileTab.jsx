"use client";

import { userTabsLink } from "@/Utils/store";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { HiOutlineLogout } from "react-icons/hi";

const MobileTab = ({ currentPage, tabLink }) => {
  // const { logOutHandler, handlePageLoading } = useGlobalContext();

  return (
    <div className="bg-white absolute left-0 top-[3rem] h-max w-full rounded-md">
      <ul className="flex flex-col gap-3 py-[1.5rem]">
        {tabLink?.map((link, i) => (
          <Link
            href={link.link}
            shallow
            key={i}
            style={
              link.slug == currentPage
                ? { backgroundColor: "#8a2928", color: "white" }
                : { backgroundColor: "transparent", color: "black" }
            }
            className="px-6 py-2"
          >
            <div className="flex gap-3 items-center ">
              <div
                className=" text-sm p-1 border  rounded-md "
                style={
                  link.slug == currentPage
                    ? { borderColor: "white" }
                    : { borderColor: "black" }
                }
              >
                {link.icon}
              </div>
              <p className=" text-md font-bold text-nowrap">{link.title} </p>
            </div>
          </Link>
        ))}
        <div
          style={{ backgroundColor: "transparent" }}
          className="pl-6 pr-2 py-4"
          onClick={() => {
            signOut();
            // handlePageLoading();
            // logOutHandler();
          }}
        >
          <div className="flex gap-5 items-center cursor-pointer">
            <div className=" text-lg p-2 border border-white rounded-md text-white">
              <HiOutlineLogout />
            </div>
            <p className=" text-white text-lg font-bold text-nowrap">Log Out</p>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default MobileTab;
