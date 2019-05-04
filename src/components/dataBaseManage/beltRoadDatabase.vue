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
          <span class="locat-second">一带一路贸易数据库</span>
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
            <el-tab-pane label="贸易信息" name="tradeInfo">
              <!--贸易信息-->
              <el-table
                stripe
                :data="tradeInfoData"
                :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
                <el-table-column
                  v-for="item in tradeInfoCol"
                  :key="item.name"
                  :prop="item.name"
                  :label="item.label">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="国别基本信息与消费" name="consume">
              <!--国别基本信息与消费-->
              <el-table
                stripe
                :data="countryData"
                :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
                <el-table-column
                  v-for="item in countryCol"
                  :key="item.name"
                  :prop="item.name"
                  :label="item.label">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="茶叶产值" name="teaProduce">
              <!--茶叶产值-->
              <el-table
                stripe
                :data="productionData"
                :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
                <el-table-column
                  v-for="item in productionCol"
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
    name: "beltRoadDatabase",
    components: {TopBar,NavBar},
    data(){
      this.tradeInfoCol=[
        {label:'国家',name:'country'},{label:'贸易流向',name:'tradeFlow'},
        {label:'年份',name:'year'},{label:'伙伴国',name:'partnerCountry'},
        {label:'产品编号',name:'productNumber'},{label:'贸易价值',name:'tradeValue'},
        {label:'净重',name:'weight'},{label:'贸易数量',name:'tradeQuantity'}
      ];
      this.countryCol=[
        {label:'国家',name:'country'},{label:'地区',name:'district'},
        {label:'年份',name:'year'},{label:'总人口',name:'population'},
        {label:'国土面积',name:'landArea'},{label:'铁路长度',name:'railwayLength'},
        {label:'人均GDP',name:'gdp'},{label:'每百人互联网使用人数',name:'internetUser'},
        {label:'至少完成学士教育人数占25岁以上总人数比',name:'scholarEdu'},{label:'至少完成初中教育人数占25岁以上总人数比',name:'junior_edu'},
        {label:'进口所需时间',name:'importTime'},{label:'出口所需时间',name:'exportTime'},
        {label:'开办企业所需时间',name:'businessTime'},{label:'注册产权所需时间',name:'propertyTime'},
        {label:'人均健康支出',name:'healthSpending'},{label:'私人健康支出占GDP比重',name:'healthSpendingGdp'},
        {label:'家庭最终消费支出',name:'householdSpending'},{label:'人均家庭最终消费支出',name:'perCapitaHouseholdSpending'}
      ];
      this.productionCol=[
        {label:'国家',name:'country'},{label:'产品编号',name:'productNumber'},
        {label:'年份',name:'year'},{label:'产值',name:'production'},
      ]


      return{
        activeCard:'tradeInfo',
        tradeInfoData:[],
        productionData:[],
        countryData:[]

      }
    },
    created(){
      this.getTradeInfo();
      this.getCountryInfo();
      this.getProduction();
    },
    methods:{
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getTradeInfo(){
        this.$axios({
          url:'/database/tradeInfo',
          method:'get'
        }).then(response=>{
          this.tradeInfoData=response.data;
        }).catch(error=>console.log(error));
      },
      getCountryInfo(){
        this.$axios({
          url:'/database/countryInfo',
          method:'get'
        }).then(response=>{
          this.tradeInfoData=response.data;
        }).catch(error=>console.log(error));
      },
      getProduction(){
        this.$axios({
          url:'/database/production',
          method:'get'
        }).then(response=>{
          this.productionData=response.data;
        }).catch(error=>console.log(error));
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
</style>
