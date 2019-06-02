<template>
  <!-- d2-container 文档 https://doc.d2admin.fairyever.com/zh/sys-components/container.html -->
  <d2-container class="page-About">
    <Me />
  </d2-container>
</template>

<script>
// 组件
import Me from './components/Me/index'
// 请删除下面代码中你不需要的部分
export default {
  name: 'About',
  components: {
    Me
  },
  // 数据
  data () {
    return {
      searchData: {
        input: '北京',
        page: 1,
        size: 2
      }
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 生命周期钩子
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {},
  beforeUpdate () {},
  updated () {},
  activated () {},
  deactivated () {},
  beforeDestroy () {},
  destroyed () {},
  // 事件处理方法
  methods: {
    open () {
      this.$message('这是一条消息提示')
      console.log(this.searchData)
    }
  }
}

</script>

<style lang="scss" scoped>
@import './About.scss';
</style>
