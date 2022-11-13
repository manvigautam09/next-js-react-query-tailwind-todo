import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

import { saveDataInCookies } from "../../utils/helpers";
import { TASK_MANAGER_ENDPOINT } from "../../utils/constants";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const mutation = useMutation(async (variables: { e: string; p: string }) => {
    const { e, p } = variables;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      email: e,
      password: p,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    try {
      const res = await fetch(
        `${TASK_MANAGER_ENDPOINT}users/login`,
        requestOptions
      );
      const decodedRes = await res.json();
      saveDataInCookies("auth_for_task_manager", decodedRes.token);
      router.push("/todo");
    } catch (error) {
      console.log("Error: ", error);
    }
  });

  return (
    <div className="flex flex-col justify-center h-full w-full items-center">
      <p className="text-3xl">Login</p>
      <div className="flex flex-col space-y-4 my-2 w-10/12 sm:w-6/12 lg:w-4/12">
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="focus:outline-none border-slate-300 border-2 rounded-lg p-2"
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="focus:outline-none border-slate-300 border-2 rounded-lg p-2"
        />
        <button
          className={`p-2 rounded-xl text-white hover:shadow-xl ${
            mutation.isLoading ? "bg-blue-200" : "bg-blue-600"
          }`}
          disabled={mutation.isLoading}
          onClick={() => mutation.mutate({ e: email, p: password })}
        >
          Login
        </button>
      </div>
      <Link className="text-blue-600" href="/sign-up">
        Register
      </Link>
    </div>
  );
};

export default Login;
