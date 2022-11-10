import { useState } from "react";
import Link from "next/link";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="focus:outline-none border-slate-300 border-2 rounded-lg p-2"
        />
        <button className="bg-blue-600 p-2 rounded-xl text-white hover:shadow-xl">
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
