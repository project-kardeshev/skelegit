interface DevOptions {
  port: string;
}

export async function devCommand(options: DevOptions) {
  console.log(`Starting development server on port ${options.port}`);
  // TODO: Implement development server
}
