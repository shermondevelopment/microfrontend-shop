import type { Config } from "tailwindcss";

const sharedConfig = {
  theme: {
    extend: {
      colors: {
        text: {
          primary: "#000000",
          hover: "#0B6434",
          secondary: "#6B7280",
          muted: "#9CA3AF",
        },
        background: {
          tinted: "rgba(103, 154, 127, 0.33)",
          primary: "#C6EAD7",
        },
      },
    },
  },
  plugins: [],
} satisfies Omit<Config, "content">;

export default sharedConfig;
