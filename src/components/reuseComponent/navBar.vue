<template>
  <div class="left-nav">
    <transition name="nav">
      <div v-if="show" class="navBar">
        <div class="userInfo">
           <span class="userIcon">
             <img class="userImg" src="../../assets/timg.jpeg" @click="toPersonCenter">
           </span>
          <div class="userInfoRight">
            <p>{{username}}</p>
            <span class="buttonArea">
              <img class="imgSize" src="../../assets/icon/settings.png" @click="toSetting">
              <img class="imgSize" src="../../assets/icon/fen.png">
              <img class="imgSize" src="../../assets/icon/out.png" @click="logOut">
            </span>
          </div>
        </div>
        <div class="nav-list">
          <ul>
            <li v-for="item in navName" @click="navChange(item.name)">
              <a class="" :class="{'active':isActive==item.name}">{{item.title}}</a>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <button class="btn-nav"  :class="{'isShow':!show}" @click="show=!show">
      <img src="../../assets/icon/back.png" style="width: 20px;">
    </button>
  </div>

</template>

<script>
  export default {
    name: "nav-bar",
    data(){
      return{
        show:true,
        isActive:'index',
        navName:[
          {title:'首页',name:'index'},
          {title:'数据库管理',name:'databaseManage'},
          {title:'权限管理',name:'authorityManage'},
          {title:'用户管理',name:'userManage'},
          {title:'字典管理',name:'dictionaryManage'},
          {title:'操作日志',name:'operateLog'},
        ],
        id:'',
      }
    },
    mounted () {
      this.isActive = sessionStorage.getItem('isActive');
    },
    watch: {
      userid: function(newVal,oldVal){
        this.id = newVal;
      }
    },
    props:['username','userid'],
    methods:{
      navChange(title){
        switch(title){
          case 'index':{this.$router.push('/Index');break;}
          case 'databaseManage':{this.$router.push('/DataBaseIndex');break;}
          case 'authorityManage':{this.$router.push('/AuthorityManage');break;}
          case 'userManage':{this.$router.push('/UserManage');break;}
          case 'dictionaryManage':{this.$router.push('/DictionaryIndex');break;}
          case 'operateLog':{this.$router.push('/OperateLog');break;}
        }
        this.isActive=title;
        sessionStorage.setItem('isActive', this.isActive);
        console.log(this.isActive);
      },
      toPersonCenter(){
        this.$router.push({path:'/PersonCenter',query:{userid:this.id}});
      },
      toSetting(){
        this.$router.push('/Setting');
      },
      logOut(){
        this.$axios({
          url:'/logout',
          method:'get'
        }).then(response=>{
          if(response.status===200){
            this.$router.push('/');
          }else{
            console.log(response);
          }
        }).catch(error=>console.log(error));
      }
    }
  }
</script>

<style scoped>
  .left-nav{width: 220px;height: 100%;}
  .navBar{width: 100%;height: 100%;background-color: #d3d4e4;}
  .userIcon{
    margin-right: 10px;
  }
  .userImg{
    position: relative;
    top: 10px;
    border-radius: 50%;
    width: 70px;
    height: 70px;
  }

  .userInfo{
    color:#595959;
    font-size: 20px;
    font-weight: bolder;
    padding: 10px 10px 10px 20px;
  }
  .userInfoRight{
    display: inline-block;
  }

  .imgSize{
    height:20px;
    width: 20px;
  }
  .buttonArea{
    padding-left: 12px;
  }

  .nav-list{margin-top: 30px;height: 100%;}
  .nav-list ul{list-style-type: none;margin: 0;padding: 0;width:100%;}


  .nav-list ul li a{
    display: block;
    padding: 12px 20px;

    text-decoration: none;
    color: #595959;
    font-size: 12px;
    font-family: 微软雅黑;
    font-weight: bold;
  }

  .active{color: #ffffff;background-color: #8084b1;}

  .btn-nav{
    height: 70px;
    width: 40px;
    position: absolute;
    top: 400px;
    left: 180px;
    border: none;
    border-radius: 4px 0px 0px 4px;
    background: #FFFFFF;
    opacity: 0.5;
    padding: 20px 10px;

  }

  .nav-enter-active{
    animation:move .5s;

  }
  .nav-leave-active{
    animation:move .5s reverse;
  }
  @keyframes move {
    0%{
      opacity: 100%;
    }
    50%{
      transform:translateX(-120px);
      opacity: 50%;
    }
    100%{
      transform:translateX(0px);
      opacity: 0%;
    }
  }
  .isShow{
    position: absolute;
    left: 0px;
  }

</style>
