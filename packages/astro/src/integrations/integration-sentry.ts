import { AstroConfig } from '../@types/astro.js';

export default async function (astro: { config: Readonly<AstroConfig>, assertDependency: (pkg: string, semver: string) => void, addRenderer: (mod: any | Promise<any>) => void}) {
  // EXAMPLE: Sentry Integration
  astro.assertDependency('@sentry/browser', '*');
  astro.assertDependency('@sentry/tracing', '*');

  astro.addJavaScriptSnippet({
    to: 'head',
    contents: `...` // Loads the JS bundle remotely or literally inline it
  });

  // TODO: How can I configure the init call?
  // TODO: Create an import to the sentry window object
}