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
          <span class="locat-second">价格指数</span>
        </p>

        <div class="tableDiv">
          <p class="searchBar">
            <img src="../../assets/icon/search.png">
            <el-input type="text" placeholder="输入关键字" class="sortInput"></el-input>
            <el-button class="btn-normal btn-search">筛选</el-button>
            <el-button class="btn-normal btn-output">导出</el-button>
            <el-button class="btn-normal btn-output">编辑</el-button>
            <el-button class="btn-normal btn-output">新增</el-button>
          </p>
          <el-tabs v-model="activeCard" @tab-click="handleClick">
            <el-tab-pane label="95后现制奶茶消费数据库-基本信息" name="basicInfo">
              <el-table
                stripe
                :data="basicInfoData"
                :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
                <el-table-column
                  width="80px"
                  fixed="left">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, basicInfoData,scope.row)"
                      class="el-icon-remove"
                      size="small">
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  v-for="item in basicInfoCol"
                  :key="item.name"
                  :prop="item.name"
                  :label="item.label">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="95后现制奶茶消费数据库-因素关注程度" name="factor">
              <el-table
                stripe
                :data="factorData"
                :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
                <el-table-column
                  width="80px"
                  fixed="left">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, factorData,scope.row)"
                      class="el-icon-remove"
                      size="small">
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  v-for="item in factorCol"
                  :key="item.name"
                  :prop="item.name"
                  :label="item.label">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="福建省乌龙茶消费者购买行为数据库-消费者的个性特征" name="feature">
              <!--茶叶产值-->
              <el-table
                stripe
                :data="featureData"
                :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
                <el-table-column
                  width="80px"
                  fixed="left">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, featureData,scope.row)"
                      class="el-icon-remove"
                      size="small">
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  v-for="item in featureCol"
                  :key="item.name"
                  :prop="item.name"
                  :label="item.label">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="福建省乌龙茶消费者购买行为数据库-消费者的消费习惯和购买情况" name="habits">
              <!--茶叶产值-->
              <el-table
                stripe
                :data="habitsData"
                :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
                <el-table-column
                  width="80px"
                  fixed="left">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, habitsData,scope.row)"
                      class="el-icon-remove"
                      size="small">
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  v-for="item in habitsCol"
                  :key="item.name"
                  :prop="item.name"
                  :label="item.label">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="福建省乌龙茶消费者购买行为数据库-消费者对茶叶的认知度" name="recognition">
              <!--茶叶产值-->
              <el-table
                stripe
                :data="recognitionData"
                :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
                <el-table-column
                  width="80px"
                  fixed="left">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="deleteRow(scope.$index, recognitionData,scope.row)"
                      class="el-icon-remove"
                      size="small">
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  v-for="item in recognitionCol"
                  :key="item.name"
                  :prop="item.name"
                  :label="item.label">
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
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
    name: "consumerDatabase",
    components: {TopBar,NavBar},
    data(){
      this.basicInfoCol=[
        {label:'出生日期',name:'birthday'},{label:'性别',name:'gender'},
        {label:'月可支配收入',name:'income'},{label:'消费现制奶茶的频率',name:'consumeFrequency'},
        {label:'消费现制奶茶的方式',name:'consumeWay'},{label:'消费现制奶茶的单价',name:'consumePrice'},
        {label:'常去的现制奶茶店',name:'shop'},{label:'常去的现制奶茶店位置',name:'shopLocation'}
      ];
      this.factorCol=[
        {label:'产品符合个人口味偏好',name:'personalTaste'},{label:'产品更新速度快',name:'updateFast'},
        {label:'产品可选种类丰富',name:'variety'},{label:'产品是否使用鲜奶',name:'freshMilk'},
        {label:'产品茶基是否使用鲜茶叶',name:'freshTea'},{label:'产品包装设计人性化',name:'packageHumanized'},
        {label:'产品包装时尚、新潮',name:'packageFashion'},{label:'店内设座',name:'seat'},
        {label:'店内装修风格',name:'decorateStyle'},{label:'卫生状况',name:'healthCondition'},
        {label:'店员服务态度',name:'serviceAttitude'},{label:'等餐时间',name:'waitingTime'},
        {label:'产品口碑',name:'evaluation'},{label:'品牌知名度',name:'profile'},
        {label:'社交平台上他人的推荐',name:'socialRecommend'},{label:'亲朋好友的推荐',name:'friendRecommend'},
        {label:'商家或商品的平面广告',name:'advertisement'},{label:'是否为网红产品',name:'ispopular'},
        {label:'茶点、甜点',name:'dessert'},{label:'周边产品（如手机壳、卡贴）',name:'peripheralProduct'},
        {label:'常去该现制奶茶品牌的原因',name:'reason'}
      ];
      this.featureCol=[
        {label:'地区',name:'district'},{label:'性别',name:'gender'},
        {label:'年龄',name:'age'},{label:'职业',name:'job'},
        {label:'月收入',name:'income'},{label:'受教育程度',name:'education'},
      ];
      this.habitsCol=[
        {label:'茶龄',name:'teaAge'},{label:'喝乌龙茶的频率',name:'drinkFrequency'},
        {label:'每次饮茶量',name:'teaAmount'},{label:'年花费金额',name:'cost'},
        {label:'购买频率',name:'purchaseFrequency'},{label:'购买原因',name:'purchaseReason'},
        {label:'购买途径',name:'purchaseWay'}, {label:'相关知识',name:'knowledge'},
        {label:'最主要信息来源',name:'infoSource'},{label:'标签最关注',name:'labelFocus'}
      ];
      this.recognitionCol=[
        {label:'质量安全关注度',name:'qualitySafety'},{label:'茶叶分级了解程度',name:'classificationUnderstanding'},
        {label:'食品认证信任度',name:'foodTrust'},
      ];


      return{
        activeCard:'basicInfo',
        basicInfoData:[],
        factorData:[],
        featureData:[],
        habitsData:[],
        recognitionData:[]


      }
    },
    created(){
      this.getBasicInfo();
      this.getFactorData();
      this.getFeatureData();
      this.getHabitsData();
      this.getRecognition();
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getBasicInfo(){
        this.$axios({
          url:'/database/basicInfo',
          method:'get'
        }).then(response=>{
          this.basicInfoData=response.data;
        }).catch(error=>console.log(error));
      },
      getFactorData(){
        this.$axios({
          url:'/database/factor',
          method:'get'
        }).then(response=>{
          this.factorData=response.data;
        }).catch(error=>console.log(error));
      },
      getFeatureData(){
        this.$axios({
          url:'/database/feature',
          method:'get'
        }).then(response=>{
          this.featureData=response.data;
        }).catch(error=>console.log(error));
      },
      getHabitsData(){
        this.$axios({
          url:'/database/habits',
          method:'get'
        }).then(response=>{
          this.habitsData=response.data;
        }).catch(error=>console.log(error));
      },
      getRecognition(){
        this.$axios({
          url:'/database/recognition',
          method:'get'
        }).then(response=>{
          this.recognitionData=response.data;
        }).catch(error=>console.log(error));
      },
      deleteRow(index,rows,row){
        this.$confirm('是否删除数据？', '确认信息', {
          distinguishCancelAndClose: true,
          confirmButtonText: '删除数据',
          cancelButtonText: '放弃删除'
        })
          .then(() => {
            switch (this.activeCard) {
              case 'basicInfo':{
                this.$axios({
                  url:'/database/basicInfo/'+row.id,
                  method: 'delete'
                }).then(()=>{
                  this.$message({
                    type: 'success',
                    message: '删除成功'
                  });
                  rows.splice(index, 1);
                }).catch(error=>console.log(error));
                break;
              }
              case 'factor':{
                this.$axios({
                  url:'/database/factor/'+row.id,
                  method: 'delete'
                }).then(()=>{
                  this.$message({
                    type: 'success',
                    message: '删除成功'
                  });
                  rows.splice(index, 1);
                }).catch(error=>console.log(error));
                break;
              }
              case 'feature':{
                this.$axios({
                  url:'/database/feature/'+row.id,
                  method: 'delete'
                }).then(()=>{
                  this.$message({
                    type: 'success',
                    message: '删除成功'
                  });
                  rows.splice(index, 1);
                }).catch(error=>console.log(error));
                break;
              }
              case 'habits':{
                this.$axios({
                  url:'/database/habits/'+row.id,
                  method: 'delete'
                }).then(()=>{
                  this.$message({
                    type: 'success',
                    message: '删除成功'
                  });
                  rows.splice(index, 1);
                }).catch(error=>console.log(error));
                break;
              }
              case 'recognition':{
                this.$axios({
                  url:'/database/recognition/'+row.id,
                  method: 'delete'
                }).then(()=>{
                  this.$message({
                    type: 'success',
                    message: '删除成功'
                  });
                  rows.splice(index, 1);
                }).catch(error=>console.log(error));
                break;
              }
            }
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
  .el-icon-remove{
    background-color: rgba(255,255,255,0);
    border: none;
    color: #ccadad;
  }
</style>
