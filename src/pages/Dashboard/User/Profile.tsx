/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useChangePasswordMutation } from "@/redux/features/auth/auth";

// Validation Schema for password reset
const passwordResetSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Current password must be at least 6 characters."),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters."),
    confirmPassword: z
      .string()
      .min(6, "Confirmation password must be at least 6 characters."),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const ProfilePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser);
  const [changePassword] = useChangePasswordMutation();

  // Form handling for password reset
  const form = useForm<z.infer<typeof passwordResetSchema>>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Handle password reset form submission
  const onSubmit = async (data: z.infer<typeof passwordResetSchema>) => {
    try {
      const result = await changePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      }).unwrap();
      console.log(result);
      toast.success("Password reset successful!");
      setIsDialogOpen(false);
      form.reset();
    } catch (error: any) {
      toast.error(
        error.message || "Failed to reset password. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen text-center ">
      <div>
        <h2 className="text-2xl font-bold">Profile</h2>
        <p>Your profile details will be displayed here.</p>
        <div className="mt-4">
          <p>
            <strong>Name:</strong> {user?.name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {user?.email || "N/A"}
          </p>
        </div>

        {/* Reset Password Button */}
        <Button onClick={() => setIsDialogOpen(true)} className="mt-4">
          Reset Password
        </Button>

        {/* Password Reset Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild />
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Reset Your Password</DialogTitle>
              <DialogDescription>
                Enter your current password and set a new one.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Current Password */}
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter current password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* New Password */}
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm New Password */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <DialogFooter>
                  <Button type="submit" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfilePage;
