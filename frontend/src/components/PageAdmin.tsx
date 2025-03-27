import Link from "next/link";
import React, { FC, ReactNode, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import { FaRegNoteSticky, FaUser } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/router";
// import { useCookies } from "react-cookie";

import Page from "@/components/Page";

import { APP_LOGO, APP_NAME } from "@/utils/constants";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getUserAccount } from "@/redux/slices/user";
import LocalStore from "@/utils/localStorage";

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
  const dispatch = useAppDispatch();

  const { account } = useAppSelector((state: any) => state.users);

  // const [cookies, removeCookie] = useCookies(["token"]);

  const router = useRouter();

  /**
   *
   * Redirect if not logged-in
   *
   */
  useEffect(() => {
    if (!LocalStore.get("token")) {
      router.push("/auth/login");
    } else {
      dispatch(getUserAccount({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    // removeCookie("token", "");
    LocalStore.remove("token");
    router.push("/auth/login");
  };

  return (
    <Page title={title}>
      <div className="flex flex-col min-h-screen w-full">
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
              <span>{account?.name}</span>
              <span>&middot;</span>

              <span
                className="text-blue-500 cursor-pointer"
                onClick={() => logout()}
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
