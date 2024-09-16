import useDatabaseStore from "@/app/databaseStore";
import DbCredentialsForm from "@/components/development/dbCredentialsForm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { updateDb } from "@/utils/funcs/database";
import { useTheme } from "@/utils/hooks/useTheme";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import * as React from "react";
import { Toaster } from "sonner";
import Navbar from "./navbar";

export const Route = createRootRoute({
  component: RootLayout,
});

export default function RootLayout() {
  const { appId } = useDatabaseStore((c) => c);
  useTheme();

  React.useEffect(() => {
    if (appId) updateDb();
  }, [appId]);
  return (
    <React.Fragment>
      <Toaster closeButton duration={400} />
      {appId ? (
        <div className="h-screen flex-col flex dark:bg-gray-900">
          <ScrollArea className=" flex-grow h-[calc(100vh-4rem)]" key={appId}>
            <Outlet />
          </ScrollArea>

          <Navbar></Navbar>
        </div>
      ) : (
        <DbCredentialsForm />
      )}
    </React.Fragment>
  );
}
