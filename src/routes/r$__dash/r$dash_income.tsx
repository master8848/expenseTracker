import { createFileRoute } from "@tanstack/react-router";

import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/utils/funcs/database";

import DashboardError from "@/components/development/dashboardError";
import IncomeForm from "@/components/development/incomeForm";
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
import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CURRENCY, PAGE_SIZE } from "@/utils/consts/common";
import { DATE_FORMAT } from "@/utils/consts/dateFormat";
import { tx } from "@instantdb/react";
import { EyeOpenIcon, Pencil2Icon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { DateTime } from "luxon";
import { useCallback, useMemo, useState } from "react";
export const Route = createFileRoute("/__dash/dash_income")({
  component: DashboardIncome,
});

type actionType = "none" | "edit" | "view" | "delete";
const defaultActionData = (): {
  id: string;
  action: actionType;
  data: Record<string, any>;
} => ({
  id: "",
  action: "none",
  data: {},
});
const pageSize = PAGE_SIZE;
function DashboardIncome() {
  const [cursors, setCursors] = useState<{
    first?: number;
    after?: Cursor;
    before?: Cursor;
    last?: number;
  }>({ first: pageSize });

  const { data, error, isLoading, pageInfo } = db.useQuery({
    income: {
      $: {
        ...cursors,
        order: {
          serverCreatedAt: "desc",
        },
      },
    },
  });

  const nextPage = useCallback(() => {
    const endCursor = pageInfo?.income?.endCursor;
    if (endCursor) {
      setCursors({ after: endCursor, first: pageSize });
    }
  }, [setCursors, pageInfo]);

  const previousPage = useCallback(() => {
    const startCursor = pageInfo?.income?.startCursor;
    if (startCursor) {
      setCursors({
        before: startCursor,
        last: pageSize,
      });
    }
  }, [setCursors, pageInfo]);
  const [actionWithData, setActionWithData] = useState(defaultActionData());

  const columns = useMemo((): ColumnDef<IDBFullSchema["income"]>[] => {
    return [
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
          <div>
            {CURRENCY} {row.getValue("amount")}
          </div>
        ),
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => (
          <div>
            {DateTime.fromJSDate(new Date(row.getValue("date"))).toFormat(
              DATE_FORMAT
            )}
          </div>
        ),
      },
      {
        accessorKey: "updated_at",
        header: "Modified",
        cell: ({ row }) => (
          <div>
            {DateTime.fromJSDate(new Date(row.getValue("updated_at"))).toFormat(
              DATE_FORMAT
            )}
          </div>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
          const desc: string = row.getValue("description");
          return (
            <div
              className="max-w-16 text-ellipsis overflow-hidden"
              title={desc}
            >
              {desc}
            </div>
          );
        },
      },
      {
        header: "Actions",
        cell: ({ row }) => {
          const currentItemId: string = row.original.id!;
          return (
            <>
              <Button
                variant="outline"
                className="py-4 px-3"
                onClick={() =>
                  setActionWithData({
                    action: "edit",
                    id: currentItemId,
                    data: row.original,
                  })
                }
              >
                {" "}
                <Pencil2Icon />
              </Button>
              <Button
                variant="outline"
                className="py-4 px-3"
                onClick={() =>
                  setActionWithData({
                    action: "view",
                    id: currentItemId,
                    data: row.original,
                  })
                }
              >
                {" "}
                <EyeOpenIcon />
              </Button>
              <Button
                variant="outline"
                className="py-4 px-3"
                onClick={() =>
                  setActionWithData({
                    action: "delete",
                    id: currentItemId,
                    data: row.original,
                  })
                }
                title="Delete"
              >
                <Trash2 size={15} strokeWidth={2} />
              </Button>
            </>
          );
        },
      },
    ];
  }, [setActionWithData]);

  if (isLoading) return <Skeleton />;
  if (error) return <DashboardError />;
  return (
    <div className="h-full w-[90vw] ">
      <DataTable
        data={data.income}
        columns={columns}
        pagination={{
          nextPage,
          canNextPage: pageInfo?.income?.hasNextPage,
          canPreviousPage: pageInfo?.income?.hasPreviousPage,
          previousPage,
        }}
      />
      <HandleEditAndView
        actionWithData={actionWithData}
        setActionWithData={setActionWithData}
      ></HandleEditAndView>
    </div>
  );
}

function HandleEditAndView({
  setActionWithData,
  actionWithData,
}: {
  setActionWithData: React.Dispatch<
    React.SetStateAction<{
      id: string;
      action: actionType;
      data: Record<string, any>;
    }>
  >;
  actionWithData: {
    id: string;
    action: actionType;
    data: Record<string, any>;
  };
}) {
  return (
    <>
      {/* Edit  */}
      <Sheet
        open={actionWithData.action === "edit"}
        onOpenChange={(open) => {
          if (!open) setActionWithData(defaultActionData);
        }}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit profile</SheetTitle>
          </SheetHeader>
          <IncomeForm
            edit
            editId={actionWithData.id}
            data={actionWithData.data as any}
            onSubmit={() => {
              setActionWithData(defaultActionData);
            }}
          />
        </SheetContent>
      </Sheet>
      {/* view */}
      <Sheet
        open={actionWithData.action === "view"}
        onOpenChange={(open) => {
          if (!open) setActionWithData(defaultActionData);
        }}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>View Income full data</SheetTitle>
          </SheetHeader>

          <Card className="max-w-sm mx-auto my-4 px-2 pt-5">
            <p>
              <strong>Amount:</strong> {actionWithData.data.amount}
            </p>
            <p>
              <strong>Category:</strong> {actionWithData.data.category}
            </p>
            <p>
              <strong>Description:</strong> {actionWithData.data.description}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {DateTime.fromJSDate(new Date(actionWithData.data.date)).toFormat(
                DATE_FORMAT
              )}
            </p>
            <p>
              <strong>Cre At:</strong>{" "}
              {new Date(actionWithData.data.created_at).toLocaleString()}
            </p>
            <p>
              <strong>Upd At:</strong>{" "}
              {new Date(actionWithData.data.updated_at).toLocaleString()}
            </p>
            <br />
            <CardFooter>
              <p>
                <strong>ID:</strong> {actionWithData.data.id}
              </p>
            </CardFooter>
          </Card>
        </SheetContent>
      </Sheet>
      {/* delete */}
      <AlertDialog
        open={actionWithData.action === "delete"}
        onOpenChange={(open) => {
          if (!open) setActionWithData(defaultActionData);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.Data will be lost for ever
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                db.transact([tx.income[actionWithData.id].delete()]);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
