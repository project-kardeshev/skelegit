import { Effect } from 'effect';

interface InitOptions {
  template: string;
}

export async function initCommand(options: InitOptions) {
  console.log(`Initializing Skelegit project with template: ${options.template}`);
  
  // Basic project initialization logic
  const effect = Effect.sync(() => {
    // TODO: Implement project initialization
    return `Project initialized with ${options.template} template`;
  });

  try {
    const result = await Effect.runPromise(effect);
    console.log(result);
  } catch (error) {
    console.error('Failed to initialize project:', error);
    (globalThis as any).process.exit(1);
  }
}
