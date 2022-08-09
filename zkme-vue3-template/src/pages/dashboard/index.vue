<script lang="ts" setup>
const columns = [
          {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: '住址',
            dataIndex: 'address',
            key: 'address',
          },
        ]
const dataSource = new Array(50).fill(0).map((val, idx) => {
  return {
    name: `${idx}-name`,
    age: `${idx}-age`,
    address: `${idx}-title`,
  }
})
</script>
<template>
  <a-card title="test">
    <a-table :dataSource="dataSource" :columns="columns" :pagination="false" />
  </a-card>
</template>
<route lang="yaml">
meta:
  showMenu: true
  title: dashboard
  order: 1
  icon: ic:round-space-dashboard
</route>
