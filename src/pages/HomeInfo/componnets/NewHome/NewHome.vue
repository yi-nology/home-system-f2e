<template>
    <div>
        <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>

        <el-dialog title="新增房屋" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="房屋名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="房屋所属" :label-width="formLabelWidth">
                    <el-select v-model="form.house_id" placeholder="金盏A区">
                        <el-option
                                v-for="item in house_select"
                                :key="item.house_id"
                                :label="item.house_name"
                                :value="item.house_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="房屋大小" :label-width="formLabelWidth">
                    <el-input v-model="form.size" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="房间备注" :label-width="formLabelWidth">
                    <el-input v-model="form.remark" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="房屋价格" :label-width="formLabelWidth">
                    <el-input-number v-model="form.price" autocomplete="off" :precision="2" :step="0.1" :max="10000"></el-input-number>
                </el-form-item>
                <el-form-item label="水费单价" :label-width="formLabelWidth">
                    <el-input-number v-model="form.water" autocomplete="off" :precision="2" :step="0.1" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="电费单价" :label-width="formLabelWidth">
                    <el-input-number v-model="form.electric" autocomplete="off" :precision="2" :step="0.1" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="网费单价" :label-width="formLabelWidth">
                    <el-input-number v-model="form.net" autocomplete="off" :precision="2" :step="0.1" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="备注单价" :label-width="formLabelWidth">
                    <el-input-number v-model="form.remark_price" autocomplete="off" :precision="2" :step="0.1" :max="100"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { setHome, delHome } from '../../../../api/home'
import { getHouseList } from '../../../../api/house'
export default {
  name: 'NewHome',
  created () {
    this.create()
  },
  data () {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      house_select: [],
      form: {
        name: '',
        house_id: '',
        size: '',
        remark: '',
        price: '',
        water: '',
        electric: '',
        net: '',
        remark_price: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    refreshChange ({ page, searchForm }) {
      this.$message({
        message: `当前的返回的分页对象${JSON.stringify(page)} 搜索表单对象${JSON.stringify(searchForm)}`,
        type: 'success'
      })
    },
    rowDel (form, index) {
      this.$message.success('删除数据' + JSON.stringify(form))
      delHome(form).thin().catch()
    },
    rowUpdate (form, index, done, loading) {
      setTimeout(() => {
        this.$message.success('正在请求')
        loading()
      }, 1000)
      setHome(form).thin(res => {
        console.log(res)
        this.$message.success('请求成功')
      }
      ).catch(err => {
        console.log(err)
        this.$message.success('请求失败')
      })
      setTimeout(() => {
        this.$message.success('编辑数据' + JSON.stringify(form) + '数据序号' + index)
        done()
      }, 2000)
    },
    rowSave (form, done, loading) {
      setTimeout(() => {
        this.$message.success('正在请求')
        loading()
      }, 1000)
      setHome(form).thin(res => {
        console.log(res)
        this.$message.success('请求成功')
      }
      ).catch(err => {
        console.log(err)
        this.$message.success('请求失败')
      })
      setTimeout(() => {
        this.$message.success('新增数据' + JSON.stringify(form))
        done()
      }, 2000)
    },
    submit () {
      this.dialogFormVisible = false
      console.log(this.form)
    },

    create () {
      getHouseList().then(data => {
        console.log(data)
        this.house_select = data.data
      })
    }
  },
  watch: {
    text () {
      if (this.text === true) {
        this.permission = {
          delBtn: true,
          addBtn: true,
          editBtn: true
        }
        this.option.menu = true
      } else {
        this.permission = {
          delBtn: false,
          addBtn: false,
          editBtn: false
        }
        this.option.menu = false
      }
    }
  }
}
</script>

<style scoped>

</style>
