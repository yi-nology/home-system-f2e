<template>
    <div>
        <avue-crud :data="res" :option="option" :permission="permission"
                   :page="page"
                   @on-load="onLoad"
                   @row-save="rowSave"
                   @row-update="rowUpdate"
                   @row-del="rowDel"
                   @refresh-change="refreshChange"></avue-crud>
    </div>
</template>

<script>
import { setHome, getHomeList, delHome } from '../../../../api/home'
import { getHouseList } from '../../../../api/house'
export default {
  name: 'DataTable',
  beforeCreate () {
  },
  created () {
  },
  mounted () {
    this.mountedCol()
  },
  data () {
    return {
      page: {
        pageSize: 10,
        total: 10
      },
      house_select: [],
      res: [
        {
          price_id: '',
          home_id: '',
          house_id: '',
          name: '',
          size: 0,
          remark: '',
          price: 0,
          water: 0,
          electric: 0,
          net: 0,
          remark_price: 0
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
        page: false,
        align: 'center',
        menuAlign: 'center',
        columnBtn: false,
        viewBtn: true,
        column: [
          {
            label: '房间ID',
            prop: 'home_id',
            visdiplay: false,
            hide: false
          },
          {
            label: '价格ID',
            prop: 'price_id',
            width: '150px',
            visdiplay: false,
            hide: false
          },
          {
            label: '房间名称',
            prop: 'name',
            span: 12
          },
          {
            label: '所属房屋',
            prop: 'house_id',
            type: 'tree',
            dicData: [],
            span: 12
          },
          {
            label: '房屋备注',
            prop: 'remarks',
            type: 'textarea',
            dicData: [],
            span: 24
          },
          {
            label: '房屋大小',
            prop: 'size',
            type: 'number',
            minRows: 0,
            maxRows: 100,
            precision: 2,
            span: 8
          },
          {
            label: '基础价格',
            prop: 'price',
            type: 'number',
            minRows: 0,
            maxRows: 10000,
            precision: 2,
            span: 8
          },
          {
            label: '备注价格',
            prop: 'remark_price',
            type: 'number',
            minRows: 0,
            maxRows: 10000,
            precision: 2,
            span: 8
          },
          {
            label: '水单价',
            prop: 'water',
            type: 'number',
            minRows: 0,
            maxRows: 50,
            precision: 2,
            span: 8
          },
          {
            label: '电单价',
            prop: 'electric',
            type: 'number',
            minRows: 0,
            maxRows: 50,
            precision: 2,
            span: 8
          },
          {
            label: '网单价',
            prop: 'net',
            type: 'number',
            minRows: 0,
            maxRows: 50,
            precision: 2,
            span: 8
          },
          {
            label: '水表底',
            prop: 'dwater',
            type: 'number',
            minRows: 0,
            maxRows: 99999,
            precision: 2,
            hide: true,
            span: 12
          },
          {
            label: '电表底',
            prop: 'delectric',
            type: 'number',
            minRows: 0,
            maxRows: 99999,
            precision: 2,
            hide: true,
            span: 12
          },
          {
            label: '表底ID',
            prop: 'rc_id',
            visdiplay: false,
            hide: false
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
      delHome(form).then().catch()
    },
    rowUpdate (form, index, done, loading) {
      setTimeout(() => {
        this.$message.success('正在请求')
        loading()
      }, 1000)
      form.size = form.size * 100
      form.price = form.price * 100
      form.remark_price = form.remark_price * 100
      form.water = form.water * 100
      form.net = form.net * 100
      form.electric = form.electric * 100
      console.log(form)
      setHome(form).then(res => {
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
      form.size = form.size * 100
      form.price = form.price * 100
      form.remark_price = form.remark_price * 100
      form.water = form.water * 100
      form.net = form.net * 100
      form.electric = form.electric * 100
      setHome(form).then(res => {
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
    mountedCol () {
      const info = []
      getHouseList().then(data => {
        // console.log(data)
        for (var item in data.data) {
          const d = {
            label: data.data[item].house_name,
            value: data.data[item].house_id
          }
          info.push(d)
        }
        this.house_select = info
      })
      const data = this.option.column
      for (var h in data) {
        if (data[h].prop === 'house_id') {
          data[h].dicData = info
        }
      }
    },
    onLoad (page) {
      const send = {
        currentPage: page.currentPage,
        pageSize: page.pageSize
      }
      getHomeList(send).then(data => {
        this.page.total = data.data.total
        this.res = data.data.data
      }).catch()
      this.$message.success('分页信息:' + JSON.stringify(page))
    }
  },
  watch: {
    // text () {
    //   if (this.text === true) {
    //     this.permission = {
    //       delBtn: true,
    //       addBtn: true,
    //       editBtn: true
    //     }
    //     this.option.menu = true
    //   } else {
    //     this.permission = {
    //       delBtn: false,
    //       addBtn: false,
    //       editBtn: false
    //     }
    //     this.option.menu = false
    //   }
    // }
  }
}
</script>

<style scoped>

</style>
