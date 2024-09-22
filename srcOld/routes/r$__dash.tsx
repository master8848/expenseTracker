import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { useSwipeable } from "react-swipeable";

export const Route = createFileRoute("/__dash")({
  component: Transction,
});
const TAB_OBJ = {
  "/dash_expense": {
    link: "/dash_expense",
    label: "Expense",
    value: "expense",
    right: "/dash_loan",
    left: "/dash_income",
  },
  "/dash_income": {
    link: "/dash_income",
    label: "Income",
    value: "income",
    right: "/dash_expense",
    left: "/dash_loan",
  },
  "/dash_loan": {
    link: "/dash_loan",
    label: "Loan",
    value: "loan",
    right: "/dash_income",
    left: "/dash_expense",
  },
};
const TAB_LIST = Object.values(TAB_OBJ);
function Transction() {
  const navigate = useNavigate();
  const { href } = useLocation();
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      navigate({
        to: TAB_OBJ[href as keyof typeof TAB_OBJ]?.left,
        from: href,
      }),
    onSwipedRight: () =>
      navigate({
        to: TAB_OBJ[href as keyof typeof TAB_OBJ]?.right,
        from: href,
      }),
  });

  return (
    <div
      {...handlers}
      className="min-h-full items-center flex flex-col  justify-between "
    >
      <div className="">
        <ScrollArea className=" h-[calc(100vh-7rem)]  flex-1 mb-3 ">
          <Outlet />
        </ScrollArea>
      </div>

      <Tabs
        value={TAB_OBJ[href as keyof typeof TAB_OBJ]?.value}
        className=" w-full"
      >
        <TabsList className="grid w-full grid-cols-3 gap-2 p-1 pt-[6px]">
          {TAB_LIST.map((curr) => (
            <TabsTrigger
              key={curr.value}
              onClick={() => {
                navigate({ to: curr.link });
              }}
              value={curr.value}
            >
              {curr.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
