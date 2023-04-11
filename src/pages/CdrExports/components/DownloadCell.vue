<template>
  <a-button
    type="secondary"
    :loading="loading"
    @click="clickHandler"
  >
    <template #icon>
      <DownloadOutlined />
    </template>
  </a-button>
</template>

<script>
import { DownloadOutlined } from '@ant-design/icons-vue';

function downloadFile(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  link.setAttribute('target', '_blank');
  link.click();
  window.URL.revokeObjectURL(url);
}

function getFilenameFromHeaders(responseHeaders = new Map()) {
  if (
    responseHeaders.get('content-disposition') != null
    && responseHeaders.get('content-disposition').includes('filename=')
  ) {
    return responseHeaders.get('content-disposition').split('filename=')[1].replace(/['"]+/g, '');
  }

  return null;
}

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
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async clickHandler() {
      this.loading = true;
      try {
        const response = await fetch(`${YETI_CONFIG.yeti.apiBaseUrl}/api/rest/customer/v1/cdr-exports/${this.id}/download`);
        const filename = getFilenameFromHeaders(response.headers);
        const blob = await response.blob();
        downloadFile(blob, filename);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
