<template>
    <d2-container :filename="filename">
        <template slot="header">Page 1 header</template>
        Hello World
        <button @click="handleSubmit"> 按钮</button>
    </d2-container>
</template>

<script>

import { getProfile } from '../../../api/profile'

export default {
  name: 'page1',
  data () {
    return {
      filename: __filename
    }
  },
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
