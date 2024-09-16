import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import "./index.css";

// Import the generated route tree
import React from "react";
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// const DBMigrationKey="b901bc80-1b41-4d29-ae9e-ded3c8cf022b"
// createTables(localStorage.getItem(DBMigrationKey)||"").then(c=>{
//   console.log("table creation complete")
//   localStorage.setItem(DBMigrationKey,c)})
// Render the app
const rootElement = document.getElementById("root")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
}
