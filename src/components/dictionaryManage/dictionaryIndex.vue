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
        </p>

        <div class="tableDiv">
          <el-table
            stripe
            :data="dataBase"
            :header-cell-style="{background:'#494e8f',color:'white',height:'60px'}">
            <el-table-column
              prop="index"
              label="编号"
              align="center"
              width="80px">
            </el-table-column>
            <el-table-column
              prop="name"
              label="名称"
              align="center">
            </el-table-column>
            <el-table-column
              prop="changeDate"
              label="修改时间"
              align="center">
            </el-table-column>
            <el-table-column
              prop="uploader"
              label="上传者"
              align="center">
            </el-table-column>
            <el-table-column
              prop="size"
              label="大小"
              align="center"
              width="120px">
            </el-table-column>
            <el-table-column
              label="操作"
              align="center">
              <template slot-scope="scope">
                <el-button
                  class="btn-normal"
                  @click="handleEdit(scope.row)">查看字典</el-button>
              </template>
            </el-table-column>
          </el-table>

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
    name: "dictionaryIndex",
    components: {TopBar,NavBar},
    data(){
      return{
        dataBase:[
          {index:'1',name:'乌龙茶品种SNP指纹图谱数据库',changeDate:'2018.08.01 23:55:41',uploader:'叶乃兴',size:''},
          {index:'2',name:'乌龙茶品种资源数据库',changeDate:'2018.08.01 23:55:41',uploader:'洪永聪',size:''},
          {index:'3',name:'一带一路贸易数据库',changeDate:'2018.08.01 23:55:41',uploader:'杨超英',size:''},
          {index:'4',name:'福建省乌龙茶消费者购买行为数据库',changeDate:'2018.08.01 23:55:41',uploader:'林畅',size:''}
        ],

      }
    },
    methods:{
      handleEdit(row) {
        console.log(row.index);
        switch (row.index) {
          case '1':{
            this.$router.push({path:'/DetailDictionary',query:{dbIndex:1}});
            break;
          }
          case '2':{
            this.$router.push({path:'/DetailDictionary',query:{dbIndex:2}});
            break;
          }
          case '3':{
            this.$router.push({path:'/DetailDictionary',query:{dbIndex:3}});
            break;
          }
          case '4':{
            this.$router.push({path:'/DetailDictionary',query:{dbIndex:4}});
            break;
          }
        }
      },
    }

  }
</script>

<style scoped>
  .tableDiv{
    padding: 10px 100px;
  }

</style>

