<template>
    <div>
        <avue-carousel :option="img"></avue-carousel>
        <br />
        <el-card class="box-card">
            <div>
                <p>
                    房屋租赁收费管理系统是一款集房屋租赁合同管理和房屋租住管理的专业软件。系统包含房屋租赁合同管理、租户管理、房屋管理、房源管理、个人信息、等功能于一体的房屋租赁管理单位日常工作解决方案，实现了出租、收款、统计等功能的完美结合。
                </p>
            </div>
            <avue-form-detail  v-model="form" :option="option" >
                <template slot="qhdhForm" slot-scope="scope">
                    <el-tag>{{scope.row.userInfo}}</el-tag>
                </template>
            </avue-form-detail>
        </el-card>

    </div>
</template>

<script>
export default {
  name: 'Me',
  data () {
    return {
      img: {
        height: 300,
        data: [
          {
            title: '关于',
            href: 'https://avue.top',
            src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
          },
          {
            title: '一个',
            href: 'https://avue.top',
            src: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg'
          },
          {
            title: '我',
            href: 'https://avue.top',
            src: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg'
          }
        ]
      },
      form: {
        mail: 'zhangyi@murphyyi.com',
        qq: '540298190',
        wechat: 'murphy-yi'
      },
      option: {
        option: [
          {
            label: '联系我',
            prop: 'userInfo',
            icon: 'el-icon-edit-outline',
            column: [{
              label: '微信',
              prop: 'wechat'
            }, {
              label: 'QQ',
              prop: 'qq'
            }, {
              label: 'Email',
              prop: 'mail'
            }]
          }]
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
