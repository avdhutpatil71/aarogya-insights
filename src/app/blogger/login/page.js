import { Suspense } from "react";
import BloggerLoginClient from "./BloggerLoginClient";

export default function BloggerLoginPage() {
  return (
    <Suspense fallback={<div></div>}>
      <BloggerLoginClient />
    </Suspense>
  );
}
