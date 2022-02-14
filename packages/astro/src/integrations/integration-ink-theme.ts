import { AstroConfig } from '../@types/astro.js';

export default async function (astro: { config: Readonly<AstroConfig>, assertDependency: (pkg: string, semver: string) => void, addRenderer: (mod: any | Promise<any>) => void}) {
  // EXAMPLE: Theme

  // TODO: Provide components, right?
  // npm install  
}



/*

WHAT DOES AN INTEGRATION ALLOW YOU TO DO?
- Add a renderer
- Assert npm dependencies
- add a vite plugin and configure vite options

Maybe:
- add a javascript snippet to the HTML head
- assert an env variable
- add a <Sentry /> component with the default configuration as props
- adds a starter src/components/Sentry.astro file?

Maybe:
- add a javascript snippet to the HTML head
- add a configuration snippet to the html head (saved in some separate file, config/sentry/setup.js)
*/