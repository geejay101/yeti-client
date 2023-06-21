<template>
  <UplotVue
    ref="plot"
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
    responsive: {
      type: Boolean,
      default() {
        return true;
      },
    },
  },
  created() {
    if (!this.responsive) {
      return;
    }

    const parent = this.$parent.$el;
    const resizer = new ResizeObserver((e) => {
      e.forEach((entry) => {
        if (this.$refs.plot) {
          // eslint-disable-next-line
          this.$refs.plot._chart.setSize({
            width: entry.contentRect.width,
            height: this.chartOptions.height,
          });
        }
      });
    });

    resizer.observe(parent);
  },
};
</script>
