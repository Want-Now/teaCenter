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
          <span class="locat-first">数据库管理</span>
          <img src="../../assets/icon/unfold.png" style="height: 12px">
          <span class="locat-second">乌龙茶品种资源数据库</span>
        </p>

        <div class="tableDiv">
          <p class="searchBar">
            <img src="../../assets/icon/search.png">
            <el-input type="text" placeholder="输入关键字" class="sortInput"></el-input>
            <el-button class="btn-normal btn-search">筛选</el-button>
            <el-button class="btn-normal btn-output">导出</el-button>
            <el-button class="btn-normal btn-output">编辑</el-button>
            <el-button class="btn-normal btn-output" @click="dialogVisible=!dialogVisible">新增</el-button>
          </p>
          <el-table
            stripe
            :data="teaVariety"
            :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
            <el-table-column fixed="left">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, teaVariety,scope.row)"
                  class="el-icon-remove"
                  size="small">
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="id"
              label="编号"
              fixed>
            </el-table-column>
            <el-table-column
              v-for="item in colConfigs"
              :key="item.label"
              :prop="item.label"
              :label="item.name">
            </el-table-column>

          </el-table>
          <div class="addBtnDiv">
            <el-button class="addBtn" @click="dialogVisible=!dialogVisible">
              <img src="../../assets/icon/add.png">
            </el-button>
          </div>
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
      <el-dialog
        title="新增"
        :visible.sync="dialogVisible"
        width="400px"
        class="centerDialog"
        center>
        <el-button class="btn-normal" @click="openSingleImport()">单条导入</el-button>
        <el-button class="btn-normal" @click="openMultiImport()">批量导入</el-button>
      </el-dialog>
    </el-main>
    <!--</el-container>-->

  </el-container>

</template>

<script>
  import TopBar from "../reuseComponent/topBar"
  import NavBar from "../reuseComponent/navBar"
  export default {
    name: "teaVarietyDatabase",
    components: {TopBar,NavBar},
    data(){
      this.colConfigs=[{label:'variety',name:'品系（种）'},{label:'sourceArea',name:'原产地'},{label:'treeShape',name:'树型'},
        {label:'treePerformance',name:'树姿'},{label:'branchDensity',name:'分枝密度'},
        {label:'suitablePickingMonth',name:'春茶适采月'}, {label:'suitablePickingMeadow',name:'春茶适采地'},{label:'suitablePickingPeriod',name:'春茶适采期'},
        {label:'budBody',name:'芽身'}, {label:'budColor',name:'芽叶色泽'},{label:'budPastel',name:'芽叶茸毛'},{label:'leafSize',name:'叶片大小'},
        {label:'leafShape',name:'叶形'},{label:'leafColor',name:'叶色'},
        {label:'leafBody',name:'叶身'},{label:'leafValue',name:'叶质'},{label:'leafVein',name:'叶脉'},{label:'leafMargin',name:'叶缘'},
        {label:'teethDepth',name:''}, {label:'teethSharpness',name:''},{label:'teethDensity',name:''},
        {label:'leafTip',name:'叶尖'},{label:'corolla',name:'花冠'},{label:'petals',name:'花瓣'},
        {label:'stylet',name:'花柱'},{label:'quality',name:'品质'},{label:'cords',name:'条索'},{label:'colorLustre',name:'色泽'},{label:'fragrance',name:'香气'},
        {label:'taste',name:'滋味'},{label:'note',name:'备注'}]
      return{
        teaVariety:[],
        dialogVisible:false,
      }
    },
    created() {
      this.$axios({
        url:'/database/germplasmResources',
        method:'get'
      }).then(response=>{
        this.teaVariety=response.data;
      })
        .catch(error=>console.log(error));
    },
    methods:{
      deleteRow(index,rows,row){
        this.$confirm('是否删除数据？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除数据',
          cancelButtonText: '放弃删除'
        })
          .then(() => {
            this.$axios({
              url:'/database/germplasmResources/'+row.id,
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
      },
      openMultiImport(){
        this.$router.push({path:'/MultiImport',query:{databaseName:'variety'}});
      },
    }

  }
</script>

<style scoped>
  .tableDiv{
    padding: 10px 100px;
  }
  .searchBar{
    height: 60px;
    line-height: 60px;
  }
  .searchBar .el-input{
    width: 15%;
  }
  .btn-output{
    float: right;
  }
  .btn-search{
    margin-left: 5%;
  }
  .pagination{
    background-color: white;
    text-align: center;
    margin: 0px;
    padding: 20px;
  }
  .addBtn{
    border: none;
    height: 80px;
    background-color: white;
  }
  .addBtnDiv{
    background-color: white;
  }
  .el-icon-remove{
    background-color: rgba(255,255,255,0);
    border: none;
    color: #ccadad;
  }
</style>
