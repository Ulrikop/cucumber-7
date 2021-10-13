import { Before } from '@cucumber/cucumber';

import type { Context } from './context';

Before(async function (this: Context) {
  this.server = `${this.parameters.server.host}:${this.parameters.server.port}`;
});
