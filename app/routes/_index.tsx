import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/react";
import { Form, useLoaderData } from "@remix-run/react";
import { getScannables, createScannable } from "~/database/queries/scannables";

export const loader = async ({ 
  params, }: LoaderFunctionArgs) => {
  const scannables = await getScannables();
  return json({ scannables });
}

import type { ActionFunctionArgs } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = new URLSearchParams(await request.text());
  const scannable_id = body.get("scannable_id") ?? null;
  const category = body.get("category");
  const name = body.get("name");
  const action = body.get("action");

  await createScannable(scannable_id as string, category as string, name as string, action as string);
  
  return json({ success: true });
}

export default function Index() {
  const { scannables } = useLoaderData<typeof loader>();
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to Astro UI
          </h1>
        </header>
        <nav className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            Scannables
          </p>
          <ul>
            {scannables.map(({ id, scannable_id, category, name, action }) => (
              <li key={id} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <p className="text-gray-700 dark:text-gray-200">{scannable_id}</p>
                  <p className="text-gray-700 dark:text-gray-200">{category}</p>
                  <p className="text-gray-700 dark:text-gray-200">{name}</p>
                  <p className="text-gray-700 dark:text-gray-200">{action}</p>
                </div>
              </li>
            ))}
          </ul>
          
          <p className="leading-6 text-gray-700 dark:text-gray-200">
            New Scannable
          </p>
          <Form method="post">
            <div className="form_field">
              <label htmlFor="scannable_id" className="label">Scannable ID</label>
              <input
                type="text"
                name="scannable_id"
                placeholder="Scannable ID"
                required
                className="input"
              />
            </div>
            <div className="form_field">
              <label htmlFor="category" className="label">Category</label>
              <input
                type="text"
                name="category"
                placeholder="Category"
                required
                className="input"
              />
            </div>
            <div className="form_field">
              <label htmlFor="name" className="label">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                className="input"
              />
            </div>
            <div className="form_field">
              <label htmlFor="action" className="label">Action</label>
              <input
                type="text"
                name="action"
                placeholder="Action"
                required
                className="input"
              />
            </div>
            <div>
              <button type="submit" className="btn">
                Create
              </button>
            </div>
          </Form>
        </nav>
      </div>
    </div>
  );
}
