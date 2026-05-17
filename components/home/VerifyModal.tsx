"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { verifyUser } from "@/app/services/auth/auth";

type VerifyModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const VerifyModal = ({ open, setOpen }: VerifyModalProps) => {
  const [verifyCode, setVerifyCode] = useState("");

  const handleVerify = async () => {
    try {
      let ans = await verifyUser(verifyCode)

      if (ans === true) {
        toast.success("Verification successful");
        setOpen(false);
      }else{
        toast.error("Verification failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Verification failed");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-[#161614] text-white">
        <DialogHeader>
          <DialogTitle>Verify Account</DialogTitle>

          <DialogDescription className="text-gray-400">
            Enter your verify number for verification.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Verify Code Number</Label>

            <Input
              placeholder="+8801XXXXXXXXX"
              value={verifyCode}
              onChange={(e) => setVerifyCode(e.target.value)}
              className="rounded-sm"
            />
          </div>
        </div>

        <DialogFooter className="space-x-2 bg-transparent border-0">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="text-black rounded-sm"
          >
            Cancel
          </Button>

          <Button onClick={handleVerify} className="rounded-sm">
            Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerifyModal;