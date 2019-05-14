<template>
    <!-- d2-container 文档 https://doc.d2admin.fairyever.com/zh/sys-components/container.html -->
    <d2-container class="page-profile">
        <!--    <template slot="header">profile</template>-->
        <!--    <basic-form />-->
        <div style="display:table;margin:60px auto;" v-if = '!flag'  >
            <el-card :body-style="{ padding: '50px' }" shadow="hover" class="d2-card" style="width: 500px;"  >
                <profile-form v-bind:flag="flag" v-bind:info="info" @changeFlag='onButton'/>
            </el-card>
        </div>
        <div  v-if = 'flag'>
            <profile-info v-bind:info="info" />
            <el-button style="display:table;margin:60px auto;"  type="primary" plain @click="onButton">修改</el-button>
        </div>

        <!--    <template slot="footer">自动生成 1 个组件</template>-->
    </d2-container>
</template>

<script>
// 组件
import ProfileForm from './components/profileForm'
import ProfileInfo from './components/profileInfo'
import './Profile.scss'
import { getProfile } from '../../api/profile'
// 请删除下面代码中你不需要的部分

export default {
  name: 'profile',
  components: {
    ProfileInfo,
    ProfileForm
  },
  // 数据
  data () {
    return {
      flag: true,
      obj: {},
      sizeValue: '',
      info: {}
    }
  },
  // 计算属性
  computed: {
  },
  // 侦听器
  watch: {},
  // 生命周期钩子
  beforeCreate () {},
  created () {
    this.create()
  },
  beforeMount () {},
  mounted () {
  },
  beforeUpdate () {},
  updated () {},
  activated () {},
  deactivated () {},
  beforeDestroy () {},
  destroyed () {},
  // 事件处理方法
  methods: {
    onButton () {
      this.flag = !this.flag
    },
    create () {
      getProfile().then(res => {
        this.info = res.data
        // 返回数据
      })
        .catch(err => {
          console.log(err)
          // 异常情况
        })
    }
  }
}
</script>

<style lang="scss" scoped>
    @import './Profile.scss';
</style>
