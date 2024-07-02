"use client";
import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import { store, persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
export default function RootLayout({ children, params }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    const verify = async () => {
      const res = await fetch("/api/verify-user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.status === 401 && pathname !== "/auth/signin") {
        window.location.href = "/auth/signin";
      }
      return res.json();
    };
    verify();
    setTimeout(() => setLoading(false), 1000);
  }, [pathname]);
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              {loading ? <Loader /> : children}
            </PersistGate>
          </Provider>
        </div>
      </body>
    </html>
  );
}
