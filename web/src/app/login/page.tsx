import LogoScreen from "@/components/LogoScreen";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex flex-row w-screen h-screen">
      <LogoScreen />
      <LoginForm />
    </div>
  );
}
