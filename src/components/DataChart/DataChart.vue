<template>
  <Line
    :data="chartData"
    :options="chartOptions"
    class="chartjs-render-monitor"
  />
</template>

<script>
import 'chartjs-adapter-date-fns';
import Downsample from 'chartjs-plugin-downsample';
import { mapGetters } from 'vuex';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Legend,
  Tooltip,
  Title,
} from 'chart.js';

ChartJS.register(
  Title,
  Legend,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
);

ChartJS.register({ id: 'downsample', ...Downsample });

export default {
  name: 'DataChart',
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Line,
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
  data() {
    return {
      plugins: [
      ],
    };
  },
  computed: {
    ...mapGetters(['navCollapsed']),
  },
  watch: {
    navCollapsed() {
      // magic timeout to resize chart after navbar was animated in or out
      setTimeout(() => {
        this.$data._chart.resize(); // eslint-disable-line no-underscore-dangle
      }, 100);
    },
  },
};
</script>
<style lang="scss">
  .chartjs-render-monitor {
    background-color: #ffffff;
    margin-bottom: 10px;
  }
</style>
