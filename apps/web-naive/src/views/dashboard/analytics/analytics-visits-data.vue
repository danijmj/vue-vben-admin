<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import {
  EchartsUI,
  type EchartsUIType,
  useEcharts,
} from '@optiml/plugins/echarts';

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

onMounted(() => {
  renderEcharts({
    legend: {
      bottom: 0,
      data: ['access', 'trend'],
    },
    radar: {
      indicator: [
        {
          name: 'Web page',
        },
        {
          name: 'Mobile',
        },
        {
          name: 'Ipad',
        },
        {
          name: 'Client',
        },
        {
          name: 'Third Party',
        },
        {
          name: 'Other',
        },
      ],
      radius: '60%',
      splitNumber: 8,
    },
    series: [
      {
        areaStyle: {
          opacity: 1,
          shadowBlur: 0,
          shadowColor: 'rgba(0,0,0,.2)',
          shadowOffsetX: 0,
          shadowOffsetY: 10,
        },
        data: [
          {
            itemStyle: {
              color: '#b6a2de',
            },
            name: 'Access',
            value: [90, 50, 86, 40, 50, 20],
          },
          {
            itemStyle: {
              color: '#5ab1ef',
            },
            name: 'Trend',
            value: [70, 75, 70, 76, 20, 85],
          },
        ],
        itemStyle: {
          // borderColor: '#fff',
          borderRadius: 10,
          borderWidth: 2,
        },
        symbolSize: 0,
        type: 'radar',
      },
    ],
    tooltip: {},
  });
});
</script>

<template>
  <EchartsUI ref="chartRef" />
</template>
