interface BuildOptions {
  output: string;
}

export async function buildCommand(options: BuildOptions) {
  console.log(`Building project to ${options.output}`);
  // TODO: Implement build logic
}
