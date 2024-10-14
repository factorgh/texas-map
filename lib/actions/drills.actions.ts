"use server";

import { revalidatePath } from "next/cache";
import { connectToDB } from "../db_connect/db";
import Drill from "../models/drill.model";

export interface drillServer {
  title: string;
  description: string;
  lng: number;
  lat: number;
  category: string;
  path: string;
}

export const addDrill = async ({
  title,
  lng,
  lat,
  description,
  category,
  path,
}: drillServer): Promise<void> => {
  console.log(title, lng, lat, description, category, path);

  // Connect to db
  await connectToDB(); // Ensure you're awaiting the connection

  // Save drill
  const newDrill = await Drill.create({
    title,
    lng,
    lat,
    description,
    category,
  });

  console.log(newDrill);
  revalidatePath(path);
};
