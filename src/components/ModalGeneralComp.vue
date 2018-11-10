<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-mask-click-close" @click="$emit('modal-close')"></div>
      <div class="modal-wrapper">

        <div class="modal-close-button">
          <button @click="$emit('modal-close')">
            <!-- <img src="../assets/images/menu-icon-logout.png" /> -->
            <i class="fa fa-window-close"></i>
          </button>
        </div>

        <div class="modal-container">

          <div class="modal-body">
            <slot name="body">
              <store-page v-if="pageName == 'StorePage'"></store-page>
              <gold-account-page v-if="pageName == 'GoldAccountPage'"></gold-account-page>
              <room-list-page v-if="pageName == 'RoomListPage'"></room-list-page>
              <rent-saloon-page v-if="pageName == 'RentSaloonPage'"></rent-saloon-page>
              <contact-page v-if="pageName == 'ContactPage'"></contact-page>
              <help-page v-if="pageName == 'HelpPage'"></help-page>
              <settings-page v-if="pageName == 'SettingsPage'"></settings-page>
              <profile-page v-if="pageName == 'ProfilePage'"></profile-page>
            </slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import StorePage from "../pages/StorePage.vue";
import GoldAccountPage from "../pages/GoldAccountPage.vue";
import RoomListPage from "../pages/RoomListPage.vue";
import RentSaloonPage from "../pages/RentSaloonPage.vue";
import ContactPage from "../pages/ContactPage.vue";
import HelpPage from "../pages/HelpPage.vue";
import SettingsPage from "../pages/SettingsPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";

export default {
  name: "ModalGeneralComp",
  props: { pageName: false },
  data() {
    return {
      mesaj: "HHGsun"
    };
  },
  components: {
    StorePage,
    GoldAccountPage,
    RoomListPage,
    RentSaloonPage,
    ContactPage,
    HelpPage,
    SettingsPage,
    ProfilePage
  }
};
</script>

<style scoped>
.modal-mask-click-close {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  width: calc(100% - 80px);
  max-width: 600px;
  max-height: 90%;
  top: calc(20% - 40px);
  left: 0;
  right: 0;
  margin: 0px auto;
  overflow-x: auto;
  padding: 10px; /* 25px; */
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  z-index: 2;
}

div.modal-close-button {
  position: absolute;
  right: 10px;
  top: 10px;
  z-index: 5;
}
div.modal-close-button button {
  background: none;
  border: none;
  border-radius: 50%;
  font-size: 40px;
  color: #ffffff;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
