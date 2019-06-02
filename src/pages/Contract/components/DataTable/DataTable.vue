<template>
    <div>
        <avue-crud :data="res"
                   :page="page"
                   :option="option"
                   :permission="permission"
                   @on-load="onLoad"
                   @row-update="rowUpdate"
                  ></avue-crud>
    </div>
</template>

<script>
import { getContractList, setContract } from '../../../../api/contract'

export default {
  name: 'DataTable',
  data () {
    return {
      page: {
        pageSize: 10,
        total: 10
      },
      res: [
        {
        }
      ],
      permission: {
        delBtn: true,
        addBtn: true,
        editBtn: true
      },
      option: {
        menu: true,
        menuType: 'text',
        page: true,
        align: 'center',
        menuAlign: 'center',
        viewBtn: false,
        addBtn: false,
        refreshBtn: false,
        columnBtn: true,
        delBtn: false,

        column: [
          {
            label: '合同ID',
            prop: 'contract_id',
            // visdiplay: false,
            readonly: true,
            hide: false
          },
          {
            label: '住户姓名',
            prop: 'name',
            readonly: true,
            span: 12
          },
          {
            label: '房屋',
            prop: 'home_name',
            readonly: true,
            span: 12
          },
          {
            label: '房间',
            prop: 'house_name',
            readonly: true,
            span: 12
          },
          {
            label: '合同内容',
            prop: 'content',
            type: 'textarea',
            span: 24
          },
          {
            label: '有效期',
            prop: 'startEnd',
            type: 'daterange',
            format: 'yyyy 年 MM 月 dd 日',
            valueFormat: 'yyyy-MM-dd',
            hide: true,
            size: 'small',
            prefixIcon: 'el-icon-tickets',
            span: 24
          },
          {
            label: '开始时间',
            prop: 'start',
            type: 'date',
            format: 'yyyy 年 MM 月 dd 日',
            valueFormat: 'yyyy-MM-dd',
            editVisdiplay: false,
            size: 'small',
            prefixIcon: 'el-icon-tickets',
            span: 24
          },
          {
            label: '结束时间',
            prop: 'end',
            type: 'date',
            format: 'yyyy 年 MM 月 dd 日',
            valueFormat: 'yyyy-MM-dd',
            editVisdiplay: false,
            size: 'small',
            prefixIcon: 'el-icon-tickets',
            span: 24
          },
          {
            label: '缴费日期',
            prop: 'date',
            type: 'select',
            size: 'small',
            dicData: [],
            prefixIcon: 'el-icon-tickets',
            span: 9
          },
          {
            label: '缴费频率',
            prop: 'rate',
            type: 'silder',
            min: 1,
            step: 1,
            max: 12,
            showStops: true,
            prefixIcon: 'el-icon-tickets',
            span: 15
          }
        ]
      }
    }
  },
  methods: {
    createDay () {
      const data = this.option.column[8]
      var d = []
      for (var i = 1; i < 28; i++) {
        d.push({ 'value': i, 'label': i })
      }
      data.dicData = d
      console.log(this.option.column[5])
    },
    rowUpdate (form, index, done, loading) {
      form.start = form.startEnd[0]
      form.end = form.startEnd[1]
      setTimeout(() => {
        this.$message.success('正在请求')
        loading()
      }, 1000)
      console.log(form)
      setContract(form).then(res => {
        console.log(res)
        this.$message.success('请求成功')
      }
      ).catch(err => {
        console.log(err)
        this.$message.success('请求失败')
      })
      // setHome(form).thin(res => {
      //   console.log(res)
      //   this.$message.success('请求成功')
      // }
      // ).catch(err => {
      //   console.log(err)
      //   this.$message.success('请求失败')
      // })
      setTimeout(() => {
        this.$message.success('编辑数据' + JSON.stringify(form) + '数据序号' + index)
        done()
      }, 2000)
      var page = {
        currentPage: 1,
        pageSize: 10
      }
      this.onLoad(page)
    },
    onLoad (page) {
      const send = {
        currentPage: page.currentPage,
        pageSize: page.pageSize
      }
      getContractList(send).then(data => {
        this.page.total = data.data.total
        this.res = data.data.data
        for (var w in this.res) {
          const list = new Array(2)
          list[0] = this.res[w].start
          list[1] = this.res[w].end
          this.res[w].startEnd = list
        }
        console.log(this.res)
      }).catch()
      this.$message.success('分页信息:' + JSON.stringify(page))
    }
  },
  watch: {
    'form.startEnd': {
      handler (newV, oldV) {
        this.form.start = newV[0]
        this.form.end = newV[1]
      },
      deep: true
    }
  },
  mounted () {
    this.createDay()
  }
}
</script>

<style scoped>

</style>
