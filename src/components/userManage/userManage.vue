<template>
  <el-container class="mainContainer">
    <el-header height="60px">
      <top-bar></top-bar>
    </el-header>
    <el-main>
      <nav-bar class="left"></nav-bar>
      <div class="right">
        <p class="location">
          <img src="../../assets/icon/unfold.png" style="height: 16px">
          <span class="locat-first">权限管理</span>
        </p>

        <div class="tableDiv">
          <p class="searchBar">
            <img src="../../assets/icon/search.png">
            <el-input type="text" placeholder="输入关键字" class="sortInput"></el-input>
            <el-button class="btn-normal">筛选</el-button>
            <el-button class="addBtn" @click="addDialogVisible=true">
              <img src="../../assets/icon/add.png">
            </el-button>
          </p>
          <el-table
            stripe
            :data="authorManage"
            :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
            <el-table-column
              prop="id"
              label="编号"
              sortable>
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名"
              sortable>
            </el-table-column>
            <el-table-column
              prop="role"
              label="角色"
              sortable>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center">
              <template slot-scope="scope">
                <el-button class="btn-normal" @click="checkInfo(scope.row)">查看</el-button>
                <el-button class="btn-normal" @click="freezeUser(scope.row)">冻结</el-button>
                <el-button class="btn-normal" @click="resetUser(scope.row)">重置</el-button>
                <!--@click="handleEdit(scope.$index, scope.row)"-->
              </template>
            </el-table-column>
          </el-table>
          <el-dialog
            title="添加用户"
            :visible.sync="addDialogVisible"
            width="30%"
            center>
            <el-form :model="newUser" ref="newUser" label-position='left' :rules="newUserRule">
              <el-form-item label="邮箱" prop="email">
                <el-input v-model="newUser.email" clearable></el-input>
              </el-form-item>
              <el-form-item label="用户名" prop="username">
                <el-input v-model="newUser.username" clearable></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="newUser.password" clearable></el-input>
              </el-form-item>
              <el-form-item label="工作地点" prop="workplace">
                <el-input v-model="newUser.workplace" clearable></el-input>
              </el-form-item>
              <el-form-item label="个人说明" prop="detail">
                <el-input v-model="newUser.detail" clearable></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer">
              <el-button @click="addDialogVisible = false">取 消</el-button>
              <el-button class="btn-normal" @click="addUser()">确 定</el-button>
            </span>
          </el-dialog>
          <p class="pagination">
            <!--<el-pagination-->
              <!--@size-change="handleSizeChange"-->
              <!--@current-change="handleCurrentChange"-->
              <!--:current-page="currentPage4"-->
              <!--:page-sizes="[10, 20, 30, 40]"-->
              <!--:page-size="100"-->
              <!--layout="total, sizes, prev, pager, next, jumper"-->
              <!--:total="400">-->
            <!--</el-pagination>-->
          </p>

        </div>

      </div>

    </el-main>
    <!--</el-container>-->

  </el-container>

</template>

<script>
  import TopBar from "../reuseComponent/topBar"
  import NavBar from "../reuseComponent/navBar"
  export default {
    name: "userManage",
    components: {TopBar,NavBar},
    data(){
      var checkEmail = (rule, value, callback) => {
        const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }
        setTimeout(() => {
          if (mailReg.test(value)) {
            callback()
          } else {
            callback(new Error('请输入正确的邮箱格式'));
          }
        }, 100)
      }
      return{
        authorManage:[],
        addDialogVisible:false,
        newUser:{},
        newUserRule:{
          username:[
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'}
          ],
          workplace:[
            {required: true, message: '请输入工作地点', trigger: 'blur'}
          ],
          email:[
            { validator: checkEmail, trigger: 'blur' }
          ]
        }
      }
    },
    created(){
      this.getUserRole();
    },
    methods:{
      getUserRole(){
        let that=this;
        this.$axios({
          method:'get',
          url:'/user',
          params:{
            id:1
          }
        }).then(response=>{
          that.authorManage=response.data;
        }).catch(error=>console.log(error));
      },
      addUser(){
        this.$refs['newUser'].validate((valid) => {
          if (valid) {
            this.$axios({
              url:'/user/adduser',
              method:'post',
              params:{
                email:this.newUser.email,
                username:this.newUser.username,
                password:this.newUser.password,
                detail:this.newUser.detail,
                workplace:this.newUser.workplace
              }
            }).then(response=>{
              if(response.status==200){
                this.$message({
                  message:'添加用户成功',
                  type:'success'
                });
                this.addDialogVisible=false;
                this.getUserRole();
              }else{
                this.$message.error('添加用户失败');
              }
            }).catch(error=>console.log(error));
          } else {
            console.log('error submit!!');
            return false;
          }
        });


      },
      checkInfo(row){
        this.$router.push({path:'/PersonManage',query:{userId:row.id,id:1}});
      },
      freezeUser(row){
        this.$axios({
          method: 'post',
          url:'/user/'+row.id,
          params:{
            id:1
          }
        }).then(response=>{
          if(response.status==200){
            this.$message({
              message:'冻结用户成功',
              type:'success'
            });
          }else{
            this.$message.error('冻结用户失败');
          }
        })
          .catch(error=>console.log(error));
      },
      resetUser(row){
        this.$axios({
          method:'put',
          url:'/user/'+this.row.id,
          params:{
            id:1
          }
        }).then(response=>{
          if(response.status==200){
            this.$message({
              message:'重置密码成功',
              type:'success'
            })
          }else{
            this.$message.error('重置密码失败');
          }
        })
          .catch(error=>console.log(error));
      }
    }

  }
</script>

<style scoped>
  .tableDiv{
    padding: 10px 100px;
  }
  .btnP{
    text-align: center;
  }
  .btnP .el-button{
    margin:10px;
    width: 120px;
  }
  .searchBar{
    height: 60px;
    line-height: 60px;
  }
  .searchBar .el-input{
    width: 15%;
  }
  .searchBar .el-button{
    margin-left: 80px;
  }
  .pagination{
    background-color: white;
    text-align: center;
    margin: 0px;
    padding: 20px;
  }
  .addBtn{
    border: none;
    margin-right: 30px;
    background-color: #f3f5fa;
    float: right;
  }
</style>


