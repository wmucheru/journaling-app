import { useRouter } from "next/router";
import React, { FC } from "react";

const Login: FC = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col">
      <h1>Login</h1>
      <button
        className="btn btn-lg btn-primary"
        onClick={() => router.push("/admin/dashboard")}
      >
        Log In
      </button>
    </div>
  );
};

export default Login;
