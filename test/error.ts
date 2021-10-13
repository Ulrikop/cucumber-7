import { Given } from '@cucumber/cucumber';

import type { Context } from './context';

Given('a compile error', function (this: Context) {
  this.notDefined = 'hello world';
});
