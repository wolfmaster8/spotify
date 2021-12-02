import React from "react";
import { UilMusic } from "@iconscout/react-unicons";

export default function LoadingContainer() {
  return (
    <div className=" flex flex-col items-center justify-center min-h-screen w-full">
      <UilMusic className="text-blue-600 mr-2 animate-pulse w-8 h-8" />
      <p className="text-lg text-blue-700 font-semibold">Loading...</p>
    </div>
  );
}
