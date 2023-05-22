<template>
  <div>
    <a-button
      type="secondary"
      @click="clickHandler"
    >
      <template #icon>
        <DownloadOutlined />
      </template>
    </a-button>
    <a
      ref="linkRef"
      :href="`${apiBaseUrl}/api/rest/customer/v1/cdr-exports/${id}/download`"
    />
  </div>
</template>

<script>
import { DownloadOutlined } from '@ant-design/icons-vue';
import { mapGetters } from 'vuex';

export default {
  components: {
    DownloadOutlined,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters(['apiBaseUrl']),
  },
  methods: {
    clickHandler() {
      if (this.$refs.linkRef) {
        this.$refs.linkRef.click();
      }
    },
  },
};
</script>
