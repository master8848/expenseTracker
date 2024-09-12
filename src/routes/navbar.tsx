import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@tanstack/react-router";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useToggle } from "@/hooks/useToggle";

const Navbar = () => {
  const [openState, { setFalse, setTrue }] = useToggle();

  return (
    <Sheet open={openState}>
      <SheetTrigger asChild onClick={setTrue}>
        <Button variant={"ghost"}>
          <HamburgerMenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="h-screen"
        closeProps={{
          onClick: setFalse,
        }}
      >
        <SheetHeader>
          <SheetTitle>Track All Expenses</SheetTitle>
        </SheetHeader>
        <Link to="/dashboard" onClick={setFalse}>
          <div className="mt-9 flex gap-5  text-lg text-gray-900 dark:text-gray-100 border py-3 px-4 rounded-sm shadow-sm">
            Dashboard
          </div>
        </Link>
        <Link to="/" onClick={setFalse}>
          <div className="mt-9 flex gap-5  text-lg text-gray-900 dark:text-gray-100 border py-3 px-4 rounded-sm shadow-sm">
            Expense
          </div>
        </Link>
        <Link to="/income" onClick={setFalse}>
          <div className="mt-9 flex gap-5  text-lg text-gray-900 dark:text-gray-100 border py-3 px-4 rounded-sm shadow-sm">
            Income
          </div>
        </Link>
        <SheetFooter className="h-full mb-10">
          <SheetClose asChild>
            <div className="w-full mb-4 text-gray-500 dark:text-gray-600">
              Created by Saurav sanjel
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Navbar;
