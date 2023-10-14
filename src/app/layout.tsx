import { db } from "@/modules/db";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const accounts = await db.account.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen`}>
        <div className="bg-slate-800 text-slate-100 w-[240px] p-4">
          {accounts.map((account) => (
            <Link key={account.id} href={`/accounts/${account.id}`}>
              {account.name}
            </Link>
          ))}
        </div>

        {children}
      </body>
    </html>
  );
}
