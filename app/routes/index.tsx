// index loader loads instant redirect to /messages page

import { redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async () => {
  return redirect('/messages')
}

export default function Index() {
  return null;
}
