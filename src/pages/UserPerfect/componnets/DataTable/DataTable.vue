<template>
    <avue-crud :data="data" :option="option0"  @search-change="searchChange"></avue-crud>
</template>

<script>
export default {
  name: 'DataTable',
  data () {
    return {
      data: [
        {
          name: '张三',
          sex: '男',
          grade: '0',
          date: '2018-08-08',
          time: '13:00:00'
        }, {
          name: '李四',
          sex: '女',
          grade: '1',
          date: '2018-08-09',
          time: '13:00:00'
        }
      ],
      option0: {
        page: false,
        align: 'center',
        menuAlign: 'center',
        searchMenuSpan: 6,
        column: [
          {
            label: '姓名',
            prop: 'name',
            search: true
          },
          {
            label: '性别',
            prop: 'sex'
          },
          {
            label: '权限',
            prop: 'grade',
            type: 'select',
            searchDefault: [0],
            searchMmultiple: true,
            dicData: [
              {
                label: '会员',
                value: 0
              }, {
                label: '普通',
                value: 1
              }
            ]
          }
        ]
      }
    }
  },
  methods: {
    searchChange (params) {
      this.$message.success('搜索数据' + JSON.stringify(params))
    }
  }
}
</script>

<style scoped>

</style>
