<template>
  <div class="lobby-page">
    <div class="header">
      <div class="container">

        <div class="profile-box" @click="showModalPageName = 'ProfilePage'">
          <div class="profile-photo" v-bind:style="{backgroundImage: 'url(' + user.photoUrl + ')'}"></div>
          <img src="../assets/images/coin-three-icon.png" />
          <h3>{{ user.name }}<br>20.000</h3>
        </div>

        <div @click="headerMenuClose = !headerMenuClose" class="btn-header-menu-open">
          {{headerMenuClose ? '-' : '+'}}
        </div>

        <div v-show="headerMenuClose" class="header-menu">
          <ul>
            <li @click="showModalPageName = 'StorePage'"><span><img src="../assets/images/menu-icon-coin.png" /></span>Mağaza</li>
            <li @click="showModalPageName = 'GoldAccountPage'"><span><img src="../assets/images/menu-icon-gold.png" /></span>Gold Üyelik</li>
            <li @click="showModalPageName = 'RoomListPage'"><span><img src="../assets/images/menu-icon-roomlist.png" /></span>Oda Listesi</li>
            <li @click="showModalPageName = 'RentSaloonPage'"><span><img src="../assets/images/menu-icon-rent.png" /></span>Salon Kirala</li>
            <li @click="showModalPageName = 'ContactPage'"><span><img src="../assets/images/menu-icon-contact.png" /></span>İletişim</li>
            <li @click="showModalPageName = 'HelpPage'"><span><img src="../assets/images/menu-icon-help.png" /></span>Yardım</li>
            <li @click="showModalPageName = 'SettingsPage'"><span><img src="../assets/images/menu-icon-settings.png" /></span>Ayarlar</li>
            <li @click="cikisYap"><span><img src="../assets/images/menu-icon-logout.png" /></span>Çıkış Yap</li>
          </ul>
        </div>

      </div>
    </div>

    <div class="main">
      <div class="container-flex">

        <!-- SALOON -->
        <div class="saloon container-flex-body">
          <div class="nav-block">
            <ul>
              <li @click="saloonBody=0" v-bind:class="{ 'active-nav': saloonBody==0 }">Mevcut Salon</li>
              <li @click="saloonBody=1" v-bind:class="{ 'active-nav': saloonBody==1 }">Salon Değiştir</li>
              <li @click="saloonBody=2" v-bind:class="{ 'active-nav': saloonBody==2 }">Yeni Masa Aç</li>
            </ul>
          </div>
          <div class="saloon-body">
            <div v-if="saloonBody==0">
              <div v-if="secilenSaloon" class="saloon-block">
                <span>{{ secilenSaloon.saloonName }}</span>
              </div>
            </div>
            <div v-if="saloonBody==1">
              <div v-for="(saloon, id) in saloons" :key="id" @click="salonSec(saloon)" class="saloon-block" v-bind:class="{selected_saloon: selectedSaloonCss(saloon)}">
                <span>{{ saloon.saloonName }}</span>
              </div>
            </div>
            <div v-if="saloonBody==2">2. içerik</div>
            <div class="clear"></div>
          </div>
        </div>

        <!-- CHAT -->
        <div class="chat container-flex-body">
          <div class="nav-block">
            <ul>
              <li @click="chatBody=1" v-bind:class="{ 'active-nav': chatBody==1 }">Sohbet</li>
            </ul>
          </div>
          <div class="chat-body">
            <div v-if="chatBody==1">
              <div class="chat-box" ref="chatMessagesArea">
                <!-- https://codepen.io/manifoldkaizen/pen/oqzOKw  < burdan örnek dene -->
                <div v-for="(message, id) in chatMessages" :key="id">
                  <span>{{ message }}</span>
                </div>
              </div>
              <div class="chat-message-area">
                <input type="text" v-model="chatMessage" v-on:keyup.enter="messageSend" />
                <button @click="messageSend">Gönder</button>
              </div>
            </div>
          </div>
        </div>

      </div><!-- /.container-flex -->

      <div class="container" style="display:none;">
        main content
        <hr>
        <button @click="cikisYap()">Çıkış</button>
        <button @click="page2()">deneme sayfa</button>
      </div>

    </div>

    <!-- Modal Pages -->
    <modal-general-comp v-bind:page-name="showModalPageName" v-if="showModalPageName" v-on:modal-close="showModalPageName = false">
    </modal-general-comp>

    <!-- Sidebar Pages -->
    <sidebar-general-comp v-if="showSidebarPageName" v-on:sidebar-close="showSidebarPageName = false"></sidebar-general-comp>

    <div class="footer">
      <div class="container">
        <button class="btn-side-open" @click="showSidebarPageName=true">
          <i class="fa fa-comments"></i>
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import { SaloonModel } from "../models/models";
import ModalGeneralComp from "../components/ModalGeneralComp.vue";
import SidebarGeneralComp from "../components/SidebarGeneralComp.vue";

export default {
  name: "LobbyPage",
  data() {
    return {
      user: {},
      showModalPageName: false,
      showSidebarPageName: true,
      saloonBody: 0,
      roomsBody: 1,
      chatBody: 1,
      toplistBody: 1,
      saloons: [],
      secilenSaloon: new SaloonModel(),
      chatMessages: [],
      chatMessage: "",
      headerMenuClose: true
    };
  },
  computed: {
    saloonsGet() {
      return this.$store.getters.saloons;
    },
    select() {
      this.secilenSaloon = this.$store.getters.secilenSaloon;
      return this.$store.getters.secilenSaloon;
    }
  },
  watch: {
    saloonsGet(val) {
      if (val == null) this.saloons = [];
      else this.saloons = val;
    },
    select(val) {
      this.secilenSaloon = val;
      console.log("SecilenSaloon", this.secilenSaloon);
    }
  },
  created() {
    this.user = this.$store.getters.user;
    this.$store.dispatch("getSaloons");
    if (this.secilenSaloon == null) this.saloonBody = 1;
    else this.saloonBody = 0;
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      if (window.innerWidth < 600) this.headerMenuClose = false;
      else this.headerMenuClose = true;
    },
    cikisYap() {
      var sor = confirm("Çıkış Yapmak istediğinize eminmisiniz?");
      if (sor) {
        this.$store.dispatch("logout");
        this.$router.push("/login");
      }
    },
    page2() {
      this.$router.push("/lobby");
    },
    salonSec(saloon) {
      this.$store.dispatch("selectSaloon", saloon);
      this.saloonBody = 0;
    },
    messageSend() {
      if (this.chatMessage) {
        this.chatMessages.push(this.chatMessage);
        Vue.nextTick(() => {
          let messageDisplay = this.$refs.chatMessagesArea;
          messageDisplay.scrollTop = messageDisplay.scrollHeight;
          this.chatMessage = null;
        });
      }
    },
    selectedSaloonCss(saloon) {
      if (this.secilenSaloon)
        return saloon.saloonId == this.secilenSaloon.saloonId;
      else return false;
    }
  },
  components: {
    ModalGeneralComp,
    SidebarGeneralComp
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  position: fixed;
  z-index: 10;
  top: 0;
  width: 100%;
  height: 100px;
  background: #1c351d;
  color: #ffffff;
  border-bottom: 1px solid #055217;
}

.header .profile-box {
  width: 30%;
  min-width: 200px;
  float: left;
  margin: 10px 0;
  cursor: pointer;
}
.profile-box .profile-photo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-size: cover;
  background-position: top center;
  float: left;
}
.profile-box img {
  float: left;
  align-self: center;
  margin: 30px 10px;
}
.profile-box h3 {
  font-size: 1rem;
}

.header .header-menu {
  width: 70%;
  float: left;
  margin: 10px 0;
}
.header-menu ul,
.header-menu li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.header-menu li {
  float: left;
  margin: 10px 20px;
  font-size: 0.7rem;
  line-height: 1.5rem;
  text-align: center;
}
.header-menu li:hover {
  cursor: pointer;
}
.header-menu li span {
  display: block;
  margin: 0 auto;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #e2e1d9;
}
.header-menu li span img {
  margin: 10px auto;
}

/* main */

.main {
  background: #004310;
  padding-top: 100px;
}

.nav-block {
  margin: -39px 0 5px 0;
  text-align: right;
}
.nav-block ul,
.nav-block ul li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.nav-block ul li:hover {
  cursor: pointer;
}
.nav-block ul li {
  display: inline-block;
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background: #055217;
  color: #00310c;
}
.nav-block ul li.active-nav {
  background: #1c351d;
  color: #ffffff;
  border: 1px solid #055217;
  border-bottom: 0;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  overflow: hidden;
  height: auto;
}

.container-flex {
  max-width: 870px;
  color: #ffffff;
  margin: 0 auto;
  padding-right: 200px;
  overflow: hidden;
}
.container-flex-body {
  position: relative;
  margin: 60px 0;
  padding-bottom: 30px;
  box-shadow: 2px 2px 10px #000000;
  border-top: 1px solid #055217;
}

/* footer */
.footer {
  position: fixed;
  z-index: 30;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: #1c351d;
  color: #ffffff;
  border-top: 1px solid #055217;
  box-shadow: 2px 2px 10px #000000;
}

/* other */
.saloon::before {
  content: "";
  display: block;
  position: absolute;
  width: 60px;
  height: 60px;
  margin-top: -60px;
  margin-left: 0px;
  background: url("../assets/images/lobby-bg-women.png") no-repeat;
  color: #ffffff;
  background-size: cover;
}
.saloon {
  background: #1c351d;
}
.rooms {
  background: #1c351d;
}

/*CHAT*/
.chat {
  background: #1c351d;
}
.chat-box {
  width: calc(100% - 50px);
  margin: 15px;
  padding: 10px;
  height: 200px;
  overflow-x: auto;
  background: #ffffff;
  color: #000000;
}
.chat-message-area {
  width: calc(100% - 30px);
  margin: 15px;
}
.chat-message-area input {
  width: calc(80% - 40px);
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
}
.chat-message-area button {
  width: 20%;
  padding: 10px 0;
  font-size: 1rem;
  font-weight: bold;
  float: right;
  border-radius: 5px;
}

.toplist {
  background: #1c351d;
}

.header .btn-header-menu-open {
  display: none;
  width: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 2rem;
  float: left;
  border: 2px solid #004310;
  margin: 20px 0;
}

@media (max-width: 600px) {
  .container-flex {
    padding-right: 10px;
    padding-left: 10px;
  }
  .header .btn-header-menu-open {
    display: block;
  }
  .block {
    width: 100%;
    margin-right: 20px;
    margin-left: 20px;
  }
  .ad-area {
    margin: 20px !important;
    width: 100%;
  }
  .saloon::before {
    width: 60px;
    height: 70px;
    background-size: cover;
    margin-top: -70px;
    margin-left: -10px;
  }
  .header .header-menu {
    width: 85%;
    background: #1c351d;
    position: fixed;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    margin: 0;
  }
  .header .header-menu ul li {
    float: none;
    display: inline-block;
  }
  .header .profile-box {
    width: calc(100% - 100px);
    padding: 0 20px 0 10px;
    margin-bottom: 0;
  }
}

.selected_saloon {
  outline: 2px solid #ffffff !important;
}
.saloon-block {
  width: 23%;
  height: 60px;
  margin: 1%;
  outline: 2px solid #1c351d;
  color: #ffffff;
  cursor: pointer;
  line-height: 60px;
  text-align: center;
  float: left;
}
.saloon-block span {
  display: inline-block;
  vertical-align: middle;
  line-height: normal;
}
.clear {
  clear: both;
}
.btn-side-open {
  padding: 4px;
  font-size: 35px;
  border: none;
  background: none;
  color: #ffffff;
  cursor: pointer;
}
</style>
