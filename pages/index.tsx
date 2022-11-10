import Link from "next/link";

const Home = () => {
  return (
    <div className="flex flex-col">
      <div className="space-x-2 flex justify-end">
        <Link className="bg-blue-100 p-2 rounded-xl" href="/login">
          Login
        </Link>
        <Link className="bg-blue-300 p-2 rounded-xl" href="/sign-up">
          SignUp
        </Link>
      </div>
      <p className="text-4xl flex justify-center">Task Manager App</p>
    </div>
  );
};

export default Home;
