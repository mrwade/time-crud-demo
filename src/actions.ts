"use server";

import { z } from "zod";
import { db } from "./modules/db";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const CreateAccountSchema = z.object({
  name: z.string().min(1).max(40),
});

export const createAccount = async (rawData: FormData) => {
  const data = CreateAccountSchema.parse({
    name: rawData.get("name"),
  });

  const account = await db.account.create({
    data,
  });

  redirect(`/accounts/${account.id}`);
};

const nullifyEmptyString = (val: unknown) => (val === "" ? null : val);

const CreateWorkSessionSchema = z.object({
  accountId: z.string(),
  startsOn: z.preprocess(
    nullifyEmptyString,
    z.coerce.date().optional().nullable()
  ),
  description: z.string().min(1).max(120).optional().nullable(),
  hours: z.preprocess(
    nullifyEmptyString,
    z.coerce.number().min(0).max(24).optional().nullable()
  ),
});

export const createWorkSession = async (rawData: FormData) => {
  const data = CreateWorkSessionSchema.parse({
    accountId: rawData.get("accountId"),
    startsOn: rawData.get("startsOn"),
    description: rawData.get("description"),
    hours: rawData.get("hours"),
  });

  const workSession = await db.workSession.create({
    data,
  });

  revalidatePath(`/accounts/${workSession.accountId}`);
};

const UpdateWorkSessionSchema = CreateWorkSessionSchema.extend({
  id: z.string(),
}).omit({ accountId: true });

export const updateWorkSession = async (rawData: FormData) => {
  const data = UpdateWorkSessionSchema.parse({
    id: rawData.get("id"),
    startsOn: rawData.get("startsOn"),
    description: rawData.get("description"),
    hours: rawData.get("hours"),
  });

  const workSession = await db.workSession.update({
    data: {
      startsOn: data.startsOn,
      description: data.description,
      hours: data.hours,
    },
    where: { id: data.id },
  });

  revalidatePath(`/accounts/${workSession.accountId}`);
};

const DeleteWorkSessionSchema = z.object({
  id: z.string(),
});

export const deleteWorkSession = async (rawData: FormData) => {
  const { id } = DeleteWorkSessionSchema.parse({
    id: rawData.get("id"),
  });

  const session = await db.workSession.delete({ where: { id } });

  revalidatePath(`/accounts/${session.accountId}`);
};
