<template>
   <transition name="sidebar">
      <div class="sidebar">

         <button @click="$emit('sidebar-close')">Kapat</button>

         <div class="sidebar-header">
            <slot name="header">
               Header
            </slot>
         </div>

         <div class="sidebar-body">
            <slot name="body">
               <!-- ROOMS -->
               <div class="rooms block right-block">
                  <div class="nav-block">
                     <ul>
                        <li @click="roomsBody=1" v-bind:class="{ 'active-nav': roomsBody==1 }">Odadakiler</li>
                        <li @click="roomsBody=2" v-bind:class="{ 'active-nav': roomsBody==2 }">Arkadaşlarım</li>
                     </ul>
                  </div>
                  <div class="saloon-body">
                     <div v-if="roomsBody==1">1. içerik</div>
                     <div v-if="roomsBody==2">2. içerik</div>
                  </div>
               </div>
               <!-- TOPLIST -->
               <div class="toplist block right-block">
                  <div class="nav-block">
                     <ul>
                        <li @click="toplistBody=1" v-bind:class="{ 'active-nav': toplistBody==1 }">Günün En iyileri</li>
                     </ul>
                  </div>
                  <div class="saloon-body">
                     <div v-if="toplistBody==1">1. içerik</div>
                  </div>
               </div>
            </slot>
         </div>

      </div><!-- //.sidebar -->
   </transition>
</template>

<script>
export default {
  name: "SidebarGeneralComp",
  data() {
    return {
      deneme: "hhg",
      roomsBody: 1,
      toplistBody: 1,
    };
  }
};
</script>

<style scoped>
.sidebar {
  width: 320px;
  height: 100%;
  background: #1c351d;
  z-index: 20;
  position: fixed;
  right: 0;
  top: 0;
  color: #ffffff;
  margin-top: 100px;
  margin-bottom: 50px;
  box-shadow: 2px 2px 10px #000000;
  border-top: 1px solid #055217;
}
</style>
