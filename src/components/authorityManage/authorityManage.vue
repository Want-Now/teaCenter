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
          </p>
          <el-table
            stripe
            :data="authorManage"
            :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
            <el-table-column
              type="index">
            </el-table-column>
            <el-table-column
              prop="username"
              label="用户名"
              align="center"
              sortable>
            </el-table-column>
            <el-table-column
              prop="description"
              label="角色"
              sortable>
              <template slot-scope="scope">
                <a class="aLabel" @click="goRoleManage(scope.row)">{{scope.row.description}}</a>
              </template>
            </el-table-column>
            <el-table-column
              prop="level"
              label="权限"
              sortable>
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button class="btn-normal" @click="handleEdit(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
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
    name: "index",
    components: {TopBar,NavBar},
    data(){
      return{
        authorManage:[],

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
          url:'/user/role'
        }).then(response=>{
          that.authorManage=response.data;
        }).catch(error=>console.log(error));
      },
      handleEdit(row){
        this.$router.push({path:'/PersonAuthority',query:{username:row.username,role:row.description,roleId:row.role_id}});
      },
      goRoleManage(row){
        this.$router.push({path:'/RoleManage',query:{roleDiscription:row.description}});
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
  .aLabel{
    text-decoration: underline;
    color: #494e8f;
  }
</style>

