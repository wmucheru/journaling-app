import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, FC, FormEvent, useState } from "react";

import { APP_LOGO, APP_NAME } from "@/utils/constants";

const Register: FC = () => {
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

    // TODO: Process registration and redirect to login
    router.push("/admin/login");
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
          <h1>Register</h1>
          <p className="text-sm text-blue-400">
            Fill in the form to create your account
          </p>

          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <input
              type="text"
              name="text"
              className="form-control"
              placeholder="Full Name"
              required={true}
              onChange={onChange}
            />

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

            <button className="btn btn-lg btn-primary w-full">Register</button>
          </form>
          <hr />
          <p>
            Already have an account?&nbsp;
            <Link href="/auth/login">Login Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
