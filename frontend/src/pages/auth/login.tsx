import Image from "next/image";
import { useRouter } from "next/router";
import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import Link from "next/link";

import { APP_LOGO, APP_NAME } from "@/utils/constants";

/**
 *
 * Login Page
 *
 */
const Login: FC = () => {
  const [form, setForm] = useState<object>({});

  const router = useRouter();

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

    console.log(form);

    // TODO: Process login and redirect to dashboard

    router.push("/admin/dashboard");
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

        <div className="flex flex-col gap-8 grow">
          <h1>Login</h1>
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
          <hr />
          <p>
            Don&apos;t have an account?&nbsp;
            <Link href="/auth/register">Register Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
