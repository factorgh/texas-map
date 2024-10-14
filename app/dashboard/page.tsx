"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { mapSchema } from "@/schemas";

import { useForm } from "react-hook-form";
import LayoutWrapper from "@/components/common/layout_warpper";
import Sidebar from "./(components)/sidebar";
import DrillForm from "./(components)/drill_form";
import { addDrill } from "@/lib/actions/drills.actions";
import { useRouter } from "next/navigation";
import { drillData } from "@/shared/interface/drill_interface";

type Props = {};

const Dashboard = (props: Props) => {
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

  // Add router
  const router = useRouter();

  // Handle form submit
  const onSubmit = async (dat: drillData) => {
    try {
      console.log(dat);
      // Create drill
      await addDrill({
        title: dat.title,
        lng: dat.lng,
        lat: dat.lat,
        description: dat.description,
        category: dat.category,
        path: "/dashboard/alldrills",
      });

      // Redirect
      router.push("/dashboard/alldrills");
    } catch (error) {
      console.error("Error adding drill:", error);
    }
  };

  return (
    <div className="flex gap-5 w-full h-screen  mt-16">
      <DrillForm form={form} onSubmit={onSubmit} />
    </div>
  );
};

export default Dashboard;
