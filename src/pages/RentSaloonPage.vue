<template>
   <div id="rent-saloon-page">
      <h2 class="modal-title">Salon Kiralama</h2>
      <div class="rentsaloonbody">
         <b>Salon kirala:</b> istenilen salon numarası Aylik 250 altın
         <br>
         <button class="btn-satinal" @click="satinAl">Hemen Satın Al</button>
      </div>
   </div>
</template>

<script>
export default {
   name: "RentSaloonPage",
   methods:{
      satinAl(){
         alert("Satın Alma İşlemi");
      }
   }
}
</script>

<style scoped>
.rentsaloonbody { margin: 10px; text-align: center; }
button.btn-satinal { margin: 20px; border: none; background: mediumseagreen; padding: 20px; }
</style>
