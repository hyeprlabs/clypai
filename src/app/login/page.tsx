import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div
      className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10"
      style={{
        backgroundImage: 'url(/background-auth.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}