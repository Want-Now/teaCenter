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
          <span class="locat-second">乌龙茶品种SNP指纹图谱数据库</span>
          <img src="../../assets/icon/unfold.png" style="height: 12px" v-if="singleInput">
          <span class="locat-second" v-if="singleInput">单条导入</span>
        </p>

        <div class="tableDiv">
          <p class="searchBar">
            <img src="../../assets/icon/search.png">
            <el-input v-model="search" type="text" placeholder="输入关键字" class="sortInput"></el-input>
            <el-button class="btn-normal btn-search" v-if="!singleInput&&!infoEdit" @click="searchInfo()">筛选</el-button>
            <el-button class="btn-normal btn-output" v-if="!singleInput&&!infoEdit">导出</el-button>
            <el-button class="btn-normal btn-output" v-if="!singleInput&&!infoEdit" @click="editTable()">编辑</el-button>
            <el-button class="btn-normal btn-output" @click="dialogVisible=!dialogVisible" v-if="!singleInput&&!infoEdit">新增</el-button>
            <el-button class="btn-normal btn-output" @click="backOrigin" v-if="singleInput||infoEdit">返回</el-button>
            <el-button class="btn-normal btn-output" v-if="infoEdit" @click="uploadEdit()">完成</el-button>
            <el-button class="btn-normal btn-output" @click="" v-if="singleInput">导入</el-button>
          </p>
          <el-table
            v-show="!singleInput"
            stripe
            :data="databaseDisplay"
            :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
            <el-table-column
              v-show="!infoEdit"
              fixed="left">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="deleteRow(scope.$index, dataBase,scope.row)"
                  class="el-icon-remove"
                  size="small">
                </el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="teaSpecies"
              label="茶树品种"
              width="120px"
              center>
            </el-table-column>
            <el-table-column
              v-for="{label} in colConfigs"
              :key="label"
              :prop="label"
              :label="label">
            </el-table-column>
          </el-table>
          <div class="addBtnDiv" v-if="!singleInput&&!infoEdit">
            <el-button class="addBtn" @click="dialogVisible=!dialogVisible">
              <img src="../../assets/icon/add.png">
            </el-button>
          </div>
          <!--<p class="pagination">-->
            <!--<el-pagination-->
              <!--@size-change="handleSizeChange"-->
              <!--@current-change="handleCurrentChange"-->
              <!--:current-page="currentPage4"-->
              <!--:page-sizes="[10, 20, 30, 40]"-->
              <!--:page-size="100"-->
              <!--layout="total, sizes, prev, pager, next, jumper"-->
              <!--:total="400">-->
            <!--</el-pagination>-->
          <!--</p>-->
          <!--<el-table-->
            <!--v-show="singleInput"-->
            <!--stripe-->
            <!--:data="addSingleData"-->
            <!--:header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">-->
            <!--<el-table-column-->
              <!--center-->
              <!--prop="teaSpecies"-->
              <!--label="茶树品种"-->
              <!--width="100px">-->
              <!--<template slot-scope="scope">-->
                <!--<el-input type="text"></el-input>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--v-for="{label} in colConfigs"-->
              <!--:key="label"-->
              <!--:prop="label"-->
              <!--:label="label">-->
              <!--<template slot-scope="scope">-->
                <!--<el-select v-model="selectValue" placeholder="请选择">-->
                  <!--<el-option-->
                    <!--v-for="item in options"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</template>-->
            <!--</el-table-column>-->
          <!--</el-table>-->

          <!--<el-table-->
            <!--v-show="infoEdit"-->
            <!--stripe-->
            <!--:data="editData"-->
            <!--:header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">-->
            <!--<el-table-column-->
              <!--center-->
              <!--prop="teaSpecies"-->
              <!--label="茶树品种"-->
              <!--width="100px">-->
              <!--<template slot-scope="scope">-->
                <!--<el-input type="text" :placeholder="scope.row.teaSpecies"></el-input>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--v-for="{label} in colConfigs"-->
              <!--:key="label"-->
              <!--:prop="label"-->
              <!--:label="label">-->
              <!--<template slot-scope="scope">-->
                <!--<el-select v-model="selectValue" placeholder="">-->
                  <!--<el-option-->
                    <!--v-for="item in options"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</template>-->
            <!--</el-table-column>-->
          <!--</el-table>-->
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
    name: "snpManage",
    components: {TopBar,NavBar},
    data(){
      this.colConfigs=[{label:'cs1'},{label:'cs115'},{label:'cs13'},{label:'cs15'},
        {label:'cs167'},{label:'cs201'},{label:'cs217'},{label:'cs3'},{label:'cs40'},
        {label:'cs5'},{label:'cs68'},{label:'cs84'},{label:'cs10'},{label:'cs116'},
        {label:'cs130'},{label:'cs150'},{label:'cs170'},{label:'cs202'},{label:'cs218'},
        {label:'cs30'},{label:'cs43'},{label:'cs51'},{label:'cs7'},{label:'cs85'},{label:'cs104'},
        {label:'cs117'},{label:'cs131'},{label:'cs156'},{label:'cs177'},{label:'cs207'},
        {label:'cs219'},{label:'cs31'},{label:'cs44'},{label:'cs52'},{label:'cs74'},{label:'cs88'},
        {label:'cs105'},{label:'cs118'},{label:'cs132'},{label:'cs157'},{label:'cs180'},
        {label:'cs208'},{label:'cs22'},{label:'cs32'},{label:'cs45'},{label:'cs54'},{label:'cs75'},
        {label:'cs9'},{label:'cs111'},{label:'cs119'},{label:'cs134'},{label:'cs16'},{label:'cs190'},
        {label:'cs210'},{label:'cs23'},{label:'cs33'},{label:'cs46'},{label:'cs55'},{label:'cs76'},
        {label:'cs91'},{label:'cs112'},{label:'cs12'},{label:'cs139'},{label:'cs163'},{label:'cs191'},
        {label:'cs212'},{label:'cs25'},{label:'cs36'},{label:'cs47'},{label:'cs57'},{label:'cs79'},
        {label:'cs93'},{label:'cs113'},{label:'cs122'},{label:'cs141'},{label:'cs164'},{label:'cs198'},
        {label:'cs213'},{label:'cs26'},{label:'cs39'},{label:'cs48'},{label:'cs66'},{label:'cs8'},
        {label:'cs94'},{label:'cs114'},{label:'cs124'},{label:'cs146'},{label:'cs166'},{label:'cs20'},
        {label:'cs215'},{label:'cs28'},{label:'cs4'},{label:'cs49'},{label:'cs67'},{label:'cs81'},{label:'cs95'}]
      return{
        dataBase:[],
        databaseDisplay:[],
      // {teaSpecies:'nihao',cs1:'a'}
        id:1,
        dialogVisible:false,
        singleInput:false,
        selectValue:'',
        options:[{}],
        addSingleData:[{}],
        editData:[],
        infoEdit:false,
        search:''
      }
    },
    created(){
      this. getSnpMap();
    },
    computed:{

    },
    methods:{
      getSnpMap(){
        let that=this;
        this.$axios({
          method:'get',
          url:'/database/snpMap',
        }).then(response=>{
          that.dataBase=response.data;
          that.databaseDisplay=response.data;

        }).catch(error=>{
          console.log(error);
        });
      },
      deleteRow(index,rows,row){
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
      },
      openSingleImport(){
        this.dialogVisible = false;
        this.singleInput=true;
      },
      openMultiImport(){
        this.$router.push({path:'/MultiImport',query:{databaseName:'snp'}});
      },
      backOrigin(){
        this.singleInput=false;
        this.infoEdit=false;
      },
      editTable(){
        this.infoEdit=!this.infoEdit;
      },
      searchInfo(){
          var search=this.search;
          if(search){
            this.databaseDisplay=this.dataBase.filter(data => !search || data.teaSpecies.toLowerCase().includes(search.toLowerCase()));
          }
      }
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
    margin-left: 20px;
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

