"use client";

import { useHookstate } from "@hookstate/core";
import { useEffect, useRef } from "react";
import { currentScroll } from "../state/currentScroll";
import { Box } from "@mantine/core";

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { set } = useHookstate(currentScroll);

  useEffect(() => {
    let isMounted = true; // Menandakan apakah komponen masih mounted

    if (window && containerRef.current) {
      const handleScroll = () => {
        if (isMounted && containerRef.current) {
          set(containerRef); // Hanya update state jika masih mounted
        }
      };

      const container = containerRef.current;
      container.addEventListener("scroll", handleScroll);

      return () => {
        isMounted = false; // Ketika komponen di-unmount, set isMounted menjadi false
        container.removeEventListener("scroll", handleScroll);
      };
    }

    return () => {
      isMounted = false;
    };
  }, [containerRef, set]);
  return (
    <Box
      h={"100vh"}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 60px)", // Misalnya, jika ada header dengan tinggi 60px
        overflowY: "auto",
        position: "relative"
      }}
      ref={containerRef}
    >
      {children}
    </Box>
  );
}
