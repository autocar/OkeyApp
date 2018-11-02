<template>
   <div id="settings-page">
      <h2 class="modal-title">Ayarlar</h2>

      <div class="settings-form">
         <div class="input-line">
            <label for="setting-davetiye">Davetiye</label>
            <input id="setting-davetiye" type="checkbox" v-model="settings.davetiye">
         </div>
         <div class="input-line">
            <label for="setting-arkadaslik-teklifi">Arkadaşlık Teklifi</label>
            <input id="setting-arkadaslik-teklifi" type="checkbox" v-model="settings.arkadaslikTeklifi">
         </div>
         <div class="input-line">
            <label for="setting-hediye">Hediye</label>
            <input id="setting-hediye" type="checkbox" v-model="settings.hediye">
         </div>
         <div class="input-line">
            <label for="setting-ses">Ses</label>
            <input id="setting-ses" type="checkbox" v-model="settings.ses">
         </div>
         <div class="input-line">
            <label for="setting-titresim">Titreşim</label>
            <input id="setting-titresim" type="checkbox" v-model="settings.titresim">
         </div>
         <div class="input-line">
            <label for="setting-renk-korluk-modu">Titreşim</label>
            <input id="setting-renk-korluk-modu" type="checkbox" v-model="settings.renkKorlukModu">
         </div>
         <div class="input-line input-line-btn-area">
            <button @click="guncelle">Güncelle</button>
         </div>
      </div>

   </div>
</template>

<script>
export default {
   name: "SettingsPage",
   data(){
      return {
         settings: {
            davetiye: false,
            arkadaslikTeklifi: false,
            hediye: false,
            ses: false,
            titresim: false,
            renkKorlukModu: false,
         }
      }
   },
   methods: {
      guncelle(){
         alert(JSON.stringify(this.settings));
      }
   }
}
</script>

<style scoped>

   .settings-form { width: 200px; margin: 0 auto; }
   .settings-form .input-line { display: block; clear: both; width: 100%; line-height: 40px; border-bottom: 1px solid #efefef; }
   .settings-form label { font-size: 1.2em; }
   .settings-form input { float: right; margin: 10px 0 0 0; width: 20px; height: 20px; }
   .settings-form .input-line-btn-area { text-align: center; padding: 10px 0; }
   .settings-form .input-line-btn-area button { padding: 10px 20px; background: #1C351D; border: none; color: #ffffff; }
</style>
