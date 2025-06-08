import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "../provider/toast.provider";
import { LoaderCircle } from "lucide-react";
import { Login } from "../actions/auth.action";
import { Link } from "react-router-dom";
type LoginInput = {
  email: string;
  password: string;
};
export default function LoginForm() {
  const { showToast } = useToast();
  const LoginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    try {
      const { token, message } = await Login(data.email, data.password);
      localStorage.setItem("AccessToken", token);
      showToast(message, "success");
      window.location.href = "/";
    } catch (err: any) {
      const message = (err.message as string) || "Error happended while login";
      showToast(message, "error");
    }
  };

  return (
    <>
      <div className="flex gap-4 items-center flex-col">
        <h2 className="text-2xl font-bold">Login</h2>
        <p>Login into your Local Library Account</p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-80">
          <label
            className={`input validator ${
              errors.email ? "border-red-600" : ""
            }`}
          >
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              {...register("email")}
              type="email"
              placeholder="mail@site.com"
            />
          </label>
          <label
            className={`input validator ${
              errors.password ? "border-red-600" : ""
            }`}
          >
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </label>

          <button
            className={`btn btn-neutral w-80 disabled:opacity-50`}
            disabled={isLoading || isSubmitting}
          >
            {isLoading || isSubmitting ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <>Submit</>
            )}
          </button>
        </form>
        <p>
          Don't have an account!
          <Link to="/signup" className="text-blue-700">
            {" "}
            Create Here
          </Link>
        </p>
      </div>
    </>
  );
}
