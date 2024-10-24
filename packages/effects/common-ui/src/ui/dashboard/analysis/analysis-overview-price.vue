<script setup lang="ts">
import type { AnalysisOverviewItem } from '../typing';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  VbenCountToAnimator,
  VbenIcon,
} from '@optiml-core/shadcn-ui';

interface Props {
  items: AnalysisOverviewItem[];
  size: Array<Number>;
}

defineOptions({
  name: 'AnalysisOverviewPrice',
});

withDefaults(defineProps<Props>(), {
  items: () => [],
  size: () => [4, 2],
});
</script>

<template>
  <div
    :class="`${`md:grid-cols-${size[0]?.toString()}`} ${`lg:grid-cols-${size[1]?.toString()}`}`"
    class="grid grid-cols-1 gap-4"
  >
    <template v-for="item in items" :key="item.title">
      <Card :title="item.title" class="w-full">
        <CardHeader>
          <CardTitle class="text-xl">{{ item.title }}</CardTitle>
        </CardHeader>

        <CardContent class="flex items-center justify-between">
          <div>
            <VbenCountToAnimator
              :end-val="item.value"
              :start-val="1"
              class="text-xl"
              prefix=""
            />
            <span class="text-xl"> €</span>
          </div>
          <VbenIcon :icon="item.icon" class="size-8 flex-shrink-0" />
        </CardContent>
        <CardFooter v-if="item && item.totalValue" class="justify-between">
          <span>{{ item.totalTitle }}</span>
          <VbenCountToAnimator
            :end-val="item.totalValue"
            :start-val="1"
            prefix=""
          />
          <span class="text-xl"> €</span>
        </CardFooter>
      </Card>
    </template>
  </div>
</template>
