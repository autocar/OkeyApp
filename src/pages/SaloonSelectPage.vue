<template>
   <div id="saloon-select-page">
      <div class="header">
         Salon Seçimi
      </div>
      <div class="main">
         <div v-for="(saloon, id) in saloons" :key="id" @click="salonSec(saloon)" class="saloon-block" v-bind:class="{selected_saloon:saloon.saloonId == secilenSaloon.saloonId}">
            <span>{{ saloon.saloonName }}</span>
         </div>
         <div class="saloon-block add-saloon-block">
            <input type="text" v-model="saloonName" />
            <button @click="yeniSalon">Yeni Salon Ekle</button>
         </div>
      </div>
      <div class="footer" v-if="secilenSaloon.saloonId">
         <button @click="devam">Devam Et</button>
      </div>
   </div>
</template>

<script>
import { SaloonModel } from '../models/models';

export default {
   name: "SaloonSelectPage",
   data(){
      return {
         saloonName: "",
         saloons: [],
         secilenSaloon: new SaloonModel(),
      }
   },
   computed:{
      saloonsGet(){
         return this.$store.getters.saloons;
      },
      select(){
         return this.$store.getters.secilenSaloon;
      }
   },
   watch:{
      saloonsGet( val ) {
         if(val == null) this.saloons = [];
         else this.saloons = val;
      },
      select ( val ){
         this.secilenSaloon = val;
      }
   },
   methods: {
      devam(){
         this.$router.push('/');
      },
      yeniSalon(){
         if(this.saloonName) {
            this.$store.dispatch("addSaloon", { name: this.saloonName });
            this.saloonName = "";
         }else {
            alert("Salon İsmi Giriniz !");
         }
      },
      salonSec(s){
         this.$store.dispatch("selectSaloon", s);
      }
   },
   created(){
      this.$store.dispatch("getSaloons");
   }
}
</script>

<style scoped>
#saloon-select-page {
   background: #004310;
   overflow: hidden;
}
.header {
   background: #1C351D;
   line-height: 80px;
   text-align: center;
   color: #ffffff;
   font-size: 2rem;
}
.main {
   max-width: 800px;
   width: 100%;
   height: auto;
   margin: 20px auto;
   padding-bottom: 80px;
}
.selected_saloon { outline: 2px solid #ffffff !important; }
.saloon-block {
   width: calc(100% - 25px);
   float: left;
   margin: 1%;
   outline: 2px solid #1C351D;
   color: #ffffff;
   cursor: pointer;
   line-height: 40px;
   text-align: left;
   padding-left: 15px;
}
.saloon-block span {
   display: inline-block;
   vertical-align: middle;
   line-height: normal;
}

.add-saloon-block { line-height: 25px; }

.footer {
   position: fixed;
   bottom: 0;
   background: #1C351D;
   width: 100%;
   line-height: 80px;
   overflow: hidden;
   text-align: center;
}
.footer button { border: 2px solid #ffffff; background: #808080; color: #ffffff; padding: 10px 20px; border-radius: 10px; }

</style>
