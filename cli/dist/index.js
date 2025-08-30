#!/usr/bin/env node
import { Command as r } from "commander";
import { Effect as i } from "effect";
async function a(t) {
  console.log(`Initializing Skelegit project with template: ${t.template}`);
  const n = i.sync(() => `Project initialized with ${t.template} template`);
  try {
    const o = await i.runPromise(n);
    console.log(o);
  } catch (o) {
    console.error("Failed to initialize project:", o), globalThis.process.exit(1);
  }
}
async function c(t) {
  console.log(`Starting development server on port ${t.port}`);
}
async function l(t) {
  console.log(`Building project to ${t.output}`);
}
async function p(t) {
  console.log(`Deploying to ${t.target || "default target"}`);
}
const e = new r();
e.name("skelegit").description("CLI for Skelegit - Git interface toolkit").version("0.1.0");
e.command("init").description("Initialize a new Skelegit project").option("-t, --template <template>", "Project template", "basic").action(a);
e.command("dev").description("Start development server").option("-p, --port <port>", "Port number", "3000").action(c);
e.command("build").description("Build the project").option("-o, --output <dir>", "Output directory", "dist").action(l);
e.command("deploy").description("Deploy the project").option("-t, --target <target>", "Deployment target").action(p);
e.parse();
