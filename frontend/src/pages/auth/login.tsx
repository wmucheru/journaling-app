import Image from "next/image";
import { useRouter } from "next/router";
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useCookies } from "react-cookie";

import StatusMessage from "@/components/StatusMessage";

import { APP_LOGO, APP_NAME } from "@/utils/constants";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { loginUser, resetUser } from "@/redux/slices/user";

/**
 *
 * Login Page
 *
 */
const Login: FC = () => {
  const dispatch = useAppDispatch();

  const { user, userStatus } = useAppSelector((state: any) => state.users);

  const [form, setForm] = useState<object>({});

  const [cookies, setCookie] = useCookies(["token"]);

  const router = useRouter();

  const redirect = () => {
    dispatch(resetUser({}));
    router.push("/admin/dashboard");
  };

  /**
   *
   * Handle login response
   *
   */
  useEffect(() => {
    if (user?.token) {
      setCookie("token", user?.token);
      redirect();
    }

    if (cookies?.token) {
      dispatch(resetUser({}));
      redirect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.token]);

  /**
   *
   * Handle input change
   *
   */
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prevForm: object) => {
      return { ...prevForm, [name]: value };
    });
  };

  /**
   *
   * Process login
   *
   */
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <div
        className="flex gap-12 w-full max-w-2xl m-auto p-8 bg-white border 
          border-gray-200 rounded-md shadow-lg"
      >
        <div className="flex justify-center items-center">
          <Image
            src={`/img/${APP_LOGO}`}
            alt={APP_NAME || ""}
            width={240}
            height={50}
            className="max-h-[3rem] w-auto"
          />
        </div>

        <div className="flex flex-col gap-4 grow">
          <h1>Login</h1>

          <StatusMessage status={userStatus} />

          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email Address"
              required={true}
              onChange={onChange}
            />

            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              required={true}
              onChange={onChange}
            />

            <button className="btn btn-lg btn-primary">Log In</button>
          </form>
          <hr className="mt-4" />
          <div>
            Don&apos;t have an account?&nbsp;
            <Link href="/auth/register">Register Here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
