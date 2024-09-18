import { hookstate } from "@hookstate/core";
import { RefObject } from "react";

export const currentScroll = hookstate<RefObject<HTMLDivElement> | null>(null);
