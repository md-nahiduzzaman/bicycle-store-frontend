import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Link } from "react-router-dom";

import { useRegisterMutation } from "@/redux/features/auth/auth";
import { toast } from "sonner";
import { useEffect } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { useLocation, useNavigate } from "react-router";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters long.",
  }),
});

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  console.log({ location });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [register, { isLoading, isSuccess, data, isError, error }] =
    useRegisterMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await register(values);
  }

  const toastId = "register";
  useEffect(() => {
    if (isLoading) toast.loading("Processing ...", { id: toastId });

    if (isSuccess) {
      const token = data?.data;
      const user = {
        name: form.getValues("name"),
        email: form.getValues("email"),
      };
      dispatch(setUser({ user, token }));
      toast.success(data?.message, { id: toastId });
      navigate("/", { replace: true });
    }

    if (isError) toast.error(JSON.stringify(error), { id: toastId });
  }, [data, dispatch, error, isError, isLoading, isSuccess, navigate, form]);

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
              <p className="text-muted-foreground">Please register.</p>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormDescription>Enter your full name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Your email" {...field} />
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
                        <Input
                          type="password"
                          placeholder="Your password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Enter your secure password.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full mt-2">
                  Register
                </Button>
                <div className="mt-4 text-sm text-center">
                  Already have an account? <Link to="/login">Login</Link>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

// const Register = () => {
//   return (
//     <section className="py-32">
//       <div className="container">
//         <div className="flex flex-col gap-4">
//           <div className="w-full max-w-sm p-6 mx-auto rounded-md shadow">
//             <div className="flex flex-col items-center mb-6">
//               <a href="https://shadcnblocks.com">
//                 <img
//                   src="https://shadcnblocks.com/images/block/block-1.svg"
//                   alt="logo"
//                   className="w-auto h-10 mb-7"
//                 />
//               </a>
//               <p className="mb-2 text-2xl font-bold font-heading">Spinzo</p>
//               <p className="text-muted-foreground">
//                 Please enter your details.
//               </p>
//             </div>
//             <div>
//               <div className="grid gap-4">
//                 <Input type="email" placeholder="Enter your email" required />
//                 <div>
//                   <Input
//                     type="password"
//                     placeholder="Enter your password"
//                     required
//                   />
//                 </div>

//                 <Button type="submit" className="w-full mt-2">
//                   Register
//                 </Button>
//               </div>
//               <div className="flex justify-center gap-1 mx-auto mt-8 text-sm text-muted-foreground">
//                 <p>Already have an account?</p>
//                 <Link to={`/login`} className="text-primary hover:underline">
//                   Login
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Register;
