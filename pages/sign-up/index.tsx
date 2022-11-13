import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMutation } from "react-query";

import { saveDataInCookies } from "../../utils/helpers";
import { TASK_MANAGER_ENDPOINT } from "../../utils/constants";

const SignUp = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const mutation = useMutation(
    async (variables: { name: string; email: string; password: string }) => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        name,
        email,
        password,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      try {
        const res = await fetch(
          `${TASK_MANAGER_ENDPOINT}users`,
          requestOptions
        );
        const decodedRes = await res.json();
        saveDataInCookies("auth_for_task_manager", decodedRes.token);
        router.push("/todo");
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  );

  return (
    <div className="flex flex-col justify-center h-full w-full items-center">
      <p className="text-3xl">Sign Up</p>
      <div className="flex flex-col space-y-4 my-2 w-10/12 sm:w-6/12 lg:w-4/12">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="focus:outline-none border-slate-300 border-2 rounded-lg p-2"
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="focus:outline-none border-slate-300 border-2 rounded-lg p-2"
        />
        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="focus:outline-none border-slate-300 border-2 rounded-lg p-2"
        />
        <button
          className={`p-2 rounded-xl text-white hover:shadow-xl ${
            mutation.isLoading ? "bg-blue-200" : "bg-blue-600"
          }`}
          disabled={mutation.isLoading}
          onClick={() => {
            mutation.mutate({
              name,
              email,
              password,
            });
          }}
        >
          Register
        </button>
      </div>
      <Link className="text-blue-600" href="/login">
        Login
      </Link>
    </div>
  );
};

export default SignUp;
