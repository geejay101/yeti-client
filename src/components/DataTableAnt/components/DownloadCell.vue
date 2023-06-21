<template>
  <div>
    <a-button
      type="secondary"
      size="small"
      :disabled="disabled"
      @click="clickHandler"
    >
      <template #icon>
        <DownloadOutlined />
      </template>
    </a-button>
    <a
      ref="linkRef"
      download
      :href="link"
    />
  </div>
</template>

<script>
import { DownloadOutlined } from '@ant-design/icons-vue';

export default {
  components: {
    DownloadOutlined,
  },
  props: {
    resource: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    link() {
      return `${(new URL(this.resource)).pathname}/download`;
    },
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
