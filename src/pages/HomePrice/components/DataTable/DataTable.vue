<template>
    <div>
        <el-dialog
                title="详细信息"
                :visible.sync="dialogVisible"
                width="30%"
                >
            <el-tag>水表底:{{ this.rowData.oldW }}</el-tag>
            <el-tag>水本月:{{ this.rowData.newW }}</el-tag>
            <el-tag>电表底:{{ this.rowData.oldE }}</el-tag>
            <el-tag>电本月:{{ this.rowData.newE }}</el-tag>
            <el-tag>房租价格:{{ this.rowData.price/100 }}</el-tag>
            <el-tag>缴费周期:{{ this.rowData.rate }}</el-tag>
            <el-tag>水单价{{ this.rowData.water/100 }}</el-tag>
            <el-tag>电单价{{ this.rowData.electric/100 }}</el-tag>
            <el-tag>网费{{ this.rowData.net/100 }}</el-tag>
            <el-tag>其他费用{{ this.rowData.other/100 }}</el-tag>
            <el-tag>合计{{ this.rowData.sum/100 }}</el-tag>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <avue-crud :data="data" :option="option"
                   @row-update="rowUpdate"
                   @row-del="rowDel"
                   @refresh-change="refreshChange"
                   @on-load="onLoad"
                   :page="page">
            <template slot-scope="scope" slot="menu">
                <el-button type="primary"
                           icon="el-icon-check"
                           size="small"
                           plain
                           @click.stop="handleEdit(scope.row,scope.index)">查看信息</el-button>
            </template>
        </avue-crud>
    </div>
</template>

<script>
import { setPrice, getDetail, getPriceList, delPrice } from '../../../../api/price'
export default {
  name: 'DataTable',
  data () {
    return {
      data: [],
      text: false,
      dialogVisible: false,
      rowData: {},
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      option: {
        menuType: 'text',
        page: false,
        addBtn: false,
        align: 'center',
        menuAlign: 'center',
        delBtn: false,
        column: [
          {
            label: '价钱ID',
            prop: 'price_id',
            visdiplay: false,
            hide: false
          },
          {
            label: 'rc_id',
            prop: 'rc_id',
            visdiplay: false,
            hide: true
          },
          {
            label: '租户',
            prop: 'user_name',
            visdiplay: false
          },
          {
            label: '房屋',
            prop: 'house_name',
            visdiplay: false
          },
          {
            label: '房间',
            prop: 'home_name',
            visdiplay: false
          },
          {
            label: '日期',
            prop: 'date',
            visdiplay: false,
            width: '150px'
          },
          {
            label: '合计',
            prop: 'sum',
            visdiplay: false,
            width: '150px'
          },
          {
            label: '水表底',
            prop: 'water',
            width: '150px',
            min: 0,
            max: 99999,
            hide: true
          },
          {
            label: '电表底',
            prop: 'electric',
            width: '150px',
            min: 0,
            max: 99999,
            hide: true
          },
          // {
          //   label: '应缴日期',
          //   prop: 'date',
          //   type: 'date',
          //   format: 'yyyy-MM-dd',
          //   valueFormat: 'yyyy-MM-dd',
          //   width: '200px'
          // },
          {
            label: '是否已交',
            type: 'select',
            dicData: [
              {
                label: '已经缴费',
                value: 1
              }, {
                label: '未缴费',
                value: 0
              }, {
                label: '未缴费',
                disabled: true
              }
            ],
            prop: 'state'
          }
        ]
      }
    }
  },
  methods: {
    refreshChange ({ page, searchForm }) {
      this.$message({
        message: `当前的返回的分页对象${JSON.stringify(page)} 搜索表单对象${JSON.stringify(searchForm)}`,
        type: 'success'
      })
    },
    rowDel (form, index) {
      this.$message.success('删除数据' + JSON.stringify(form))
      delPrice(form).then().catch()
    },
    rowUpdate (form, index, done, loading) {
      setTimeout(() => {
        this.$message.success('正在请求')
        loading()
      }, 1000)
      setPrice(form).then(res => {
        console.log(res)
        this.$message.success('请求成功')
      }
      ).catch(err => {
        console.log(err)
        this.$message.success('请求失败')
      })
      setTimeout(() => {
        this.$message.success('编辑数据' + JSON.stringify(form) + '数据序号' + index)
        done()
      }, 2000)
    },
    onLoad (page) {
      const send = {
        currentPage: page.currentPage,
        pageSize: page.pageSize
      }
      if (this.name !== '') {
        send.name = this.name
      }
      getPriceList(send).then(data => {
        console.log(data.data)
        this.page.total = data.data.total
        this.data = data.data.data
      }).catch()
      this.$message.success('分页信息:' + JSON.stringify(this.data))
    },
    handleEdit (row, index) {
      this.dialogVisible = true
      getDetail(row).then(
        data => {
          this.rowData = data.data
        }
      )
    }
  },
  watch: {
    text () {
      if (this.text === true) {
        this.permission = {
          delBtn: true,
          addBtn: true,
          editBtn: true
        }
        this.option.menu = true
      } else {
        this.permission = {
          delBtn: false,
          addBtn: false,
          editBtn: false
        }
        this.option.menu = false
      }
    }
  }
}
</script>

<style scoped>

</style>
