<script setup lang="ts">
import type { SupportedLanguagesType } from '@optiml/locales';

import { SUPPORT_LANGUAGES } from '@optiml/constants';
import { Languages } from '@optiml/icons';
import { loadLocaleMessages } from '@optiml/locales';
import { preferences, updatePreferences } from '@optiml/preferences';
import { VbenDropdownRadioMenu, VbenIconButton } from '@optiml-core/shadcn-ui';

defineOptions({
  name: 'LanguageToggle',
});

async function handleUpdate(value: string) {
  const locale = value as SupportedLanguagesType;
  updatePreferences({
    app: {
      locale,
    },
  });
  await loadLocaleMessages(locale);
}
</script>

<template>
  <div>
    <VbenDropdownRadioMenu
      :menus="SUPPORT_LANGUAGES"
      :model-value="preferences.app.locale"
      @update:model-value="handleUpdate"
    >
      <VbenIconButton>
        <Languages class="text-foreground size-4" />
      </VbenIconButton>
    </VbenDropdownRadioMenu>
  </div>
</template>
