import { useLocation } from "react-router";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

export function UserAuthFeature() {
  const location = useLocation();
  const isSignup = location.pathname === "/signup";

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12">
      {isSignup ? <SignupForm /> : <LoginForm />}
    </div>
  );
}
