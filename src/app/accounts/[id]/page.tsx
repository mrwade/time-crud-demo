import NewWorkSessionRow from "@/components/WorkSessionFormRow";
import WorkSessionRow from "@/components/WorkSessionRow";
import { db } from "@/modules/db";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

const AccountDetailPage: React.FC<Props> = async ({ params }) => {
  const account = await db.account.findUniqueOrThrow({
    select: {
      id: true,
      name: true,
      workSessions: {
        select: {
          id: true,
          accountId: true,
          description: true,
          startsOn: true,
          hours: true,
        },
        orderBy: { startsOn: "desc" },
      },
    },
    where: { id: params.id },
  });

  return (
    <div className="p-8">
      <h1 className="text-lg font-bold mb-8">{account.name}</h1>

      <div>
        <div>
          <div className="flex">
            <div className="flex-1 w-[100px]">Date</div>
            <div className="flex-[3_3_0%]">Description</div>
            <div className="flex-1 text-right w-[140px]">Hours</div>
            <div className="flex-1" />
          </div>
        </div>
        <div>
          <NewWorkSessionRow account={account} />
          {account.workSessions.map((session) => (
            <WorkSessionRow key={session.id} session={session} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountDetailPage;
