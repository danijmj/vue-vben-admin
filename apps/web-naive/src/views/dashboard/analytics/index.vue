<script lang="ts" setup>
import type { AnalysisOverviewItem } from '@optiml/common-ui';
import type { TabOption } from '@optiml/types';

import {
  AnalysisChartCard,
  AnalysisChartsTabs,
  AnalysisOverviewPrice,
} from '@optiml/common-ui';
import { SvgCakeIcon, SvgCardIcon } from '@optiml/icons';
import { $t } from '@optiml/locales';

import { useAnalyticStore } from '#/store';

import AnalyticsTop5Competence from './analytics-top5-competence.vue';
import AnalyticsTrends from './analytics-trends.vue';
import AnalyticsVisits from './analytics-visits.vue';
import AnalyticsVisitsData from './analytics-visits-data.vue';
import AnalyticsVisitsSales from './analytics-visits-sales.vue';
import AnalyticsVisitsSource from './analytics-visits-source.vue';

const AnalyticStore = useAnalyticStore();

/* const data = fetch('/api/analytics/all')
  .then((response) => {
    console.log(response.body);
  })
  .catch((error) => {
    console.error(new Error(error));
  }); */

AnalyticStore.fetchAnalytics();

// Price Dashboard
const overviewItems: AnalysisOverviewItem[] = [
  {
    icon: SvgCardIcon,
    title: 'Price AI Calculator',
    value: 360,
    totalTitle: undefined,
    totalValue: undefined,
  },
  {
    icon: SvgCakeIcon,
    title: 'Your price',
    value: 450,
    totalTitle: undefined,
    totalValue: undefined,
  },
  {
    icon: SvgCakeIcon,
    title: 'Competency price queroge',
    value: 330,
    totalTitle: undefined,
    totalValue: undefined,
  },
];

const chartTabs: TabOption[] = [
  {
    label: $t('dashboard.analitycs.las20Hotels'),
    value: 'top20',
  },
  {
    label: 'Top 5 direct competence',
    value: 'top5',
  },
  {
    label: 'Traffic trends',
    value: 'trends',
  },
];
</script>

<template>
  <div class="p-5">
    <AnalysisOverviewPrice :items="overviewItems" :size="[3, 2]" />
    <AnalysisChartsTabs :tabs="chartTabs" class="mt-5">
      <template #top20>
        <AnalyticsVisits />
      </template>
      <template #top5>
        <AnalyticsTop5Competence />
      </template>
      <template #trends>
        <AnalyticsTrends />
      </template>
    </AnalysisChartsTabs>

    <div class="mt-5 w-full md:flex">
      <AnalysisChartCard
        class="mt-5 md:mr-4 md:mt-0 md:w-1/3"
        title="Number of visits"
      >
        <AnalyticsVisitsData />
      </AnalysisChartCard>
      <AnalysisChartCard
        class="mt-5 md:mr-4 md:mt-0 md:w-1/3"
        title="Visit Source"
      >
        <AnalyticsVisitsSource />
      </AnalysisChartCard>
      <AnalysisChartCard class="mt-5 md:mt-0 md:w-1/3" title="Visit Source">
        <AnalyticsVisitsSales />
      </AnalysisChartCard>
    </div>
  </div>
</template>
