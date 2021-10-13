import { World } from '@cucumber/cucumber';

declare module '@cucumber/cucumber' {
  interface World {
    // vs-code shows an error, call of cucumber-js not
    // Subsequent property declarations must have the same type.
    // Property 'parameters' must be of type 'any', but here has type '{ server: { string: number; port: number; }; }'
    readonly parameters: {
      server: { string: number; port: number };
    };
    server: string;
    servers?: string[];
  }
}

export { World as Context };
