<template>
    <div >
        <el-row :gutter="20" class="pd">
            <el-col :span="16">
                <div class="grid-content bg-purple pd">
                    <avue-form-detail v-model="this.info" :option="option">
                        <template slot="profileForm" slot-scope="scope">
                            <el-tag>{{scope.row.profile}}</el-tag>
                        </template>
                    </avue-form-detail>
                </div>
            </el-col>
            <el-col :span="7.5">
                <el-card class="grid-content bg-purple " :body-style="{ padding: '30px' }">
                    <img :src="this.info.header_url"
                         class="image">
                </el-card>
            </el-col>
            <el-col :span="24"  >
                <div class="grid-content bg-purple pd" >
                    <avue-crud :data="this.info.house" :option="option1"></avue-crud>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
  props: ['info'],
  name: 'ProfileInfo',
  data () {
    return {
      url: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
      option1: {
        menu: false,
        searchBtn: false,
        columnBtn: false,
        refreshBtn: false,
        cellBtn: false,
        selectClearBtn: false,
        addBtn: false,
        title: '拥有房屋',
        page: false,
        align: 'center',
        column: [
          {
            label: '名称',
            prop: 'houseName'
          },
          {
            label: '地址',
            prop: 'houseAddress'
          }
        ]
      },
      option: {
        option: [
          {
            label: '个人信息',
            prop: 'profile',
            icon: 'el-icon-edit-outline',
            column: [{
              label: '用户姓名',
              prop: 'name',
              span: 24
            }, {
              label: '联系电话',
              prop: 'phone',
              span: 24
            }, {
              label: '当前住址',
              prop: 'address',
              span: 24
            }]
          }]
      },
      house: { stripe: true }
    }
  }
}
</script>

<style scoped>
    .el-row {
        margin-bottom: 30px;
    :last-child {
        margin-bottom: 0;
    }

    }
    .el-col {
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #faf1ff;
    }

    .bg-purple {
        background: #ffffff;
    }

    .bg-purple-light {
        background: #e5e9f2;
    }

    .grid-content {
        border-radius: 10px;
        min-height: 36px;
    }

    .pd {
        padding: 50px;
    }

    .image {
        display: block;
        width: 200px;
        height: 200px;
    }
</style>
