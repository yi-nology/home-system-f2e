<template>
    <!--   d2-container 文档 https://doc.d2admin.fairyever.com/zh/sys-components/container.html -->
    <div>
        <OutHeader v-on:searchValue="search"></OutHeader>
        <Contact v-model="list" ></Contact>
        <div v-if="flag"><infinite-loading @infinite="infiniteHandler"></infinite-loading></div>
    </div>
</template>

<script>
// 组件

// 请删除下面代码中你不需要的部分
import OutHeader from './components/OutHeader'
import Contact from './components/Contact'
import InfiniteLoading from 'vue-infinite-loading'
// import axios from 'axios'
import { getOutData } from '../../api/search'

// const api = 'http://hn.algolia.com/api/v1/search_by_date?tags=story'

export default {
  name: 'OutInfo',
  components: {
    Contact,
    OutHeader,
    InfiniteLoading
  },
  // 数据
  data () {
    return {
      page: 0,
      list: [],
      searchData: {
        input: '',
        page: 0,
        size: 10
      },
      flag: false,
      newData: false
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {
    'searchData.input': {
      deep: true,
      handler (newVal, oldVal) {
        if (newVal === '') {
          this.list.length = 0
        }
      }
    }
  },
  // 生命周期钩子
  beforeCreate () {
  },
  created () {
  },
  beforeMount () {
  },
  mounted () {
  },
  beforeUpdate () {
  },
  updated () {
  },
  activated () {
  },
  deactivated () {
  },
  beforeDestroy () {
  },
  destroyed () {
  },
  // 事件处理方法
  methods: {
    search (input) {
      console.log(input)
      if (input !== '') {
        this.searchData.input = input
        this.searchData.page = 0
        this.searchData.size = 10
        this.flag = true
      } else {
        this.flag = false
        this.searchData.input = ''
      }
    },
    infiniteHandler ($state) {
      console.log($state)
      getOutData(this.searchData).then(
        res => {
          const info = res.data.data
          console.log(info)
          if (info.length) {
            this.searchData.page += 1
            this.list.push(...info)
            $state.loaded()
          } else {
            $state.complete()
          }
        }
      )
    }
  }

}
</script>

<!--<style lang="scss" scoped>-->
<!--@import 'OutInfo';-->
<!--</style>-->
