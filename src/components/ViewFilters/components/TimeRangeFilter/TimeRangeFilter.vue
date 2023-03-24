<template>
  <div class="time-range-filter">
    <date-range-picker
      ref="picker"
      v-model="state"
      :opens="settings.opens"
      :locale-data="settings.localeData"
      :time-picker="settings.timePicker"
      :auto-apply="settings.autoApply"
      :date-util="settings.dateUtil"
      :linked-calendars="settings.linkedCalendars"
      :ranges="ranges"
      @toggle="toggleIfNotLoading"
      @update:model-value="filterSet"
    >
      <template #input>
        <div style="min-width: 250px;">
          <calendar-outlined />
          {{ date.startDate }} - {{ date.endDate }}
        </div>
      </template>
    </date-range-picker>
  </div>
</template>

<script>
import DateRangePicker from 'vue3-gabe-daterange-picker';
import { CalendarOutlined } from '@ant-design/icons-vue';
import { mapGetters, mapActions } from 'vuex';

import utils from '@/utils';
import { TIME_RANGE_FILTER } from '@/constants';

import locale from './locale';
import { DEFAULT_PROPS } from './constants';
import { getLocalePartOfSettings, getLocaleRanges } from './helpers';

import 'vue3-gabe-daterange-picker/dist/vue3-daterange-picker.css';

export default {
  name: 'TimeRangeFilter',
  i18n: locale,
  components: {
    DateRangePicker,
    CalendarOutlined,
  },
  data() {
    return {
      state: utils.getLast24Hours(),
    };
  },
  computed: {
    ...mapGetters(['timeFilterValue', 'requestIsPending']),
    settings() {
      return {
        ...DEFAULT_PROPS,
        localeData: getLocalePartOfSettings(locale, this.$i18n.locale),
      };
    },
    ranges() {
      return getLocaleRanges(locale, this.$i18n.locale);
    },
    date() {
      return {
        startDate: utils.formatDateFromObject(this.timeFilterValue.startDate),
        endDate: utils.formatDateFromObject(this.timeFilterValue.endDate),
      };
    },
  },
  methods: {
    ...mapActions([TIME_RANGE_FILTER.ACTIONS.FILTER_SET, TIME_RANGE_FILTER.ACTIONS.FILTER_RESET]),
    toggleIfNotLoading() {
      if (this.requestIsPending) {
        this.$refs.picker.open = false;
      }
    },
  },
};
</script>

<style lang="scss">
.time-range-filter {
  text-align: left;
  padding: 0 0 10px 15px;

  .calendars {
    display: flex;

    .calendar-time {
      display: flex;
      justify-content: center;

      select {
        margin: 0;
      }
    }
  }
}
.form-control {
  color: #495057;
  line-height: 1.5;
  font-weight: 400;
  border-radius: 5px;
}
.time-range-filter .form-control {
  font-size: 0.9rem;
  text-align: center;
}
</style>
