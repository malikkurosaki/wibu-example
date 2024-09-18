"use client";
// file src/app/page/scroll-bottom/page.tsx
import { Stack } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useHookstate } from "@hookstate/core";
import { currentScroll } from "@/lib/state/currentScroll";

export default function Page() {
  // const containerRef = useRef<HTMLDivElement>(null);
  const [isBottom, setIsbottom] = useState(false);
  const { value: containerRef } = useHookstate(currentScroll);
  

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef && containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const containerHeight = containerRef.current.clientHeight;
        const scrollHeight = containerRef.current.scrollHeight;

        if (scrollTop + containerHeight >= scrollHeight) {
          console.log("You've reached the bottom of the container!");
          setIsbottom(true);
        } else {
          setIsbottom(false);
        }
      }
    };

    const container = containerRef?.current;
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef]);

  return (
    <Stack p={"md"}>
      <h3>{isBottom ? "aduh ... ! mentok" : "scroll lagi ..."}</h3>
      <div>
        <Stack h={"1000px"} p={"md"}>
          <h1>Scroll down to the bottom of this container</h1>
          <MarkdownPreview source={textMarkdown()} />
        </Stack>
      </div>
    </Stack>
  );
}

function textMarkdown() {
  return `

currentScroll.tx
\`\`\`tsx
import { hookstate } from "@hookstate/core";
import { RefObject } from "react";

export const currentScroll = hookstate<RefObject<HTMLDivElement> | null>(null);

\`\`\`

layout.tsx

\`\`\`tsx
// Import styles of packages that you've installed.
import "@mantine/core/styles.css";
import "./globals.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import type { Metadata, Viewport } from "next";
import { ScrollProvider } from "@/lib/ui/ScrollProvider";

const APP_NAME = "WIBU EXAMPLE";
const APP_DEFAULT_TITLE = "wibu example";
const APP_TITLE_TEMPLATE = "%s - wibu";
const APP_DESCRIPTION = "kumpulan example";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  }
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark">
          <ScrollProvider>{children}</ScrollProvider>
        </MantineProvider>
      </body>
    </html>
  );
}

\`\`\`

ScrollProvider.tsx

\`\`\`tsx
"use client";

import { useHookstate } from "@hookstate/core";
import { useEffect, useRef } from "react";
import { currentScroll } from "../state/currentScroll";
import { Box } from "@mantine/core";

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { set } = useHookstate(currentScroll);

  useEffect(() => {
    if (window) {
      const handleScroll = () => {
        if (containerRef.current) {
          set(containerRef);
        }
      };

      const container = containerRef.current;
      container?.addEventListener("scroll", handleScroll);

      return () => {
        container?.removeEventListener("scroll", handleScroll);
      };
    }
  }, [containerRef, set]);
  return (
    <Box
      h={"100vh"}
      style={{ overflow: "auto", position: "relative" }}
      ref={containerRef}
    >
      {children}
    </Box>
  );
}

\`\`\`

scroll.tsx

\`\`\`tsx
"use client";
// file src/app/page/scroll-bottom/page.tsx
import { Stack } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useHookstate } from "@hookstate/core";
import { currentScroll } from "@/lib/state/currentScroll";

export default function Page() {
  // const containerRef = useRef<HTMLDivElement>(null);
  const [isBottom, setIsbottom] = useState(false);
  const { value: containerRef } = useHookstate(currentScroll);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef && containerRef.current) {
        const scrollTop = containerRef.current.scrollTop;
        const containerHeight = containerRef.current.clientHeight;
        const scrollHeight = containerRef.current.scrollHeight;

        if (scrollTop + containerHeight >= scrollHeight) {
          console.log("You've reached the bottom of the container!");
          setIsbottom(true);
        } else {
          setIsbottom(false);
        }
      }
    };

    const container = containerRef?.current;
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [containerRef]);

  return (
    <Stack p={"md"}>
      <h3>{isBottom ? "aduh ... ! mentok" : "scroll lagi ..."}</h3>
      <div
      >
        <Stack h={"1000px"} p={"md"}>
          <h1>Scroll down to the bottom of this container</h1>
          <MarkdownPreview source={textMarkdown()} />
        </Stack>
      </div>
    </Stack>
  );
}

\`\`\`


`;
}
