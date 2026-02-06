import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    config.resolve.alias = {
      ...config.resolve.alias,
      "#site": path.resolve(process.cwd(), ".velite"),
    };
    return config;
  },
};

class VeliteWebpackPlugin {
  static started = false;
  apply(compiler: any) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options.mode === "development";
      const { build } = await import("velite");
      await build({ watch: dev, clean: !dev });
    });
  }
}

export default nextConfig;
