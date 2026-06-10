"use server";

import { serverFetch } from "@/lib/server-fetch";

export const createPayment = async (amount: number, jobId: string) => {
  try {
    const res = await serverFetch.post("/payment/create-payment-intent", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount, jobId }),
    });
    return res.json();
  } catch (error) {
    console.log(error, "error in creating payment");
  }
};
