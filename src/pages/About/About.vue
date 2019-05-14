<template>
  <!-- d2-container 文档 https://doc.d2admin.fairyever.com/zh/sys-components/container.html -->
  <d2-container class="page-About">
    <Me />
  </d2-container>
</template>

<script>
// 组件
import Me from './components/Me/index'
import { getProfile } from '../../api/profile'
// 请删除下面代码中你不需要的部分
export default {
  name: 'About',
  components: {
    Me
  },
  // 数据
  data () {
    return {}
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
    handleSubmit () {
      getProfile().then(res => {
        console.log(res)
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
@import './About.scss';
</style>
