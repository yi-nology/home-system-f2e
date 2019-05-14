<template>
    <div>
        添加/修改
        <el-switch :active-value="true" :inactive-value="false" v-model="text" active-color="#13ce66"
                   inactive-color="#ff4949">s
        </el-switch>
        <avue-crud :data="res" :option="option" :permission="permission"
                   @row-save="rowSave"
                   @row-update="rowUpdate"
                   @row-del="rowDel"
                   @refresh-change="refreshChange"></avue-crud>
    </div>
</template>

<script>
import { setPrice, getPriceList, delPrice } from '../../../../api/price'
export default {
  name: 'DataTable',
  created () {
    this.create()
  },
  data () {
    return {
      res: [
        {
          price_id: 1,
          price_name: '小店一区价格模版',
          content: '北京市朝阳区',
          user_name: '2',
          home_name: '0',
          start: '2012-01-01',
          end: '2018-01-01'
        }
      ],
      text: false,
      permission: {
        delBtn: false,
        addBtn: false,
        editBtn: false
      },
      option: {
        menu: false,
        menuType: 'text',
        page: false,
        align: 'center',
        menuAlign: 'center',
        columnBtn: false,
        column: [
          {
            label: '价钱ID',
            prop: 'price_id',
            visdiplay: false,
            hide: false
          },
          {
            label: '房间ID',
            prop: 'home_id',
            visdiplay: false,
            hide: false
          },
          {
            label: '水费',
            prop: 'water_price',
            visdiplay: false,
            width: '150px'
          },
          {
            label: '电费',
            prop: 'electric_price',
            visdiplay: false,
            width: '150px'
          },
          {
            label: '网费',
            prop: 'net_price',
            width: '200px'
          },
          {
            label: '其他费用',
            prop: 'other_price',
            width: '200px'
          },
          {
            label: '应缴日期',
            prop: 'date',
            type: 'date',
            format: 'yyyy-MM-dd',
            valueFormat: 'yyyy-MM-dd',
            width: '200px'
          },
          {
            label: '是否已交',
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
      delPrice(form).thin().catch()
    },
    rowUpdate (form, index, done, loading) {
      setTimeout(() => {
        this.$message.success('正在请求')
        loading()
      }, 1000)
      setPrice(form).thin(res => {
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
    rowSave (form, done, loading) {
      setTimeout(() => {
        this.$message.success('正在请求')
        loading()
      }, 1000)
      setPrice(form).thin(res => {
        console.log(res)
        this.$message.success('请求成功')
      }
      ).catch(err => {
        console.log(err)
        this.$message.success('请求失败')
      })
      setTimeout(() => {
        this.$message.success('新增数据' + JSON.stringify(form))
        done()
      }, 2000)
    },

    create () {
      getPriceList().then(res => {
        this.res = [...res.data]
        // 返回数据
      })
        .catch(err => {
          console.log(err)
          // 异常情况
        })
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
