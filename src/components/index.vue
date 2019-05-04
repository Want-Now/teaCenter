<template>
      <el-container class="mainContainer">
        <el-header height="60px">
          <top-bar :username="username" :userid="userid">

          </top-bar>

        </el-header>
        <!--<el-container>-->
          <!--<el-aside width="240px">-->

          <!--</el-aside>-->
          <el-main>
            <nav-bar class="left"></nav-bar>
            <div class="right">
              <p class="location">
                <img src="../assets/icon/unfold.png" style="height: 16px">
                <span class="locat-first">首页</span>
              </p>
              <div class="tableDiv">
                <el-table
                  stripe
                  :data="newMessage"
                  :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
                  <el-table-column
                    prop="message"
                    label="未读消息">
                  </el-table-column>
                  <el-table-column
                    prop="date"
                    width="200px">
                  </el-table-column>
                  <el-table-column
                    type="selection"
                    width="55px">
                  </el-table-column>
                </el-table>
                <p class="btnP">
                  <el-button class="btn-normal" @click="toIndexAll">所有消息</el-button>
                  <el-button class="btn-normal">标为已读</el-button>
                  <el-button class="btn-normal">删除</el-button>
                </p>
              </div>

            </div>

          </el-main>
        <!--</el-container>-->

      </el-container>

</template>

<script>
    import TopBar from "./reuseComponent/topBar"
    import NavBar from "./reuseComponent/navBar"
    export default {
        name: "index",
      components: {TopBar,NavBar},
      data(){
        return{
          newMessage:[{message:'dadsadasd',date:'dsadsa'},{message:'dadsadasd',date:'dsadsa'}],
          userid:'',
          username:'',
        }
      },
      created(){
        this.getUserInfo();
      },
      methods:{
        toIndexAll(){
          this.$router.push('/IndexAll');
        },
        getUserID(){
          let that=this;
          this.$axios({
            method:'get',
            url:'/myinformation'
          }).then(response=>{
            that.userid=response.data.id;
            that.username=response.data.username;
          }).catch(error=>{console.log(error);});

        },
        getUserInfo(){
          let that=this;
          this.$axios({
            method:'get',
            url:'/information',
            params:{
              id:1
            }
          }).then(response=>{
            that.username=response.data.username;
          }).catch(error=>{console.log(error);});
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
</style>
