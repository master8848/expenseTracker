import useDatabaseStore from "@/app/databaseStore";
import useThemeStore from "@/app/themeStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { useToggle } from "@/hooks/useToggle";
import { useTheme } from "@/utils/hooks/useTheme";
import { Link } from "@tanstack/react-router";

const Navbar = () => {
  useTheme();
  const { theme, setTheme } = useThemeStore();
  const { setInstantDb } = useDatabaseStore();
  const [dialog, { setTrueOrFalse, setTrue }] = useToggle(false);

  return (
    <>
      <Menubar className="h-16">
        <MenubarMenu>
          <Link to="/">
            <MenubarTrigger>Transaction</MenubarTrigger>
          </Link>
        </MenubarMenu>

        <MenubarMenu>
          <Link to="/dash_expense">
            <MenubarTrigger>Dashboard</MenubarTrigger>
          </Link>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>Settings</MenubarTrigger>

          <MenubarContent>
            <MenubarItem
              onClick={() => {
                setTheme(
                  theme == "system"
                    ? "light"
                    : theme == "dark"
                      ? "light"
                      : "dark"
                );
              }}
            >
              {theme == "system"
                ? "Light Mode"
                : theme == "dark"
                  ? "Light Mode"
                  : "Dark Mode"}
            </MenubarItem>
            <MenubarItem onClick={setTrue}>Log out</MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
      <AlertDialog open={dialog} onOpenChange={setTrueOrFalse}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setInstantDb({ appId: null, appUri: undefined });
              }}
            >
              Log out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Navbar;

// const [openState, { setFalse, setTrue }] = useToggle();
// <Sheet open={openState} modal >
// <SheetTrigger asChild onClick={setTrue}>
//   <Button variant={"ghost"}>
//     <HamburgerMenuIcon className="h-4 w-4" />
//   </Button>
// </SheetTrigger>
// <SheetContent
//   side={"left"}
//   className="h-screen"
//   closeProps={{
//     onClick: setFalse,
//   }}
//   overlayProps={{
//     onClick:setFalse
//   }}
// >
//   <SheetHeader>
//     <SheetTitle>Track All Expenses</SheetTitle>
//   </SheetHeader>
//   <Link to="/dashboard" onClick={setFalse}>
//     <div className="mt-9 flex gap-5  text-lg text-gray-900 dark:text-gray-100 border py-3 px-4 rounded-sm shadow-sm">
//       Dashboard
//     </div>
//   </Link>
//   <Link to="/" onClick={setFalse}>
//     <div className="mt-9 flex gap-5  text-lg text-gray-900 dark:text-gray-100 border py-3 px-4 rounded-sm shadow-sm">
//       Expense
//     </div>
//   </Link>
//   <Link to="/income" onClick={setFalse}>
//     <div className="mt-9 flex gap-5  text-lg text-gray-900 dark:text-gray-100 border py-3 px-4 rounded-sm shadow-sm">
//       Income
//     </div>
//   </Link>
//   <SheetFooter className="h-full mb-10">
//     <SheetClose asChild>
//       <div className="w-full mb-4 text-gray-500 dark:text-gray-600">
//         Created by Saurav sanjel
//       </div>
//     </SheetClose>
//   </SheetFooter>
// </SheetContent>
// </Sheet>
