import * as assert from 'assert';

import type { DataTable } from '@cucumber/cucumber';
import { Given, Then, When } from '@cucumber/cucumber';

import type { Context } from '../context';

Given('the server was read from parameters', function (this: Context) {
  // wrong parameters not seen of TypeScript compiler
  this.server = `${this.parameters.server.wrongHost}:${this.parameters.server.wrongPort}`;
});

When('I configure the servers', function (this: Context, table: DataTable) {
  this.servers = table.hashes().map(row => `${row.host}:${row.port}`);
});

Then('the passed server fits is included', function (this: Context) {
  assert(this.servers?.includes(this.server));
});

Given('a not available table', (table: DataTable) => {
  // will be not executed
});
