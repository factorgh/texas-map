"use server";

import mockDrillData from "@/api/data";

export async function GET() {
  return new Response(JSON.stringify(mockDrillData), {
    status: 200,
  });
}
