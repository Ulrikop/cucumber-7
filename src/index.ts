import { DataTable } from '@cucumber/cucumber';
import type { IParameterTypeDefinition } from '@cucumber/cucumber/lib/support_code_library_builder/types';

export function parseSomething(parser: DataTable) {
  return parser.rows;
}

/**
 * Will be later used `defineParameterType(timeParameterType)`.
 */
export const timeParameterType: IParameterTypeDefinition<{ hours: number; minutes: number; seconds: number }> = {
  name: 'time',
  regexp: /(\d\d):(\d\d)(?::(\d\d))?/u,
  transformer: (...parts) => {
    const [hours = 0, minutes = 0, seconds = 0] = parts.map(part => parseInt(part));

    return {
      hours,
      minutes,
      seconds,
    };
  },
};
