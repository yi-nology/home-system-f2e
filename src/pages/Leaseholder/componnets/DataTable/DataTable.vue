<template>
    <div class="data-table">
        <el-dialog
                title="新增用户"
                :visible.sync="dialogVisible"
                width="50%"
                :before-close="handleClose">
        <NewUser  @clickFinsh="clickFinsh" />
        </el-dialog>
        <avue-crud :data="data" :option="option0"
                   @search-change="searchChange"
                   @row-update="rowUpdate"
                   @on-load="onLoad"
                   :page="page"
        >
            <template slot-scope="scope" slot="menuLeft">
                <el-button type="primary"
                           icon="el-icon-plus"
                           size="small"
                           plain
                           @click.stop="dialogVisible = true">新增</el-button>
            </template>
            <template slot-scope="scope" slot="menu">
                <el-popover
                        placement="top-start"
                        width="400"
                        trigger="click"
                >
                    <p>姓名：{{ detailed.idName }}</p>
                    <p>身份证号：{{ detailed.idCode }}</p>
                    <p>身份住址：{{ detailed.idAddress }}</p>
                    <p>民族：{{ detailed.idNation }}</p>
                    <p>性别：{{ detailed.idSex }}</p>
                    <p>有效期：{{ detailed.idPermitStart }} - {{ detailed.idPermitEnd }}</p>
                    <p>签发机关：{{ detailed.idIssue }}</p>
                    <el-button slot="reference"
                               type="success"
                               icon="el-icon-check"
                               size="small"
                               plain
                               @click="getIdCardInfo(scope.row)"
                    >查看</el-button>
                </el-popover>
                <el-button class="tag-read" data-clipboard-text="我是可以复制的内容，请点击复制"
                           type="info"
                           size="small"
                           icon="el-icon-upload"
                           @click="opencopy(scope.row)">完善</el-button >
                <el-button type="primary"
                           icon="el-icon-delete"
                           size="small"
                           plain
                           @click.stop="handleDel(scope.row,scope.index)">删除</el-button>
            </template>
        </avue-crud>
    </div>
</template>

<script>
import NewUser from '../NewUser'
import { getHouseList } from '../../../../api/house'
import { getInfoById, createToken } from '../../../../api/capacity'
import { delInfo, getLeaseholderList, updateLeaseholder } from '../../../../api/leaseholder'
import Clipboard from 'clipboard'
export default {
  name: 'DataTable',
  components: {
    NewUser
  },
  data () {
    return {
      name: '',
      dialogVisible: false,
      res: {},
      data: [
      ],
      page: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      option0: {
        menuWidth: 380,
        addBtn: false,
        columnBtn: false,
        refreshBtn: false,
        searchBtn: false,
        delBtn: false,
        align: 'center',
        menuAlign: 'center',
        searchMenuSpan: 8,
        column: [
          {
            label: '租户ID',
            prop: 'uid',
            visdiplay: false,
            hide: false
          },
          {
            label: '租户姓名',
            prop: 'name',
            search: true
          },
          {
            label: '联系方式',
            prop: 'phone',
            rules: [{
              required: true,
              message: '请输入正确的手机号',
              trigger: 'blur'
            }
            ]
          },
          {
            label: '房屋',
            prop: 'house_id',
            type: 'select',
            cascaderItem: ['home_id'],
            dicData: [{ label: '北京', value: '178954021220909056' }],
            rules: [
              {
                required: true,
                message: '请选择所属房屋',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '房间',
            prop: 'home_id',
            type: 'select',
            dicFlag: false,
            hide: true,
            dicUrl: `api/home/getHomeInfo/{{key}}`,
            rules: [
              {
                required: true,
                message: '请选择房间',
                trigger: 'blur'
              }
            ]
          },
          {
            label: '房间',
            prop: 'home_name',
            addVisdiplay: false,
            editVisdiplay: false
          },
          {
            label: '工作单位',
            prop: 'work',
            type: 'textarea',
            span: 24
          },
          {
            label: '身份证正',
            prop: 'id_card_front',
            type: 'upload',
            imgWidth: 100,
            listType: 'picture-img',
            action: '/api/upload/headImgUpload'
          },
          {
            label: '身份证反',
            prop: 'id_card_back',
            type: 'upload',
            imgWidth: 100,
            listType: 'picture-img',
            action: '/api/upload/headImgUpload'
          }
        ]
      }
    }
  },
  computed: {
    detailed () {
      return this.res
    }
  },
  methods: {
    getIdCardInfo (info) {
      getInfoById(info.id).then(
        res => {
          this.res = res.data
          console.log(this.res)
        }
      )
    },
    opencopy (row) {
      var data
      createToken(row.id).then(res => {
        data = res.data
      })
      var clipboard = new Clipboard('.tag-read', {
        text: function ( ) {
          return data
        }
      })
      clipboard.on('success', e => {
        console.log('复制成功')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        console.log('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    },
    searchChange (params) {
      this.$message.success('搜索数据' + JSON.stringify(params))
      this.name = params.name
      console.log(params)
      const send = {
        currentPage: 1,
        pageSize: 100,
        name: params.name
      }
      this.page.pageSize = 100
      console.log(send)
      getLeaseholderList(send).then(data => {
        this.page.total = data.data.total
        this.data = data.data.data
      }).catch()
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    clickFinsh (val) {
      this.dialogVisible = val
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
      })
      const data = this.option0.column[3]
      data.dicData = info
    },
    rowUpdate (form, index, done, loading) {
      setTimeout(() => {
        this.$message.success('正在请求')
        loading()
      }, 1000)
      updateLeaseholder(form).then(res => {
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
      getLeaseholderList(send).then(data => {
        this.page.total = data.data.total
        this.data = data.data.data
      }).catch()
      this.$message.success('分页信息:' + JSON.stringify(page))
      // this.data.pop(1)
    },
    handleDel (row, index) {
      this.$message.success('删除数据' + JSON.stringify(row))
      delInfo(row.uid).then().catch()
    }
  },
  mounted () {
    this.mountedCol()
  },
  watch: {
  }
}
</script>

<style scoped>

</style>
