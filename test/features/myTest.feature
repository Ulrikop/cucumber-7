Feature: My Test

  Scenario: Passed host
    When I configure the servers
      | host | port |
      | foo  | 42   |
      | bar  | 666  |
    Then the passed server fits is included

  Scenario: Used wrong arg
    Given the server was read from parameters
    When I configure the servers
      | host | port |
      | foo  | 42   |
      | bar  | 666  |
    Then the passed server fits is included

  # Error: function timed out, ensure the callback is executed within 5000 milliseconds
  #            at Timeout._onTimeout (/home/ukiermai/workspace/foreign/cucumber-7/node_modules/@cucumber/cucumber/src/user_code_runner.ts:80:18)
  #            at listOnTimeout (internal/timers.js:549:17)
  #            at processTimers (internal/timers.js:492:7)
  Scenario: No hint about expected table in step definition
    Given a not available table
