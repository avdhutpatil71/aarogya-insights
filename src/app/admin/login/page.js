import { Suspense } from "react";
import AdminLoginClient from "./AdminLoginClient";

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <AdminLoginClient />
    </Suspense>
  );
}
