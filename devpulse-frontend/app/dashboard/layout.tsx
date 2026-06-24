"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { SWRConfig } from "swr";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { getApiKey } from "@/lib/auth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!getApiKey() && pathname !== "/dashboard/settings") {
      router.replace("/login");
    } else {
      setReady(true);
    }
  }, [pathname, router]);

  if (!ready && pathname !== "/dashboard/settings") {
    return <main className="grid min-h-screen place-items-center bg-bg text-sm text-text-2">Checking API key...</main>;
  }

  return (
    <SWRConfig value={{ shouldRetryOnError: false }}>
      <div className="min-h-screen bg-bg">
        <Sidebar />
        <div className="md:pl-[220px]">
          <Topbar />
          <main className="mx-auto grid max-w-7xl grid-cols-12 gap-4 px-4 py-6 md:px-8">{children}</main>
        </div>
      </div>
    </SWRConfig>
  );
}
