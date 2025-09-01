import { redirect } from "next/navigation";

export default function Root() {
  // Keep the canonical landing at /home to allow future splash pages
  redirect("/home");
}
