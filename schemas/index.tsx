import { z } from "zod";

export const mapSchema = z.object({
  title: z.string().min(2, {
    message: "Latitude must not be less than 2 characters",
  }),
  category: z.string(),

  lat: z.string().min(2, {
    message: "Latitude must not be less than 2 characters",
  }),
  lng: z.string().min(2, {
    message: "Longitude must not be less than 2 characters",
  }),
  description: z.string().min(2, {
    message: "Description must not be less than 10 characters",
  }),
});
