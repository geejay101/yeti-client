<template>
  <a-card
    class="chart-card"
    :title="title"
    :loading="loading"
  >
    <UplotVue
      ref="plot"
      :data="chartData"
      :options="chartOptions"
    />
  </a-card>
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
            // eslint-disable-next-line
            this.$refs.plot._chart.setSize({
              width: entry.contentRect.width - 25,
              height: this.chartOptions.height,
            });
          }
        });
      });
      this.resizer.observe(this.$el);
    },
  },
};
</script>
<style scoped>
.chart-card {
  width: 100%;
  padding: 0;
  margin: 10px 0;
}
</style>
