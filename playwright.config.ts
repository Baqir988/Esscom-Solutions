import { defineConfig } from "@playwright/test";
const port = process.env.PLAYWRIGHT_PORT || "3101";
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  workers: 2,
  timeout: 30000,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL: `http://127.0.0.1:${port}`, trace: "retain-on-failure", screenshot: "only-on-failure" },
  projects: [
    { name: "chrome", use: { browserName: "chromium", channel: "chrome" } },
    { name: "webkit", use: { browserName: "webkit" } },
  ],
  webServer: { command: "node node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port " + port, env: { PORT: port }, url: `http://127.0.0.1:${port}`, reuseExistingServer: false },
});
