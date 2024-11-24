"use client";

import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    async function loadSoragedData() {
      const storagedToken = localStorage.getItem("@RNauth:token");

      if (storagedToken) {
        api.defaults.headers.common.Authorization = `Bearer ${storagedToken}`;
        router.push("/project-dashboard");
      } else {
        router.push("/login");
      }
    }

    loadSoragedData();
  }, []);

  return <></>;
}
