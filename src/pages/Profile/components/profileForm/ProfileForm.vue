<template>
    <avue-form ref="form" v-model="obj" :option="option" @submit="submit" :upload-before="uploadBefore"
               :upload-after="uploadAfter">
<!--        <template slot-scope="scope" slot="menuForm">-->
<!--            <el-button @click="tip">自定义按钮</el-button>-->
<!--        </template>-->
    </avue-form>

</template>

<script>
import { setProfile } from '../../../../api/profile'

export default {
  props: ['flag', 'info'],
  name: 'ProfileForm',
  // 请删除下面代码中你不需要的部分
  data () {
    return {
      obj: {},
      sizeValue: ''
    }
  },
  // 计算属性
  computed: {
    /*
    column: [{
          label: '用户名',
          prop: 'username',
          tip: '这是信息提示',
          span: 8,
          maxlength: 3,
          suffixIcon: 'el-icon-tickets',
          prefixIcon: 'el-icon-tickets',
          minlength: 2,
          rules: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          change: ({ value, column }) => {
            const data = this.obj
            data.address = value
            this.$message.success('address change')
          },
          click: ({ value, column }) => {
            this.$message.success('click')
          }
        },
     */
    option () {
      return {
        size: this.sizeValue,
        submitText: '更新',
        emptyBtn: false,
        column: [
          {
            label: '用户头像',
            prop: 'header_url',
            type: 'upload',
            showFileList: false,
            listType: 'picture-img',
            span: 24,
            tip: '只能上传jpg/png用户头像，且不超过4M',
            action: 'https://jsonplaceholder.typicode.com/posts/'
          },
          {
            label: '姓名',
            prop: 'name',
            span: 24,
            rules: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            }]
          },
          {
            label: '手机号',
            span: 24,
            prop: 'phone',
            maxlength: 11,
            rules: [{
              required: true,
              pattern: /^1[34578]\d{9}$/,
              message: '目前只支持中国大陆的手机号码'
            }]
          },
          {
            label: '地址',
            span: 24,
            prop: 'address',
            type: 'textarea'
          }
        ]
      }
    }
  },
  // 侦听器
  watch: {},
  // 生命周期钩子
  beforeCreate () {},
  created () {},
  beforeMount () {},
  mounted () {
    this.obj = this.info
  },
  beforeUpdate () {},
  updated () {},
  activated () {},
  deactivated () {},
  beforeDestroy () {},
  destroyed () {},
  // 事件处理方法
  methods: {
    submit () {
      // this.$message.success('当前数据' + JSON.stringify(this.obj))
      this.$message.success('数据提交成功')
      setProfile(this.obj).then(res => {
        console.log(res)
        // 返回数据
        this.$router.push('/profile')
      })
        .catch(err => {
          console.log(err)
          // 异常情况
        })
      this.$emit('changeFlag')
    },
    uploadBefore (file, done, loading) {
      console.log(file)
      done()
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt4M = file.size / 1024 / 1024 < 4

      if (!(isJPG || isPNG)) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt4M) {
        this.$message.error('上传头像图片大小不能超过 4MB!')
      }
      return (isJPG || isPNG) && isLt4M
    },
    uploadAfter (res, done, loading) {
      console.log(res)
      setProfile(res).thin(
        console.log(res)
      ).catch(
        err => {
          console.log(err)
          // 异常情况
        }
      )
      // done()
      // this.$message.success('上传后的方法')
    }
  }
}
</script>

<style scoped>

</style>
