<template>
  <d2-container>
    <data-table></data-table>

  </d2-container>
</template>

<script>
import DataTable from './componnets/DataTable'

export default {
  // 如果需要缓存页面
  // name 字段需要设置为和本页路由 name 字段一致
  name: 'Leaseholder',
  components: {
    DataTable
  }
}
</script>
