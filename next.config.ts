import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@nqb8limited/odel-fe-design-system",
    "@odel/design-system",
  ],
  turbopack: {
    // Widen Turbopack's project root so it can follow the file: symlink for
    // @nqb8limited/odel-fe-design-system (which lives in a sibling directory).
    // Remove once the package is a real npm dependency.
    root: path.join(__dirname, ".."),
    resolveAlias: {
      // With root widened to the parent dir, bare-specifier CSS imports like
      // `@import "tw-animate-css"` are resolved relative to that root and
      // miss the local node_modules. Pin them to the absolute install path.
      "tw-animate-css": path.join(__dirname, "node_modules/tw-animate-css/dist/tw-animate.css"),
      "shadcn/tailwind.css": path.join(__dirname, "node_modules/shadcn/dist/tailwind.css"),
    },
  },
};

export default nextConfig;
