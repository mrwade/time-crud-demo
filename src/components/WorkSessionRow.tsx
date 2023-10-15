"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { deleteWorkSession } from "@/actions";
import WorkSessionFormRow from "./WorkSessionFormRow";

type Props = {
  session: {
    id: string;
    accountId: string;
    description: string | null;
    startsOn: Date | null;
    hours: number | null;
  };
};

const WorkSessionRow: React.FC<Props> = ({ session }) => {
  const [editMode, setEditMode] = useState(false);

  if (editMode)
    return (
      <WorkSessionFormRow
        account={{ id: session.accountId }}
        session={session}
        onCancelClick={() => setEditMode(false)}
      />
    );

  return (
    <div key={session.id} className="flex border-b border-slate-200 py-3">
      <div className="flex-1 font-medium">
        {session.startsOn?.toISOString().substring(0, 10)}
      </div>
      <div className="flex-[3_3_0%]">{session.description}</div>
      <div className="flex-1 text-right">{session.hours}</div>
      <div className="flex flex-1 text-right">
        <Button
          variant="ghost"
          size="sm"
          className="text-slate-500"
          onClick={() => setEditMode(true)}
        >
          <PencilIcon size={16} />
        </Button>
        <form action={deleteWorkSession}>
          <input type="hidden" name="id" value={session.id} />
          <Button variant="ghost" size="sm" className="text-slate-500">
            <TrashIcon size={16} />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default WorkSessionRow;
