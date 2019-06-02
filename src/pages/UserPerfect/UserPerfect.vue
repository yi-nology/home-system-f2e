<template>
    <!-- d2-container 文档 https://doc.d2admin.fairyever.com/zh/sys-components/container.html -->
    <d2-container class="page-profile">
        <!--    <template slot="header">profile</template>-->
        <!--    <basic-form />-->
        <el-button class="tag-read" data-clipboard-text="我是可以复制的内容，请点击复制" @click="copy">立即阅读</el-button>
        <el-button class="tag-read" data-clipboard-text="234567 ，请点击复制" @click="copy">立即阅读</el-button>
    </d2-container>
</template>

<script>
// 组件
import './UserPerfect.scss'
import Clipboard from 'clipboard'
// 请删除下面代码中你不需要的部分

export default {
  name: 'UserPerfect',
  components: {
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
    copy() {
      var clipboard = new Clipboard('.tag-read',{
        text: function() {
          return '123245678'
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
    }
  }
}
</script>

<style lang="scss" scoped>
    @import 'UserPerfect';
</style>
