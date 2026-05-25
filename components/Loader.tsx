"use client";

import React from "react";

type LoaderProps = {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
};

export default function Loader({
  size = "md",
  text = "Loading...",
  fullScreen = false,
}: LoaderProps) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${
        fullScreen ? "min-h-screen" : ""
      }`}
    >
      <div
        className={`border-4 border-gray-700 border-t-white rounded-full animate-spin ${sizeClasses[size]}`}
      />
      {text && <p className="text-sm text-gray-400">{text}</p>}
    </div>
  );
}