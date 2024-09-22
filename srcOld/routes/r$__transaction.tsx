import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import { useSwipeable } from "react-swipeable";

export const Route = createFileRoute("/__transaction")({
  component: Transction,
});

const TAB_OBJ = {
  "/": {
    link: "/",
    label: "Expense",
    value: "expense",
    right: "/loan",
    left: "/income",
  },
  "/income": {
    link: "/income",
    label: "Income",
    value: "income",
    right: "/",
    left: "/loan",
  },
  "/loan": {
    link: "/loan",
    label: "Loan",
    value: "loan",
    right: "/income",
    left: "/",
  },
};
const TAB_LIST = Object.values(TAB_OBJ);
function Transction() {
  const navigate = useNavigate();
  const { href } = useLocation();
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      console.log("left", href, TAB_OBJ[href as keyof typeof TAB_OBJ]);
      navigate({
        to: TAB_OBJ[href as keyof typeof TAB_OBJ]?.left,
        from: href,
      });
    },
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
        className=" w-full h-full "
      >
        <TabsList className="grid w-full  grid-cols-3 gap-2 p-1 pt-[6px]">
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
