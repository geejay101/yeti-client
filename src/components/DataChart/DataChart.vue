<template>
  <UplotVue
    :data="chartData"
    :options="chartOptions"
  />
</template>

<script>
import UplotVue from 'uplot-vue';
import 'uplot/dist/uPlot.min.css';

export default {
  name: 'DataChart',
  components: {
    UplotVue,
  },
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    chartOptions: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
