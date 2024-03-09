"use client";

import React, { ReactNode } from "react";
import { NextUIProvider as Provider } from "@nextui-org/react";

const NextUIProvider = ({ children }: { children: ReactNode }) => {
  return <Provider>{children}</Provider>;
};

export default NextUIProvider;
