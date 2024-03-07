"use client";

import * as React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Error from "@/components/ui/error";
import { FcGoogle } from "react-icons/fc";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LogInFormInput } from "@/types";
import Section from "@/components/ui/section";
import SubmitButton from "@/components/ui/submit_button";

import { redirect } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useToastMessage from "@/components/hooks/use-toast-message";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "@/yup/login-validation-schema";

const Page = () => {
  const [setToasterMessage] = useToastMessage();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LogInFormInput>({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(loginValidationSchema),
  });

  const handleSubmitMutation = useMutation({
    mutationFn: async (formData: LogInFormInput) => {
      const status = await signIn("credentials", {
        ...formData,
        redirect: false,
      });

      return status;
    },
  });

  React.useEffect(() => {
    if (!handleSubmitMutation.data) return;
    if (handleSubmitMutation.error) return setToasterMessage({ error: "" });
    if (handleSubmitMutation.data.ok) return redirect("/dashboard");
  }, [handleSubmitMutation.data]);

  return (
    <Section className="h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-center text-foreground">
            Login Your Account
          </CardTitle>
          <CardDescription className="text-center">
            Use all Seo Tools from one place
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit((data) => handleSubmitMutation.mutate(data))}
          >
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  {...register("email")}
                />
                <Error position="right" message={errors.email?.message} />
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                />
                <Error position="right" message={errors.password?.message} />
              </div>

              <div className="flex justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {" "}
                    Remember Me
                  </label>
                </div>

                <Link href="/forget-password">
                  <small>Forget Password</small>
                </Link>
              </div>

              <SubmitButton
                isLoading={handleSubmitMutation.isPending}
                className="w-full relative"
              >
                Sign Up
              </SubmitButton>
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col justify-between ">
          <small className="flex items-center">
            Dont have account?
            <Link href="/register" prefetch={true}>
              <Button variant={`link`} className="p-0 h-0 ml-1 underline">
                Sign Up
              </Button>
            </Link>
          </small>
        </CardFooter>
      </Card>
    </Section>
  );
};

export default Page;
