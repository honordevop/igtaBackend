"use client";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillEye, AiOutlineCloseCircle } from "react-icons/ai";
import { IoMdEyeOff } from "react-icons/io";
import Image from "next/image";
import useInput from "@/hooks/use-input";
import { toast } from "react-toastify";
import { BeatLoader, ClimbingBoxLoader } from "react-spinners";
import { MdOutlineCloudDone } from "react-icons/md";

const CreateEventForm = ({ hideForm }) => {
  const [regSuccess, setRegSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    value: date,
    isValid: dateIsValid,
    hasError: dateHasError,
    valueChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    reset: dateInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: title,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleBlurHandler,
    reset: titleInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: image,
    isValid: imageIsValid,
    hasError: imageHasError,
    valueChangeHandler: imageChangeHandler,
    inputBlurHandler: imageBlurHandler,
    reset: imageInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: description,
    isValid: descriptionIsValid,
    hasError: descriptionHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: descriptionInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: facilitator,
    isValid: facilitatorIsValid,
    hasError: facilitatorHasError,
    valueChangeHandler: facilitatorChangeHandler,
    inputBlurHandler: facilitatorBlurHandler,
    reset: facilitatorInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: time,
    isValid: timeIsValid,
    hasError: timeHasError,
    valueChangeHandler: timeChangeHandler,
    inputBlurHandler: timeBlurHandler,
    reset: timeInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: location,
    isValid: locationIsValid,
    hasError: locationHasError,
    valueChangeHandler: locationChangeHandler,
    inputBlurHandler: locationBlurHandler,
    reset: locationInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: link,
    isValid: linkIsValid,
    hasError: linkHasError,
    valueChangeHandler: linkChangeHandler,
    inputBlurHandler: linkBlurHandler,
    reset: linkInputReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: mode,
    isValid: modeIsValid,
    hasError: modeHasError,
    valueChangeHandler: modeChangeHandler,
    inputBlurHandler: modeBlurHandler,
    reset: modeInputReset,
  } = useInput((value) => value.trim() !== "");

  const [inputs, setInputs] = useState({
    title: "",
    date: "",
    description: "",
    facilitator: "",
    time: "",
    mode: "",
    location: "",
    link: "",
  });

  const [file, setFile] = useState();
  const handleChangeImg = () => {
    const target = e.target;
    const item = target.files[0];
    setFile(item);
  };

  const upload = async () => {
    const data = new FormData();
    data.append("file" || "");
    data.append("upload_preset", "igta");

    const res = await fetch("https://api.cloudinary.com/v1_1/lamadev/image", {
      method: "POST",
      headers: { "Content-Type": "multipart/form-data" },
      body: data,
    });

    const resData = await res.json();
    return resData.url;
  };

  const handleSubmit = async () => {
    setLoading(true);

    e.preventDefault();

    // try {
    //   const url = await upload();
    //   const res = await fetch("/api/events", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //       },
    //     body: JSON.stringify({
    //       image: url,
    //       ...inputs
    //     }),
    //   });

    //   const data = await res.json();
    //   //   console.log(data);
    //   toast(data.message);
    //   setLoading(false);
    //   setRegSuccess(true);
    // //   router.push(`/product/${data.id}`);
    // } catch (error) {
    //   console.log(error);
    //   setLoading(false);
    //   toast.warn(error.message);
    // }
    console.log(inputs);
  };

  //   const {
  //     errorMessage: loginErrorMessage,
  //     setErrorMessage: setLoginErrorMessage,
  //   } = useError();

  let formIsValid =
    dateIsValid &&
    titleIsValid &&
    imageIsValid &&
    descriptionIsValid &&
    facilitatorIsValid &&
    timeIsValid &&
    modeIsValid &&
    locationIsValid &&
    linkIsValid;

  const createEvent = async () => {
    setLoading(true);
    // console.log(`${email} + ${password} + ${firstName} + ${lastName} `);
    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          date,
          image,
          description,
          facilitator,
          time,
          mode,
          location,
          link,
        }),
      });
      // const data = await res.json();
      const data = await res.json();
      //   console.log(data);
      toast(data.message);
      //   sendmail();
      //   dateInputReset();
      //   titleInputReset();
      //   imageInputReset();
      //   descriptionInputReset();
      //   facilitatorInputReset();
      //   timeInputReset();
      //   modeInputReset();
      //   locationInputReset();
      //   linkInputReset();
      setLoading(false);
      setRegSuccess(true);
      // setTimeout(() => {
      //   if (res.status === 201) {
      //     router.push("/dashboard/account?success=Account has been created");
      //   }
      // }, 3000);
      // toast("Account Created Successfully");
    } catch (error) {
      console.log(error);
      //   setLoginErrorMessage(error.response.data.message);
      setLoading(false);
      toast.warn(error.message);
    }
  };

  //   const formSubmitHandler = (event) => {
  //     event.preventDefault();
  //     if (!formIsValid) {
  //       return;
  //     }
  //     setLoading(true);

  //     // console.log("hello");
  //     const userEntries = {
  //       email: email,
  //       facility,
  //       name: fullName,
  //     };

  //     // console.log(`${firstName} ${lastName} ${password} ${passwordCheck}`)

  //     // console.log(userEntries);

  //     // sendMail();
  //     register();
  //   };

  // if (loading) {
  //   return (
  //     <div className="w-full h-screen absolute top-0 left-0 bg-[#00000086]  flex items-center justify-center">
  //       <ClimbingBoxLoader color="#007bff" />
  //     </div>
  //   );
  // }

  // if (regSuccess) {
  //   return (
  //     <div className="w-full h-screen absolute top-0 left-0 bg-[#00000086]  flex items-center justify-center">
  //       <div className="flex flex-col gap-4">
  //         <MdOutlineCloudDone color="#007bff" className="text-7xl" />

  //         <div>Close</div>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="w-full h-screen absolute top-0 left-0 bg-[#00000086]  flex items-center justify-center">
      {!loading && !regSuccess && (
        <div className="w-full pb-8 flex flex-col items-center justify-center">
          <div className="realtive bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[550px] mt-8 mx-0 md:mx-auto px-4 md:px-16 py-8 rounded-lg shadow-2xl">
            <form className="my-8 text-sm" onSubmit={handleSubmit}>
              <div className="flex flex-col my-4">
                <label htmlFor="" className="font-semibold">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                  placeholder="Enter your Super Admin Fullname"
                  onChange={handleChangeImg}
                  //   value={title}
                  //   onBlur={titleBlurHandler}
                  //   onChange={titleChangeHandler}
                />

                {titleHasError && (
                  <p className="text-red-500">Enter a valid Input</p>
                )}
              </div>

              <div className="flex flex-col my-4">
                <label htmlFor="" className="font-semibold">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                  placeholder="Event Date"
                  onChange={handleChangeImg}
                  //   value={date}
                  //   onBlur={dateBlurHandler}
                  //   onChange={dateChangeHandler}
                />
                {dateHasError && (
                  <p className="text-red-500">Enter a valid input</p>
                )}
              </div>

              <div className="">
                <label htmlFor="" className="font-semibold">
                  Description
                </label>
                <div className="w-full border border-gray-300 focus:border-gray-300 focus:outline-none focus:ring-0  rounded">
                  <textarea
                    className="w-[70%] p-2  focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                    placeholder="Event Description"
                    name="description"
                    onChange={handleChangeImg}
                    // value={description}
                    // onChange={descriptionChangeHandler}
                    // onBlur={descriptionBlurHandler}
                  ></textarea>
                </div>
                {descriptionHasError && (
                  <p className="text-red-500">Enter a valid input</p>
                )}
              </div>

              <div className="flex flex-col my-4">
                <label htmlFor="" className="font-semibold">
                  Image
                </label>
                <input
                  type="file"
                  name="file"
                  onChange={handleChangeImg}
                  id="file"
                  className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                  placeholder="Event Date"
                  //   value={image}
                  //   onBlur={imageBlurHandler}
                  //   onChange={imageChangeHandler}
                />
                {imageHasError && (
                  <p className="text-red-500">Enter a valid input</p>
                )}
              </div>

              <div className="flex flex-col my-4">
                <label htmlFor="" className="font-semibold">
                  Facilitator
                </label>
                <input
                  type="text"
                  name="facilitator"
                  className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                  placeholder="Facilitator Name"
                  onChange={handleChangeImg}
                  //   value={facilitator}
                  //   onChange={facilitatorChangeHandler}
                  //   onBlur={facilitatorBlurHandler}
                ></input>
                {facilitatorHasError && (
                  <p className="text-red-500">Enter a valid Input</p>
                )}
              </div>

              <div className="flex flex-col my-4">
                <label htmlFor="" className="font-semibold">
                  Time
                </label>
                <input
                  type="text"
                  name="time"
                  className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                  //   placeholder="Event Time" onChange={handleChangeImg}
                  //   value={time}
                  //   onChange={timeChangeHandler}
                  //   onBlur={timeBlurHandler}
                ></input>
                {timeHasError && (
                  <p className="text-red-500">Enter a valid Input</p>
                )}
              </div>

              <div className="flex flex-col my-4">
                <label htmlFor="" className="font-semibold">
                  Mode
                </label>
                <input
                  type="text"
                  name="mode"
                  className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                  placeholder="Facilitator Name"
                  onChange={handleChangeImg}
                  //   value={mode}
                  //   onChange={modeChangeHandler}
                  //   onBlur={modeBlurHandler}
                ></input>
                {modeHasError && (
                  <p className="text-red-500">Enter a valid Input</p>
                )}
              </div>

              <div className="flex flex-col my-4">
                <label htmlFor="" className="font-semibold">
                  Location (Optional)
                </label>
                <input
                  type="text"
                  name="location"
                  className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                  placeholder="Facilitator Name"
                  onChange={handleChangeImg}
                  //   value={location}
                  //   onChange={locationChangeHandler}
                  //   onBlur={locationBlurHandler}
                ></input>
                {locationHasError && (
                  <p className="text-red-500">Enter a valid Input</p>
                )}
              </div>

              <div className="flex flex-col my-4">
                <label htmlFor="" className="font-semibold">
                  Link (Optional)
                </label>
                <input
                  type="text"
                  name="link"
                  className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900"
                  placeholder="Event Vitual Link"
                  onChange={handleChangeImg}
                  //   value={link}
                  //   onChange={linkChangeHandler}
                  //   onBlur={linkBlurHandler}
                ></input>
                {linkHasError && (
                  <p className="text-red-500">Enter a valid Input</p>
                )}
              </div>

              <div className="w-full my-4 flex items-center justify-end space-x-4">
                {!loading && (
                  <button
                    className="w-full primaryBgColor hover:primaryBgColorLight rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase font-semibold"
                    // onClick={() => createEvent()}
                  >
                    Create
                  </button>
                )}
                {loading && (
                  <div className="w-full flex items-center justify-center">
                    <BeatLoader color="#b52624" />
                  </div>
                )}
              </div>
            </form>

            <div
              className=" absolute top-3 right-3 text-4xl cursor-pointer"
              onClick={hideForm}
            >
              <AiOutlineCloseCircle />
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className="">
          <ClimbingBoxLoader color="#007bff" size={30} />
        </div>
      )}
      {regSuccess && (
        <div className=" bg-white w-[70%] h-[30%] flex flex-col items-center justify-center">
          <div className="flex flex-col gap-4 items-center justify-center">
            <MdOutlineCloudDone color="#007bff" className="text-7xl" />
            <p className="text-lg font-semibold">Event Created Successfully</p>
            <div
              className="px-5 py-2 primaryBgColor hover:primaryBgVolorLight font-semibold text-lg text-white rounded-lg"
              onClick={() => {
                hideForm();
                setRegSuccess(false);
              }}
            >
              Close
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateEventForm;
