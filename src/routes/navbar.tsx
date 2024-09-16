import { Menubar, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { useTheme } from "@/utils/hooks/useTheme";
import { Link } from "@tanstack/react-router";

const Navbar = () => {
  useTheme();
  return (
    <>
      <Menubar className="h-16">
        <MenubarMenu>
          <Link to="/">
            <MenubarTrigger>Transaction</MenubarTrigger>
          </Link>
          {/*           
          <MenubarContent>
            <MenubarItem>
              <Link className="py-2 px-4 text-center w-full border rounded-sm "  to="/income">Income</Link>
            </MenubarItem>
            <MenubarItem>
              <Link className="py-2 px-4 text-center w-full border rounded-sm "  to="/">Expense</Link>
            </MenubarItem>
            <MenubarItem>
              <Link className="py-2 px-4 text-center w-full border rounded-sm "  to="/loan">Loan</Link>
            </MenubarItem>
          </MenubarContent> */}
        </MenubarMenu>

        <MenubarMenu>
          <Link to="/dash_expense">
            <MenubarTrigger>Dashboard</MenubarTrigger>
          </Link>
        </MenubarMenu>
      </Menubar>
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
