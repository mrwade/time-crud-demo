"use client";

import { createWorkSession, updateWorkSession } from "@/actions";
import React, { useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Props = {
  account: {
    id: string;
  };
  session?: {
    id: string;
    description: string | null;
    startsOn: Date | null;
    hours: number | null;
  };
  onCancelClick?: () => void;
};

const WorkSessionFormRow: React.FC<Props> = ({
  account,
  session,
  onCancelClick,
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleAction = async (data: FormData) => {
    if (session) {
      await updateWorkSession(data);
      onCancelClick?.();
    } else {
      await createWorkSession(data);
      formRef.current?.reset();
    }
  };

  return (
    <form ref={formRef} action={handleAction}>
      <input type="hidden" name="id" value={session?.id} />
      <input type="hidden" name="accountId" value={account.id} />
      <div className="flex gap-1 border-b border-slate-200 py-3">
        <div className="flex-1 font-medium">
          <Input
            type="date"
            name="startsOn"
            defaultValue={
              session?.startsOn?.toISOString().substring(0, 10) || undefined
            }
          />
        </div>
        <div className="flex-[3_3_0%]">
          <Input
            name="description"
            defaultValue={session?.description || undefined}
          />
        </div>
        <div className="flex-1 text-right">
          <Input
            type="number"
            step="0.25"
            name="hours"
            defaultValue={session?.hours || undefined}
          />
        </div>
        <div className="flex flex-1 gap-1">
          <Button>{session ? "Save" : "Add"}</Button>
          {session ? (
            <Button type="button" variant="secondary" onClick={onCancelClick}>
              Cancel
            </Button>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export default WorkSessionFormRow;
