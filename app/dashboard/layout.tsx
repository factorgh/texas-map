"use client";

import React, { PropsWithChildren, ReactNode } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { mapSchema } from "@/schemas";

// Shadcn imports
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import LayoutWrapper from "@/components/common/layout_warpper";
import Sidebar from "./(components)/sidebar";
import DrillForm from "./(components)/drill_form";

// Handle form submit
const onSubmit = (dat: any) => {
  console.log(dat);
};

const Dashboard = ({ children }: PropsWithChildren) => {
  const form = useForm<z.infer<typeof mapSchema>>({
    resolver: zodResolver(mapSchema),
    defaultValues: {
      lat: "",
      lng: "",
      description: "",
      title: "",
      category: "",
    },
  });

  return (
    <div className="flex gap-5 w-full h-screen ">
      <div className="text-white">
        <Sidebar />
      </div>
      <div className="w-full max-w-4xl">{children}</div>
    </div>
  );
};

export default Dashboard;
