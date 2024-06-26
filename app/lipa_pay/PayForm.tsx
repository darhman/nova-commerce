"use client";

import Heading from "../components/Heading";
import ButtonMpesa from "../components/ButtonMpesa";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { FormatPrice } from "@/utils/FormatPrice";
import { MdArrowBack } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
import Input_Mpesa from "../components/input/input_mpesa";

interface PayFormProps {}

interface FormData {
  phone: string;
  amount: number;
  // Define other form data fields here as needed.
}

const PayForm: React.FC<PayFormProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { cartTotalAmount, cartProducts } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue, // Add setValue from useForm
  } = useForm<FormData>({
    // Using the FormData interface here for type safety
    defaultValues: {
      phone: "",
      amount: 0, // Initialize amount as 0 initially
    },
  });

  //set amount to cartTotalAmount
  useEffect(() => {
    if (cartTotalAmount) {
      setValue("amount", cartTotalAmount);
    }
  }, [cartTotalAmount, setValue]);

  // Retrieve cartTotalAmount from local storage when component mounts
  useEffect(() => {
    const savedAmount = localStorage.getItem("cartTotalAmount");
    if (savedAmount) {
      setValue("amount", parseFloat(savedAmount)); // Update the form value
    }
  }, [setValue, cartTotalAmount]);

  // Update cartTotalAmount in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartTotalAmount", String(cartTotalAmount));
  }, [cartTotalAmount]);

  //Use Effect to prevent cartTotalAmount from logging before its fetched
  useEffect(() => {
    if (cartTotalAmount) {
      console.log("Cart Total Amount:", cartTotalAmount);
    }
  }, [cartTotalAmount]); // Run effect when cartTotalAmount changes

  //Conditional Rendering of MPesa Form
  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <div className="border border-green-500 rounded-[15px] bg-white text-slate-600 p-2">
          <Image src="/mpesa.png" alt="Mpesa" width={200} height={200} />
        </div>
        <div className="text-2xl  font-semibold mt-4">
          No Payments Available!
        </div>
        <p className="text-slate-400 text-md font-normal mt-4">
          Browse our categories and discover our best deals! Add a product to
          cart to continue to checkout
        </p>
        <div className="border bg-green-500 px-3 py-2 rounded-md hover:bg-green-300 mt-5">
          <Link href={"/"} className="text-white flex items-center gap-1mt-2">
            <MdArrowBack size={30} />
            <span className="text-white">Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  const onsubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3001/api/stkpush", {
        phone: data.phone, // Ensure phone number is taken from form data
        amount: data.amount, // Ensure amount is taken from form data
      });
      if (response.data.status) {
        toast.success("Payment successful!");
      } else {
        toast.error(`Payment failed: ${response.data.msg}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Payment failed. Please check the console for more details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex gap-4 items-center justify-center">
        <Heading title="Pay with Mpesa" />
        <Image src="/mpesa.png" alt="Mpesa" width={200} height={200} />
      </div>
      <hr className="bg-green-300 w-full h-px" />
      <form className="space-y-4">
        <span className="text-slate-500 font-medium">2547XXXX5679</span>
        <Input_Mpesa
          id="phone"
          label="Enter Your Phone Number"
          type="text"
          inputMode="numeric"
          disabled={isLoading}
          register={register}
          errors={errors} // Pass the entire errors object
        />

        <div className="flex items-center gap-4 mt-10">
          <label className="font-bold text-green-500">Amount:</label>
          <span className="font-semibold text-md">
            {FormatPrice(cartTotalAmount)}
          </span>
        </div>
        {/* // In your form, update the ButtonMpesa component usage: */}
        <ButtonMpesa
          label={isLoading ? "Loading..." : "Pay"}
          onClick={handleSubmit(onsubmit)} // Ensure that onClick is setup like this
          disabled={isLoading || Object.keys(errors).length > 0}
        />
      </form>
    </div>
  );
};

export default PayForm;
