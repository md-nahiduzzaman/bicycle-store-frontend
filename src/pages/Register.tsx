import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const Register = () => {
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
              <p className="mb-2 text-2xl font-bold">Shadcnblocks.com</p>
              <p className="text-muted-foreground">
                Please enter your details.
              </p>
            </div>
            <div>
              <div className="grid gap-4">
                <Input type="email" placeholder="Enter your email" required />
                <div>
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      className="border-muted-foreground"
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password
                  </a>
                </div>
                <Button type="submit" className="w-full mt-2">
                  Register
                </Button>
                <Button variant="outline" className="w-full">
                  <FcGoogle className="mr-2 size-5" />
                  Sign up with Google
                </Button>
              </div>
              <div className="flex justify-center gap-1 mx-auto mt-8 text-sm text-muted-foreground">
                <p>Don&apos;t have an account?</p>
                <a href="#" className="text-primary hover:underline">
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
