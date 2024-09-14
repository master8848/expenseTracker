
import { Outlet, createRootRoute } from "@tanstack/react-router";
import * as React from "react";
import { Toaster } from "sonner";
import Navbar from "./navbar";

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <div className="h-[100dvh]">
      <Toaster />
      <Navbar></Navbar>
      <main className="container h-full">
        <Outlet />
      </main>
      </div>
    </React.Fragment>
  ),
});
