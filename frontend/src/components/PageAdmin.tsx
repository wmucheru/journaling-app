import Link from "next/link";
import React, { FC, ReactNode } from "react";
import { MdDashboard } from "react-icons/md";
import { FaRegNoteSticky, FaUser } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/router";

import Page from "@/components/Page";

import { APP_LOGO, APP_NAME } from "@/utils/constants";

interface Props {
  title?: string;
  children?: ReactNode;
}

/**
 *
 * Admin Page template
 *
 */
const PageAdmin: FC<Props> = ({ title = APP_NAME, children }) => {
  const router = useRouter();

  return (
    <Page title={title}>
      <div className="flex flex-col w-full">
        <nav className="block">
          <div className="container flex !flex-row justify-between gap-2">
            <div className="flex gap-6">
              <Link href="/admin/dashboard" className="flex p-0">
                <Image
                  src={`/img/${APP_LOGO}`}
                  alt={title || ""}
                  width={200}
                  height={40}
                  className="max-h-[2rem] w-auto"
                />
              </Link>

              <Link href="/admin/dashboard">
                <MdDashboard /> Dashboard
              </Link>

              <Link href="/admin/journal">
                <FaRegNoteSticky /> Journal
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <FaUser className="text-gray-700" style={{ fontSize: "12px" }} />
              {/* TODO: Set actual user name */}
              <span>William</span>
              <span>&middot;</span>

              {/* TODO: Implement logout */}
              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => router.push("/auth/login")}
              >
                Logout
              </span>
            </div>
          </div>
        </nav>

        <div className="flex flex-col w-full p-4">
          <div className="container">
            <h1 className="mb-4">{title}</h1>

            <div className="flex flex-col w-full">{children}</div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default PageAdmin;
