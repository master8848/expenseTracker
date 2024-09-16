import useDatabaseStore from "@/app/databaseStore";
import DbCredentialsForm from "@/components/development/dbCredentialsForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import * as React from "react";
import { Toaster } from "sonner";
import Navbar from "./navbar";

export const Route = createRootRoute({
  component: RootLayout,
});

export default function RootLayout() {
  const { appId } = useDatabaseStore((c) => c);
  if (!appId)
    return (
      <>
        <DbCredentialsForm />
      </>
    );
  return (
    <React.Fragment>
      <div className="h-screen flex-col flex dark:bg-gray-900">
        <Toaster closeButton duration={400} />

        <ScrollArea className=" flex-grow h-[calc(100vh-4rem)]">
          <Outlet />
        </ScrollArea>

        <Navbar></Navbar>
      </div>
    </React.Fragment>
  );
}
