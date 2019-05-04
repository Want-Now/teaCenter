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
          <img src="../../assets/icon/unfold.png" style="height: 12px">
          <span class="locat-second">{{username}}</span>
        </p>

        <div class="mainDiv">
          <div class="identity">
            <img src="../../assets/icon/personal.png">
            <span>{{role}}:{{username}}</span>
          </div>
          <p>
            <span class="selectSpan">权限级别：</span>
            <el-select v-model="levelChange" placeholder='请选择'>
              <el-option
                v-for="item in authorityLevel"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <span class="selectSpan">角色：</span>
            <el-select v-model="roleChange" placeholder='请选择'>
              <el-option
                v-for="item in roles"
                key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </p>
          <p class="authorP">
            <span class="selectSpan">详细权限</span>
            <el-button class="btn-icon el-icon-caret-bottom" @click="fold=!fold"></el-button>
          </p>
          <el-card v-if="fold">
            <div v-for="item in dataBases">
              <span class="baseName">{{item.name}}</span>
              <el-button class="btn-icon-second el-icon-caret-bottom"></el-button>
            </div>
            <div class="changeInfo">
              <p v-for="(subItem,key) in subDataBases" class="subItemP">
                <span class="subSpan">{{subItem.name}}</span>
                <el-checkbox-group v-model="powerChose[key]">
                  <el-checkbox v-for="power in powers" :label="power" :key="power">{{power}}</el-checkbox>
                </el-checkbox-group>
              </p>

            </div>
          </el-card>

        </div>

      </div>

    </el-main>
    <!--</el-container>-->

  </el-container>

</template>

<script>
  import TopBar from "../reuseComponent/topBar"
  import NavBar from "../reuseComponent/navBar"
  const powerOptions=['查看数据','导出数据','导入数据','设置用户组下的用户权限']
  export default {
    name: "personAuthority",
    components: {TopBar,NavBar},
    data(){
      return{
        username:'',
        role:'',
        authorityLevel:[{}],
        roles:[{}],
        levelChange:'',
        roleChange:'',
        fold:true,
        dataBases:[{name:'XXXXX数据库'}],
        subDataBases:[{name:'XXXXXXX'},{}],
        powers:powerOptions,
        powerChose:[],
      }
    },
    created() {
      this.username=this.$route.query.username;
      this.role=this.$route.query.role;

      for (let key in this.subDataBases) {
        this.$set(this.powerChose, key, [])
      }
    }

  }
</script>

<style scoped>
  .mainDiv{
    padding: 10px 100px;
  }
  .btnP .el-button{
    margin:10px;
    width: 120px;
  }
  .identity{
    display: table-cell;
    vertical-align: middle;
    height: 80px;
    width: 200px;
    border-radius:15px;
    text-align: center;
    border-color: #595959;
    border-width: 30px;
    background-color: #ffffff;
    color: #595959;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0px 0px 10px 2px rgba(89,89,89,0.15);
  }
  .identity span{
    margin-left: 10px;
  }
  .selectSpan{
    color: #808080;
    font-weight:bolder;
    font-size: 16px;
  }
  .el-select{
    margin-right: 100px;
  }
  .authorP{
    margin-top: 30px;
    height: 30px;
    line-height: 30px;
  }
  .el-card{
    border-radius: 20px;
  }
  .btn-icon{
    border:none;
    color: #494e8f;
    background-color: #f3f5fa;
    font-size: 25px;
  }
  .btn-icon-second{
    border:none;
    color: #494e8f;
    font-size: 25px;
  }
  .baseName{
    color: #808080;
    font-size: 12px;
    font-weight: bolder;
  }
  .changeInfo{
    background-color: #f3f5fa;
    border-radius: 20px;
  }
  .el-checkbox-group{
    display: inline-block;
  }
  .subItemP{
    height: 40px;
    padding: 15px 30px;
    line-height: 40px;
  }
  .subSpan{
    color: #808080;
    font-size: 12px;
    font-weight: bold;
    margin-right: 20px;
  }

</style>
