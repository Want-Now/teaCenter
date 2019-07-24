<template>
      <el-container class="mainContainer">
        <el-header height="60px">
          <top-bar>
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
                <span class="tableBlock">
                  <p>SNP指纹图谱数据库</p>
                  <el-table
                    stripe
                    :data="snp"
                    max-height="500px"
                    :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
                    <el-table-column
                      prop="dictionaryId"
                      sortable
                      width="70px"
                      label="ID">
                    </el-table-column>
                    <el-table-column
                      prop="dictionaryName"
                      label="字段名称"
                      center>
                    </el-table-column>
                  </el-table>
                </span>
                <span class="tableBlock">
                  <p>乌龙茶品种资源数据库</p>
                  <el-table
                    stripe
                    :data="germplasm"
                    max-height="500px"
                    :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
                    <el-table-column
                      prop="dictionaryId"
                      sortable
                      width="70px"
                      label="ID">
                    </el-table-column>
                    <el-table-column
                      prop="dictionaryName"
                      label="字段名称"
                      center>
                    </el-table-column>
                  </el-table>
                </span>
                <span class="tableBlock">
                  <p>一带一路贸易数据库</p>
                  <el-table
                    stripe
                    :data="tradeInfo"
                    max-height="500px"
                    :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
                    <el-table-column
                      prop="dictionaryId"
                      sortable
                      width="70px"
                      label="ID">
                    </el-table-column>
                    <el-table-column
                      prop="dictionaryName"
                      label="字段名称"
                      center>
                    </el-table-column>
                  </el-table>
                </span>
                <span class="tableBlock">
                  <p>乌龙茶消费者购买行为数据库</p>
                  <el-table
                    stripe
                    :data="consume"
                    max-height="500px"
                    :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
                    <el-table-column
                      prop="dictionaryId"
                      sortable
                      width="70px"
                      label="ID">
                    </el-table-column>
                    <el-table-column
                      center
                      prop="dictionaryName"
                      label="字段名称">
                    </el-table-column>
                  </el-table>
                </span>
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
          userid:'',
          username:'',
          snp:[],
          tradeInfo:[],
          consume:[],
          germplasm:[]

        }
      },
      created(){
          this.getInfo();
      },
      methods:{
          getInfo(){
            this.$axios({
              url:'/dictionary/snp',
              method:'get'
            }).then(response=>{
              this.snp=response.data;
            }).catch(error=>console.log(error));

            this.$axios({
              url:'/dictionary/germplasm',
              method:'get'
            }).then(response=>{
              this.germplasm=response.data;
            }).catch(error=>console.log(error));

            this.$axios({
              url:'/dictionary/tradeinfo',
              method:'get'
            }).then(response=>{
              this.tradeInfo=response.data;
            }).catch(error=>console.log(error));

            this.$axios({
              url:'/dictionary/consume',
              method:'get'
            }).then(response=>{
              this.consume=response.data;
            }).catch(error=>console.log(error));
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
  .tableBlock{
    display: inline-block;
    width:21%;
    vertical-align: top;
    text-align: center;
    margin-right: 1%;
  }
</style>
