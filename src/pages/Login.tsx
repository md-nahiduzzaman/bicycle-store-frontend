import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import jwtDecode from "jwt-decode";
import { jwtDecode } from "jwt-decode";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useLoginMutation } from "@/redux/features/auth/auth";
import { toast } from "sonner";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { useLocation, useNavigate } from "react-router";

const formSchema = z.object({
  email: z.string().email({
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(5),
});

interface TUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.pathname || "/";

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "john@example3.com",
      password: "securepassword",
    },
  });

  const [login, { isLoading, isSuccess, data, isError, error }] =
    useLoginMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await login(values);
  }

  const toastId = "login";

  useEffect(() => {
    if (isLoading) {
      toast.loading("Processing ...", { id: toastId });
    }

    if (isSuccess) {
      const token = data?.data?.token;
      console.log("Received Token:", token);

      if (token) {
        try {
          const user = jwtDecode<TUser>(token);
          console.log("Decoded User:", user);

          dispatch(setUser({ user, token }));
          toast.success(data?.message || "Login successful!", { id: toastId });

          setTimeout(() => {
            navigate(from, { state: location.state?.state, replace: true });
          }, 1000);
        } catch (error) {
          console.error("JWT Decode Error:", error);
          toast.error("Failed to decode token.", { id: toastId });
        }
      } else {
        toast.error("Invalid token received.", { id: toastId });
      }
    }

    if (isError) {
      toast.error("Login failed.", { id: toastId });
    }
  }, [
    data,
    dispatch,
    error,
    from,
    isError,
    isLoading,
    isSuccess,
    location.state?.state,
    navigate,
  ]);

  return (
    <section className="py-32">
      <div className="container">
        <div className="flex flex-col gap-4">
          <div className="w-full max-w-sm p-6 mx-auto rounded-md shadow">
            <div className="flex flex-col items-center mb-6">
              <a href="https://shadcnblocks.com">
                <img
                  src="https://shadcnblocks.com/images/block/block-1.svg"
                  alt="logo"
                  className="w-auto h-10 mb-7"
                />
              </a>
              <p className="mb-2 text-2xl font-bold font-heading">Spinzo</p>
              <p className="text-muted-foreground">Please login.</p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email" {...field} />
                      </FormControl>
                      <FormDescription>Enter your valid email.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input placeholder="password" {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your secure password.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full mt-2">
                  Login
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
