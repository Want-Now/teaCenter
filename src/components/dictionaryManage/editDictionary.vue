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
          <span class="locat-first">字典管理</span>
          <img src="../../assets/icon/unfold.png" style="height: 12px">
          <span class="locat-second">{{databaseName}}</span>
          <img src="../../assets/icon/unfold.png" style="height: 12px">
          <span class="locat-second">{{dictionaryName}}</span>
        </p>

        <div class="tableDiv">
          <p class="searchBar">
            <img src="../../assets/icon/search.png">
            <el-input type="text" placeholder="输入关键字" class="sortInput"></el-input>
            <el-button class="btn-normal">筛选</el-button>
          </p>
          <el-table
            stripe
            :data="dictionaryInfo.slice((currentPage-1)*pageSize,currentPage*pageSize)"
            :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
            <el-table-column
              width="80px"
              fixed="left">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, dictionaryInfo,scope.row)"
                  class="el-icon-remove"
                  size="small">
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="dictionaryId"
              label="ID">
            </el-table-column>
            <el-table-column
              prop=""
              label="数据字段"
              align="center">
            </el-table-column>
            <el-table-column
              prop=""
              label="字典显示"
              align="center">
              <template slot-scope="scope">
                <el-input ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop=""
              label="排序">
              <template slot-scope="scope">

              </template>
            </el-table-column>
            <el-table-column
              prop="editor"
              label="编辑者">
            </el-table-column>
            <el-table-column
              prop="time"
              label="编辑时间">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="scope">
                <el-button class="btn-normal" @click="handleEdit(scope.row)">保存修改</el-button>
              </template>
            </el-table-column>
          </el-table>
          <p class="pagination">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="totalRow">
            </el-pagination>
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
    name: "editDictionary",
    components: {TopBar,NavBar},
    data(){
      return{
        dictionaryInfo:[],
        databaseName:'',
        totalRow:0,
        currentPage:1,
        pageSize:8,
        dictionaryName:'',
      }
    },
    created(){
      this.databaseName=this.$route.query.databaseName;
      this.dictionaryName=this.$route.query.dictionaryName;
    },
    methods:{
      handleEdit(row){

      },
      getDictionartInfo(){
        switch(this.$route.query.dbIndex){
          case 1:{
            this.databaseName='乌龙茶品种SNP指纹图谱数据库';
            this.$axios({
              url:'/dictionary/snp',
              method:'get'
            }).then(response=>{
              this.dictionaryInfo=response.data;
              this.totalRow=this.dictionaryInfo.length;
            }).catch(error=>console.log(error));
            break;
          }
          case 2:{
            this.databaseName='乌龙茶品种资源数据库';
            this.$axios({
              url:'/dictionary/germplasm',
              method:'get'
            }).then(response=>{
              this.dictionaryInfo=response.data;
              this.totalRow=this.dictionaryInfo.length;
            }).catch(error=>console.log(error));
            break;
          }
          case 3:{
            this.databaseName='一带一路贸易数据库';
            this.$axios({
              url:'/dictionary/tradeinfo',
              method:'get'
            }).then(response=>{
              this.dictionaryInfo=response.data;
              this.totalRow=this.dictionaryInfo.length;
            }).catch(error=>console.log(error));
            break;
          }
          case 4:{
            this.databaseName='福建省乌龙茶消费者购买行为数据库';
            this.$axios({
              url:'/dictionary/consume',
              method:'get'
            }).then(response=>{
              this.dictionaryInfo=response.data;
              this.totalRow=this.dictionaryInfo.length;
            }).catch(error=>console.log(error));
            break;
          }
        }
      },
      handleCurrentChange(val) {
        this.currentPage=val;
      },
      deleteRow(index, rows,row){
        this.$confirm('是否删除数据？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除数据',
          cancelButtonText: '放弃删除'
        })
          .then(() => {
            this.$axios({
              url:'/database/snpMap/'+row.id,
              method: 'delete'
            }).then(()=>{
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              rows.splice(index, 1);
            }).catch(error=>console.log(error));
          })
          .catch(action => {
            this.$message({
              type: 'info',
              message: action === 'cancel'
                ? '放弃删除'
                : '停留在当前页面'
            })
          });
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
  .locat-second{
    color: #595959;
    font-size: 12px;
    font-weight: bold;
    margin: 0 10px;
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
  .el-icon-remove{
    background-color: rgba(255,255,255,0);
    border: none;
    color: #ccadad;
  }
  .addBtn{
    background-color: rgba(255,255,255,0);
    float: right;
    border: none;
    height: 80px;
  }
</style>
