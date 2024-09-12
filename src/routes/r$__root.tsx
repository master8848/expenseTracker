import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import Navbar from "./navbar";

export const Route = createRootRoute({
  component: () => (
    <React.Fragment>
      <Navbar></Navbar>
      <main className="container">
        <Outlet />
      </main>
    </React.Fragment>
  ),
});
