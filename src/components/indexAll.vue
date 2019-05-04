<template>
  <el-container class="mainContainer">
    <el-header height="60px">
      <top-bar></top-bar>
    </el-header>
    <el-main>
      <nav-bar class="left"></nav-bar>
      <div class="right">
        <p class="location">
          <img src="../assets/icon/unfold.png" style="height: 16px">
          <span class="locat-first">首页</span>
          <img src="../assets/icon/unfold.png" style="height: 12px">
          <span class="locat-second">所有消息</span>
        </p>

        <div class="tableDiv">
          <p class="searchBar">
            <img src="../assets/icon/search.png">
            <!--<el-col :span="5">-->
              <el-input type="text" placeholder="输入关键字" class="sortInput"></el-input>
            <!--</el-col>-->
            <span class="dateSpan">
              <el-date-picker
                class="datePicker"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </span>

            <!--</el-col>-->
            <el-button class="btn-normal">筛选</el-button>
            <el-button class="btn-normal">删除</el-button>
          </p>
          <el-table
            stripe
            show-header="false"
            :data="newMessage"
            :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
            <el-table-column
              prop="message"
              label="所有消息">
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
          <p class="pagination">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
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

      }
    },

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
  .dateSpan{
    margin-left: 20%;
    width: 50%;
  }
  .el-date-picker{
    width: 100%;
  }
  .searchBar .el-button{
    margin-right: 20px;
    float: right;
  }
  .pagination{
    background-color: white;
    text-align: center;
    margin: 0px;
    padding: 20px;
  }
</style>
