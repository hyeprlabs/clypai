"use client"

import React from "react";
import { StatsigProvider, useClientAsyncInit } from "@statsig/react-bindings";
import { StatsigAutoCapturePlugin } from "@statsig/web-analytics";
import { StatsigSessionReplayPlugin } from "@statsig/session-replay";

export function Statsig({ children }: { children: React.ReactNode }) {
  const { client } = useClientAsyncInit(
    "client-HCGHiwkzvCsAz2HozJbmhieqjCuIyOG0uhQg66DYJjw",
    { userID: 'a-user' }, 
    { plugins: [ new StatsigAutoCapturePlugin(), new StatsigSessionReplayPlugin() ] },
  );

  return (
    <StatsigProvider client={client} loadingComponent={<div>Loading...</div>}>
      {children}
    </StatsigProvider>
  );
}