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
          <p class="authorP">
            <span class="selectSpan">详细权限</span>
            <i class="btn-icon el-icon-caret-bottom"></i>
          </p>
          <el-card>
            <div v-for="dataBase in dataBases">
              <div class="baseName">
                <span>{{dataBase.name}}</span>
                <i class="el-icon-caret-bottom"></i>
              </div>
              <div class="changeInfo">
                <el-checkbox-group v-model="dataBase.authority">
                  <el-checkbox v-for="item in powers" :label="item.label" :key="item.key">{{item.label}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </el-card>
          <p class="buttonP">
            <el-button class="btn-normal btnMargin" @click="savePermission()">保存</el-button>
            <el-button class="btn-normal btnMargin" @click="back()">返回</el-button>
          </p>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import TopBar from "../reuseComponent/topBar"
  import NavBar from "../reuseComponent/navBar"
  const powerOptions=[{key:0,label:'查看数据'},{key:1,label:'导入数据'},{key:2,label:'导出数据'},{key:3,label:'设置用户组下的用户权限'}];
  export default {
    name: "personAuthority",
    components: {TopBar,NavBar},
    data(){
      return{
        username:'',
        fold:true,
        dataBases:[{name:'乌龙茶品种SNP指纹图谱数据库',authority:[]},{name:'乌龙茶品种资源数据库',authority:[]}, {name:'一带一路贸易数据库',authority:[]},{name:'福建省乌龙茶消费者购买行为数据库',authority:[]}],
        powers:powerOptions,
        powerChose:[],
      }
    },
    created() {
      this.username=this.$route.query.username;
      this.role=this.$route.query.role;
      this.getAllAthority();

    },
    methods:{
      getAllAthority(){
        let index;
        for(index=0;index<4;index++)
        {
          this.$axios({
            url:'/get_db_permission',
            method:'get',
            params:{
              role_id:this.$route.query.roleId,
              db_index:index
            }
          }).then(res=>{
            this.dataBases[index].authority.push(this.reverseAuthority(res.data.permissions));
          }).catch(err=>console.log(err));
        }
      },
      savePermission(){
        var permission='';
        for(let index=0;index<4;index++)
        {
          console.log(this.dataBases[index].authority);
          permission=this.matchAuthority(this.dataBases[index].authority);
          this.$axios({
            url:'/save_db_permission',
            method:'post',
            params:{
              role_id:this.$route.query.roleId,
              db_index:index,
              new_permission:permission
            }
          }).then(res=>{
            if(res.data.status===200)
            {
              this.$message({
                type: 'success',
                message: '修改成功'
              });
            }
            else console.log(res.data.status);
          }).catch(err=>{
            console.log(err);
            alert('请求失败');
          });
        }
      },
      matchAuthority(auth){
        let permission='';
        for(let i=0;i<auth.length;i++)
        {
          switch (auth[i]) {
            case'查看数据':{
              permission+='0,';
              break;
            }
            case'导入数据':{
              permission+='1,';
              break;
            }
            case'导出数据':{
              permission+='2,';
              break;
            }
            case'设置用户组下的用户权限':{
              permission+='3,';
              break;
            }
            default:break;
          }
        }
        permission=permission.substring(0,permission.length-1);
        return permission;
      },
      reverseAuthority(str){
        let outputArray=new Array();
        console.log(str);
        if(str){
          let arr=str.split(',');
          for(let i=0;i<arr.length;i++)
          {
            switch (arr[i]) {
              case '0':{
                outputArray.push('查看数据');
                break;
              }
              case '1':{
                outputArray.push('导入数据');
                break;
              }
              case '2':{
                outputArray.push('导出数据');
                break;
              }
              case '3':{
                outputArray.push('设置用户组下的用户权限');
                break;
              }
              default:break;
            }
          }
        }
        else outputArray=[''];
        console.log(outputArray);
        return outputArray;
      },
      back(){
        this.$router.go(-1);
      }
    }


  }
</script>

<style scoped>
  .mainDiv{
    padding: 10px 100px;
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
  .authorP{
    margin-top: 20px;
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
  .baseName{
    color: #808080;
    font-size: 12px;
    font-weight: bolder;
    margin: 10px 10px;
  }
  .changeInfo{
    background-color: #f3f5fa;
    padding: 15px 10px;
    border-radius: 20px;
  }
  .buttonP{
    margin-top: 30px;
    text-align: center;
  }
  .btnMargin{
    width: 100px;
    margin:0px 80px;
  }
</style>
