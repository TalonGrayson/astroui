import type { LoaderFunctionArgs } from "@remix-run/node";
import { createScannable } from "~/database/queries/scannables";

export const action = async ({ request }: LoaderFunctionArgs) => {
    const body = await request.json();

    const scannable_id = body?.scannable_id as number;
    const category = body?.category as string;
    const name = body?.name as string;
    const action = body?.action as string;

    const scannable = await createScannable(scannable_id, category, name, action);
    
    return new Response(JSON.stringify({ success: true, scannable }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
  }