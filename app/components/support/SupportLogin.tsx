"use client";

import { FcEngineering } from "react-icons/fc";

import { useEffect, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

import Link from "next/link";
import { AiOutlineGooglePlus } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { SafeUser } from "@/types";
import Heading from "../Heading";
import Button from "../Button";
import Input from "../input/Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SupportSignUp from "./SupportSignUp";

interface SupportLoginProps {
  currentUser: SafeUser | null;
}

const SupportLogin: React.FC<SupportLoginProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, [currentUser, router]);

  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        router.replace("/cart");
        router.refresh();
        toast.success("Logged In");
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  if (currentUser) {
    return (
      <p
        className="text-center shadow-xs
      shadow-slate-400 font-semibold"
      >
        Logged In. Redirecting...
      </p>
    );
  }

  return (
    <div className="space-y-4 w-full">
      {" "}
      {/* Add a container with spacing */}
      <div className="flex gap-4 items-center justify-center">
        {" "}
        {/* Add spacing to the heading and icon */}
        <Heading title="Sign In to Nova" />
        <FcEngineering size={24} className="mt-2" />
      </div>
      <Button
        google
        icon={AiOutlineGooglePlus}
        label="Sign In with Google"
        onClick={() => {
          signIn("google");
        }}
      />
      <hr className="bg-orange-300 w-full h-px" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? "Loading" : "Login"}
        onClick={handleSubmit(onsubmit)}
      />
      <p className="text-sm">
        Do Not Have an Acccount?{" "}
        <Link href="">
          <Dialog>
            <DialogTrigger className="underline text-orange-500">
              Sign Up
            </DialogTrigger>
            <DialogContent className="bg-white">
              <SupportSignUp currentUser={currentUser} />
            </DialogContent>
          </Dialog>
        </Link>
      </p>
    </div>
  );
};

export default SupportLogin;

//
