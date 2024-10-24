import type { Preferences } from '@optiml-core/preferences';
import type { DeepPartial } from '@optiml-core/typings';

/**
 * If you want all apps to use the same default preferences, you can define them here
 * instead of modifying the default preferences in @optiml-core/preferences
 * @param preferences
 * @returns
 */

function defineOverridesPreferences(preferences: DeepPartial<Preferences>) {
  return preferences;
}

export { defineOverridesPreferences };

export * from '@optiml-core/preferences';
