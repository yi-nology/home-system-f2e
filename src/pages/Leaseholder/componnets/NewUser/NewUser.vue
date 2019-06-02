<template>
    <avue-steps ref="asteps" :option="option" @change="change" @submit="submit">
        <template slot="contract">
            <el-tag>无合同ID可以不写</el-tag>
            <avue-form :option="item.option" v-model="form"></avue-form>
        </template>
        <template slot="userInfo">
            <avue-form :option="item.option" v-model="form"></avue-form>
        </template>
    </avue-steps>
</template>

<script>

import { setLeaseholder } from '../../../../api/leaseholder'
import { getHouseList } from '../../../../api/house'

export default {
  name: 'NewUser',
  data () {
    return {
      type: '',
      form: {},
      tag: 0,
      item: '',
      option: {
        switchBtn: true,
        column: [{
          label: '填写合同信息',
          prop: 'contract',
          description: '用于绑定合同',
          option: {
            formWidth: '90%',
            emptyBtn: false,
            submitBtn: false,
            column: [
              {
                label: '合同ID',
                span: 12,
                prop: 'contract_id',
                size: 'small',
                prefixIcon: 'el-icon-tickets'
              },
              {
                label: '合同内容',
                prop: 'content',
                type: 'textarea',
                size: 'small',
                prefixIcon: 'el-icon-tickets',
                span: 24
              },
              {
                label: '有效期',
                prop: 'startEnd',
                type: 'daterange',
                format: 'yyyy 年 MM 月 dd 日',
                valueFormat: 'yyyy-MM-dd',
                size: 'small',
                prefixIcon: 'el-icon-tickets',
                span: 24
              },
              {
                label: '缴费日期',
                prop: 'date',
                type: 'select',
                size: 'small',
                dicData: [],
                prefixIcon: 'el-icon-tickets',
                span: 8
              },
              {
                label: '缴费频率',
                prop: 'rate',
                type: 'silder',
                min: 1,
                step: 1,
                max: 12,
                showStops: true,
                prefixIcon: 'el-icon-tickets',
                span: 15
              }
            ]
          }
        },
        {
          label: '用户基础信息',
          prop: 'userInfo',
          description: '为了让您更加方便的管理用户信息',
          option: {
            formWidth: '90%',
            emptyBtn: false,
            submitBtn: false,
            column: [{
              label: '租户姓名',
              prop: 'name',
              size: 'small',
              span: 12
            },
            {
              label: '联系方式',
              prop: 'phone',
              size: 'small',
              rules: [{
                required: true,
                message: '请输入手机号',
                trigger: 'blur'
              }
              ],
              span: 12
            },
            {
              label: '所属房屋',
              prop: 'house_id',
              type: 'select',
              cascaderItem: ['home_id'],
              dicData: [{ label: '北京', value: '178954021220909056' }],
              rules: [
                {
                  required: true,
                  message: '请选择所属房屋',
                  trigger: 'blur'
                }
              ]
            },
            {
              label: '房间',
              prop: 'home_id',
              type: 'select',
              dicFlag: false,
              dicUrl: `api/home/getHomeInfo/{{key}}`,
              rules: [
                {
                  required: true,
                  message: '请选择房间',
                  trigger: 'blur'
                }
              ]
            },
            {
              label: '工作单位',
              prop: 'work',
              size: 'small',
              type: 'textarea',
              span: 24
            },
            {
              label: '身份证正',
              prop: 'id_card_front',
              type: 'upload',
              imgWidth: 80,
              listType: 'picture-img',
              action: '/api/upload/headImgUpload'
            },
            {
              label: '身份证反',
              prop: 'id_card_back',
              type: 'upload',
              imgWidth: 80,
              listType: 'picture-img',
              action: '/api/upload/headImgUpload'
            }
            ]
          }
        }]
      }
    }
  },
  methods: {
    submit (next) {
      next()
      if (this.$refs['asteps']._data.step === 3) {
        setLeaseholder(this.form).then()
        this.$emit('clickFinsh', false)
        this.form = []
      }
    },
    saveContract () {},
    change (item) {
      this.type = item.prop
      this.item = item
      // this.$message.success('当前步骤数据' + JSON.stringify(item))
      // console.log(item.step)
      this.$message.success('当前步骤数据' + JSON.stringify(this.form))
    },
    mountedCol () {
      const info = []
      getHouseList().then(data => {
        // console.log(data)
        for (var item in data.data) {
          const d = {
            label: data.data[item].house_name,
            value: data.data[item].house_id
          }
          info.push(d)
        }
      })
      const data = this.option.column[1].option.column[2]
      data.dicData = info
    },
    createDay () {
      const data = this.option.column[0].option.column[3]
      // console.log(data)
      var d = []
      for (var i = 1; i < 28; i++) {
        d.push({ 'value': i, 'label': i })
      }
      data.dicData = d
    }
  },
  watch: {
  },
  mounted () {
    this.mountedCol()
    this.createDay()
  }
}
</script>

<style scoped>

</style>
