import Image from "next/image";
import React from "react";
import Forms from "@/components/Forms";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center h-max md:h-[100vh] ">
      <div className="w-full flex h-full">
        <div className="hidden flex-1 w-full h-full md:flex flex-col items-center justify-center">
          <div className="relative w-full h-full bg-yellow-50">
            <Image
              src="/signup.svg"
              fill
              priority
              className="object-contain"
              alt="sign up image"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-scroll scrollWidth0 w-full">
          <Forms />
        </div>
      </div>
    </div>
  );
}

// export default Register;
