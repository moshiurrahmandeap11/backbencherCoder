import { Suspense } from "react";
import Login from "./LoginPage/Login";


export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-white">Loading...</div>}>
      <Login />
    </Suspense>
  );
}
