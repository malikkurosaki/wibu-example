"use client";
// file src/app/page/scroll-bottom/page.tsx
import { Stack } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBottom, setIsbottom] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
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

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Stack p={"md"}>
      <h3>{isBottom ? "aduh ... ! mentok" : "scroll lagi ..."}</h3>
      <div
        ref={containerRef}
        style={{
          height: "400px",
          overflowY: "scroll",
          border: "1px solid black"
        }}
      >
        <Stack h={"1000px"} p={"md"} >
          <h1>Scroll down to the bottom of this container</h1>
          <MarkdownPreview source={textMarkdown()} />
        </Stack>
      </div>
    </Stack>
  );
}

function textMarkdown() {
  return `
\`\`\`tsx
"use client";
import { Stack } from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isBottom, setIsbottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
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

    const container = containerRef.current;
    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Stack p={"md"}>
      <h3>{isBottom ? "aduh ... ! mentok" : "scroll lagi ..."}</h3>
      <div
        ref={containerRef}
        style={{
          height: "400px",
          overflowY: "scroll",
          border: "1px solid black"
        }}
      >
        <Stack h={"1000px"} p={"md"} >
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
