"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
 import { Label } from "@/components/ui/label";
import Priorities from "./Priorities";
import Thanks from "./Thanks";

const Role = () => {
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(1);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };

  const addModalHandler = () => {
    
    if (step === 1) {
      setStep(2);
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[450px] p-6">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              What is your role?
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <input
                onChange={inputChangeHandler}
                type="radio"
                name="role"
                checked={role === "jobseeker"}
                value="jobseeker"
                id="job-seeker"
                className="w-5 h-5"
              />
              <Label htmlFor="job-seeker" className="text-gray-800 text-md">
                Job Seeker
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <input
                onChange={inputChangeHandler}
                type="radio"
                name="role"
                checked={role === "employer"}
                value="employer"
                id="employer"
                className="w-5 h-5"
              />
              <Label htmlFor="employer" className="text-gray-800 text-md">
                Employer
              </Label>
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button type="button" onClick={addModalHandler}>
              Next
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {step === 2 && <Priorities role={role} setStep={setStep} step={step} setOpen={setOpen} open={open} />}
      {step === 3 && <Thanks step={step} />}
    </>
  );
};

export default Role;
