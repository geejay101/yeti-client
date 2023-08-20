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
      type: Array,
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
    title: {
      type: String,
      default() {
        return '';
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      resizer: null,
    };
  },
  watch: {
    loading() {
      if (!this.responsive) {
        return;
      }

      if (this.loading) {
        return;
      }

      if (this.resizer) {
        return;
      }

      this.resizer = new ResizeObserver((e) => {
        e.forEach((entry) => {
          if (this.$refs.plot) {
            console.log('event fired', this.$parent.$el);
            // eslint-disable-next-line
            this.$refs.plot._chart.setSize({
              width: entry.contentRect.width - 25,
              height: this.chartOptions.height,
            });
          }
        });
      });
      // this.resizer.observe(this.$parent.$el);
    },
  },
};
</script>
<style scoped>
.chart-card {
  width: 100%;
  padding: 0;
}
</style>
