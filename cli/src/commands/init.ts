import { Effect } from 'effect';
import { render } from 'ink';
import React from 'react';

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
    process.exit(1);
  }
}
