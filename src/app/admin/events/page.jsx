"use client";
import Tabs from "@/components/DashBoardTabs/Tabs";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import MobileMenu from "@/components/DashBoardTabs/MobileMenu";
import { usePathname, useRouter } from "next/navigation";
// import { useGlobalContext } from "@/contextAPI/context";
// import useRData from "@/hooks/useRData";
import { BounceLoader } from "react-spinners";
import { adminTabsLink } from "@/Utils/store";
import useRData from "@/hooks/useRData";
import { useSession } from "next-auth/react";
import ProfilePanel from "@/components/ProfilePanel";
import { useGlobalContext } from "@/contextAPI/context";
import { toast } from "react-toastify";
import EventList from "@/components/EventList";
import EventsList from "@/components/EventsList";
import CreateEventForm from "@/components/CreateEventForm";

const Dashboard = () => {
  const pathname = usePathname();

  const { pageLoading, offPageLoading } = useGlobalContext();

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      // handlePageLoading();
      router.push("/");
    }
  }, [status, session]);

  const currentPage = pathname ? pathname.split("/").pop() : "";
  // const { pageLoading, offPageLoading } = useGlobalContext();

  const { data: userData, fetchData, error: err } = useRData();

  const [addPadding, setAddPadding] = useState("0");
  const [leftWidth, setLefttWidth] = useState("25");
  const [changeWidth, setChangeWidth] = useState(false);
  const [eventsList, setEventsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);

  // const {
  //   data: profileData,
  //   fetchData: validateLogin,
  //   error: err,
  // } = useRData();

  // const validate = () => {
  //   offPageLoading();
  //   validateLogin("//localhost:5000/@me");
  // };

  const fetchEventData = async () => {
    try {
      const response = await fetch("/api/events");

      const res = await response.json();
      setEventsList(res.events);
    } catch (error) {
      // setError(error?.response);
      toast(error?.response.message);
      // console.log(error?.response);
    }
  };

  const hideEventsFormHandler = () => {
    setShowEventForm(false);
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchData(`/api/user?email=${session.user.email}`);
    }

    return () => {
      fetchEventData();
    };
  }, [session?.user?.email]);

  // console.log(eventsList);

  useEffect(() => {
    if (userData.user) {
      offPageLoading();
    }
  }, [userData.user]);

  useEffect(() => {
    handleWidthChage();
  }, [changeWidth, leftWidth]);

  // if (err.status === 401) {
  //   console.log(err.status);
  //   window.location.href = "/";
  // }

  // useEffect(() => {
  //   if (profileData.status === 200) {
  //     setLoading(false);
  //   }
  // }, [profileData.status]);

  const turnOn = () => {
    setChangeWidth((prev) => !prev);
  };

  const handleWidthChage = () => {
    localStorage.setItem("changeWidth", changeWidth);
    if (changeWidth) {
      setLefttWidth("5");
      setAddPadding("10");
    }
    if (!changeWidth) {
      setLefttWidth("20");
      setAddPadding("0");
    }
  };

  if (pageLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div>
          <BounceLoader className="" size={80} color="#b52624" />
        </div>
      </div>
    );
  }

  // if (loading) {
  //   return (
  //     <div className="w-full h-screen flex items-center justify-center">
  //       <div>
  //         <BounceLoader className="" size={80} color="#b52624" />
  //       </div>
  //     </div>
  //   );
  // }

  if (session?.user?.email !== process.env.NEXT_PUBLIC_MAIL_CHECK) {
    router?.push("/dashboard");
  }

  if (
    status === "authenticated" &&
    session?.user?.email === process.env.NEXT_PUBLIC_MAIL_CHECK
  ) {
    return (
      <div className="w-full h-screen flex items-center font-space_grotesk bg-white ">
        {/* Left Side */}
        <div
          className={`h-full transitionWidth hideDivMax1024  primaryBgColor`}
          style={{ width: `${leftWidth}rem` }}
        >
          <Tabs currentPage={currentPage} tabLink={adminTabsLink} />
        </div>

        {/* Right Side */}
        <div className={` w-full h-full`}>
          {/* Wrapper */}
          <div className="w-full h-full">
            <div className="h-max py-4 px-8 bg-[#f3f4f6] flex items-center justify-between relative ">
              <p
                className=" text-xl font-bold "
                style={{ paddingLeft: `${addPadding}px` }}
              >
                Welcome!
              </p>

              <div className="font-medium">
                <p>{userData?.user?.fullname}</p>
                <p>{userData?.user?.email}</p>
              </div>

              {!changeWidth ? (
                <div
                  className="py-2 pr-3 bg-[#8a2928] w-max rounded-l-md absolute -left-9 top-5 cursor-pointer hideDivMax1024"
                  onClick={() => turnOn()}
                >
                  <FaCaretLeft className="text-2xl" />
                </div>
              ) : (
                <div
                  className="py-2 pl-3 bg-[#8a2928] w-max rounded-r-md absolute -left-0 top-5 cursor-pointer hideDivMax1024"
                  onClick={() => turnOn()}
                >
                  <FaCaretRight className="text-2xl" />
                </div>
              )}
            </div>

            <MobileMenu currentPage={currentPage} tabLink={adminTabsLink} />

            <div className="m-8 h-[70%] md:h-[80%] overflow-y-scroll hideScrollBar">
              <p className="text-xl font-bold hideDivMax1024">
                {currentPage.charAt(0).toUpperCase() +
                  currentPage.slice(1).toLowerCase()}
              </p>

              <div className="">
                {/* <DashBoardPannel profileData={userData.user} /> */}
                {/* <ProfilePanel profileData={userData.user} /> */}
                <div className="my-6">
                  <button
                    className=" bg-[#b52624] hover:bg-red-400 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition cursor-pointer duration-150 uppercase font-semibold"
                    onClick={() => setShowEventForm(true)}
                  >
                    Create Event
                  </button>
                </div>
                <div>
                  <h1 className="font-bold text-lg my-6">
                    Events/Training Records
                  </h1>
                  <EventsList data={eventsList} />
                </div>
                {/* <EventList /> */}
              </div>
            </div>
          </div>

          {showEventForm && (
            <CreateEventForm hideForm={hideEventsFormHandler} />
          )}
        </div>
      </div>
    );
  }
};

export default Dashboard;
