# cucumber-7

Shows problems with well-functioning approaches in cucumber@6 that lead to problems with cucumber@7.

## Problems

### Compile errors

Compiling of ts files importing from `@cucumber/cucumber` throws error (see result of `npm run build`).

The second problem can fixed by adding TypeScript compiler option `resolveJsonModule` but a foreign framework should avoid to enforce a project setting specific option if an other solution is possible.

Both problems can be fixed by adding TypeScript compiler option `skipLibCheck` but it is better to check as strictly as possible.

### Any types

With an `any` the type safeness is reduced. Because of that it should be avoided. It is hard for the `parameters`of `World` and `table.hashes()`.

Both cases were possible with `@types/cucumber`.

The problem of `World` is showed in `test/environment.ts` (how the `parameters` was defined)
and `test/steps/server.ts` given step `the server was read from parameters` (error not seen from TypeScript).

Problems of `any` are also visualized with eslint.

### TypeScript compiler error

If TypeScript compiler throws an error, `cucumber-js` does not stop immediately.
Especially in large tests it is hard to find, because they output all steps + result overview.

Also for `--fail-fast`, it is hard to see the error if the rest of the log is spammed with skip messages.

### Wrongly expected parameter in step

e.g. if a table is expected in a step, it does not print something about not available table.
It just waits until the timeout throws an error.

### Import of IParameterTypeDefinition

The type `IParameterTypeDefinition` is not re-exported in main index file so that it must be imported like this:

```
import type { IParameterTypeDefinition } from '@cucumber/cucumber/lib/support_code_library_builder/types';
```

## Results

### npm run build

```
node_modules/@cucumber/cucumber/lib/formatter/http_stream.d.ts:3:8 - error TS1192: Module '"http"' has no default export.

3 import http from 'http';
         ~~~~

node_modules/@cucumber/messages/dist/src/index.d.ts:3:25 - error TS2732: Cannot find module '../package.json'. Consider using '--resolveJsonModule' to import module with '.json' extension.

3 import { version } from '../package.json';
```

### npm run lint

```
test/environment.ts
  6:20  error  Unsafe member access .server on an `any` value  @typescript-eslint/no-unsafe-member-access
  6:51  error  Unsafe member access .server on an `any` value  @typescript-eslint/no-unsafe-member-access

test/steps/servers.ts
   9:20  error  Unsafe member access .server on an `any` value  @typescript-eslint/no-unsafe-member-access
   9:56  error  Unsafe member access .server on an `any` value  @typescript-eslint/no-unsafe-member-access
  13:47  error  Unsafe member access .host on an `any` value    @typescript-eslint/no-unsafe-member-access
  13:59  error  Unsafe member access .port on an `any` value    @typescript-eslint/no-unsafe-member-access
```

That `any` types leads to not seen errors on compile time, e.g. in `Given('the server was read from parameters')`

### npm run test

```
Feature: My Test # test/features/myTest.feature:1

  Scenario: Passed host # test/features/myTest.feature:3
    When I configure the servers
      │ host │ port │
      │ foo  │ 42   │
      │ bar  │ 666  │
    Then the passed server fits is included

  Scenario: Used wrong arg # test/features/myTest.feature:10
    Given the server was read from parameters
    When I configure the servers
      │ host │ port │
      │ foo  │ 42   │
      │ bar  │ 666  │
    Then the passed server fits is included
    ✖ failed
      AssertionError [ERR_ASSERTION]: false == true
          + expected - actual

          -false
          +true

          at World.<anonymous> (test/steps/servers.ts:17:3)

  Scenario: No hint about expected table in step definition # test/features/myTest.feature:22
    Given a not available table
    ✖ failed
      Error: function timed out, ensure the callback is executed within 5000 milliseconds
          at Timeout._onTimeout (node_modules/@cucumber/cucumber/src/user_code_runner.ts:80:18)
          at listOnTimeout (internal/timers.js:549:17)
          at processTimers (internal/timers.js:492:7)

Failures:

1) Scenario: Used wrong arg # test/features/myTest.feature:10
   ✔ Before # test/environment.ts:5
   ✔ Given the server was read from parameters # test/steps/servers.ts:8
   ✔ When I configure the servers # test/steps/servers.ts:12
       | host | port |
       | foo  | 42   |
       | bar  | 666  |
   ✖ Then the passed server fits is included # test/steps/servers.ts:16
       AssertionError [ERR_ASSERTION]: false == true
           + expected - actual

           -false
           +true

           at World.<anonymous> (test/steps/servers.ts:17:3)

2) Scenario: No hint about expected table in step definition # test/features/myTest.feature:22
   ✔ Before # test/environment.ts:5
   ✖ Given a not available table # test/steps/servers.ts:20
       Error: function timed out, ensure the callback is executed within 5000 milliseconds
           at Timeout._onTimeout (node_modules/@cucumber/cucumber/src/user_code_runner.ts:80:18)
           at listOnTimeout (internal/timers.js:549:17)
           at processTimers (internal/timers.js:492:7)

3 scenarios (2 failed, 1 passed)
6 steps (2 failed, 4 passed)
0m05.029s (executing steps: 0m05.011s)
```
