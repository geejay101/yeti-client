<template>
  <a-list
    :data-source="dataSource"
    item-layout="vertical"
  >
    <template #renderItem="{item}">
      <a-list-item>
        <a-row type="flex">
          <a-col :span="4">
            {{ item.key }}
          </a-col>
          <a-col>
            {{ item.value }}
          </a-col>
        </a-row>
      </a-list-item>
    </template>
  </a-list>
</template>

<script>
export default {
  name: 'VericalListAnt',
  props: {
    dataSource: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss">
  .ant-list {
    background-color: rgb(250 250 250);
    padding: 1rem;
    border-radius: 2px;
  }
  .ant-col {
    text-align: left;
  }
</style>
