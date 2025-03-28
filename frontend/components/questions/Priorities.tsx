"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Thanks from "./Thanks";
import { useDispatch  } from "react-redux";
import login from "@/redux/auth/actions";
import { useAuth } from "@clerk/nextjs";
import { usePrivateInstance } from "@/helpers/axios";
interface PrioritiesProps {
  role: string;
  setStep: (step: number) => void;
  step: number;
  setOpen:(open:boolean) => void;
  open:boolean;
}

const Priorities: React.FC<PrioritiesProps> = ({ role, setStep, step,setOpen,open }) => {
  const { getToken } = useAuth();
  const privateInstance = usePrivateInstance();
  console.log(getToken)
  const dispatch = useDispatch()

  const nextHandler = async() => {
    try{
  
        await login({ role }, dispatch,privateInstance);
    if (step === 2) {
      setStep(3);
      setOpen(false)
    } }catch(err){
      throw err;
    }
  };

  return (
    <>
      {step === 3 ? (
        <Thanks step={step} />
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[450px] p-6">
            {role === "jobseeker" && (
              <div className="mt-6">
                <h3 className="font-semibold text-lg">Job Seeker Priorities</h3>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="preferredJob" className="text-gray-800 text-md">
                    Preferred Job Title
                  </Label>
                  <Input type="text" id="preferredJob" placeholder="e.g., Software Developer" />

                  <Label htmlFor="location" className="text-gray-800 text-md">
                    Preferred Location
                  </Label>
                  <Input type="text" id="location" placeholder="e.g., Remote, San Francisco" />
                </div>
              </div>
            )}

            {role === "employer" && (
              <div className="mt-6">
                <h3 className="font-semibold text-lg">Employer Priorities</h3>
                <div className="flex flex-col gap-3">
                  <Label htmlFor="companyName" className="text-gray-800 text-md">
                    Company Name
                  </Label>
                  <Input type="text" id="companyName" placeholder="e.g., Tech Corp" />

                  <Label htmlFor="jobTitle" className="text-gray-800 text-md">
                    Job Title to Hire For
                  </Label>
                  <Input type="text" id="jobTitle" placeholder="e.g., Full-stack Developer" />
                </div>
              </div>
            )}

            <DialogFooter className="mt-4">
              <Button onClick={nextHandler} type="button">Next</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Priorities;
