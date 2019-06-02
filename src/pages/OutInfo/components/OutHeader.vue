<template>
    <el-row class="header">
        <el-input class="header-input" v-on:input="search" v-model="input" placeholder="请输入您想查询的地区" :autofocus=false ></el-input>
        <el-button class="header-right" v-if="showClear" type="primary" @click="clearInput">取消</el-button>
    </el-row>
</template>

<script>
export default {
  name: 'OutHeader',
  data () {
    return {
      input: '',
      value: '',
      showClear: false
    }
  },
  methods: {
    clearInput () {
      this.input = ''
      this.showClear = false
    },
    search () {
      this.showClear = true
      this.$emit('searchValue', this.input)
      this.booleanShowClearNull()
    },
    booleanShowClearNull () {
      if (this.input === '') { this.showClear = false }
    }
  }
}
</script>

<style lang="stylus" scoped>
    .header
        display: flex
        height: 3.0rem
        background: #FFFFFF
        color: #EEEEEE
        .header-input
            flex: 1
            height: .64rem
            line-height: .64rem
            margin-top: .3rem
            margin-left: .2rem
            padding-left: .2rem
            background: #eeeeee
            border-radius: .2rem
            color: #ccc
        .header-right
            float: right
            line-height: .64rem
            text-align: center
            margin: .3rem
            border-radius: .2rem
</style>
