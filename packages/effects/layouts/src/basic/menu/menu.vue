<script lang="ts" setup>
import type { MenuRecordRaw } from '@optiml/types';
import type { MenuProps } from '@optiml-core/menu-ui';

import { Menu } from '@optiml-core/menu-ui';

interface Props extends MenuProps {
  menus: MenuRecordRaw[];
}

const props = withDefaults(defineProps<Props>(), {
  accordion: true,
  menus: () => [],
});

const emit = defineEmits<{
  select: [string, string?];
}>();

function handleMenuSelect(key: string) {
  emit('select', key, props.mode);
}
</script>

<template>
  <Menu
    :accordion="accordion"
    :collapse="collapse"
    :collapse-show-title="collapseShowTitle"
    :default-active="defaultActive"
    :menus="menus"
    :mode="mode"
    :rounded="rounded"
    :theme="theme"
    @select="handleMenuSelect"
  />
</template>
