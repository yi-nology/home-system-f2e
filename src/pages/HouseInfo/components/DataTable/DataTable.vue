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
import { setHouse, getHouseList, delHouse } from '../../../../api/house'
export default {
  name: 'DataTable',
  created () {
    this.create()
  },
  data () {
    return {
      res: [
        {
          house_name: '金盏嘉园',
          house_address: '北京市朝阳区',
          home_number: '2',
          home_empty: '0'
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
            label: '房屋ID',
            prop: 'house_id',
            visdiplay: false,
            hide: false
          },
          {
            label: '房屋名称',
            prop: 'house_name',
            width: '150px'
          }, {
            label: '房屋地址',
            prop: 'house_address'
          }, {
            label: '房间数量',
            visdiplay: false,
            prop: 'home_number',
            width: '80px'
          }, {
            label: '空闲数量',
            prop: 'home_empty',
            visdiplay: false,
            width: '80px'
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
      delHouse(form).thin().catch()
    },
    // rowUpdate (form, index, done, loading) {
    //   setTimeout(() => {
    //     this.$message.success('正在请求')
    //     loading()
    //   }, 1000)
    //   setTimeout(() => {
    //     this.$message.success('编辑数据' + JSON.stringify(form) + '数据序号' + index)
    //     setHouse(form).thin(res => {
    //       console.log(res)
    //       this.$message.success('请求成功')
    //     }
    //     ).catch(err => {
    //       console.log(err)
    //       this.$message.success('请求失败')
    //     })
    //     done()
    //   }, 2000)
    // },
    rowUpdate (form, index, done, loading) {
      this.$message.success('模拟网络请求')
      setTimeout(() => {
        this.$message.success('关闭按钮等待')
        loading()
      }, 1000)
      setTimeout(() => {
        this.$message.success('编辑数据' + JSON.stringify(form) + '数据序号' + index)
        done()
        setHouse(form).thin(
        ).catch(err => {
          console.log(err)
          this.$message.success('请求失败')
        })
      }, 2000)
      this.load()
    },

    rowSave (form, done, loading) {
      setTimeout(() => {
        this.$message.success('正在请求')
        loading()
      }, 1000)
      setTimeout(() => {
        this.$message.success('新增数据' + JSON.stringify(form))
        done()
      }, 2000)
      setHouse(form).thin(res => {
        console.log(res)
        this.$message.success('请求成功')
      }
      ).catch(err => {
        console.log(err)
        this.$message.success('请求失败')
      })
    },

    create () {
      getHouseList().then(res => {
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
