<template>
   <div id="contact-page">
      <h2 class="modal-title">İletişim</h2>
      <div class="contact-form">
         <div class="input-line">
            <input type="radio" v-model="contactType" value="hata" id="hata_input">
            <label for="hata_input">Hata Bildirmek İstiyorum</label>
         </div>
         <div class="input-line">
            <input type="radio" v-model="contactType" value="soru" id="soru_input">
            <label for="soru_input">Soru Sormak İstiyorum</label>
         </div>
         <div class="input-line">
            <input type="radio" v-model="contactType" value="oneri" id="oneri_input">
            <label for="oneri_input">Öneri Göndermek İstiyorum</label>
         </div>

         <div class="textarea-line">
            <p>Mesaj:</p>
            <textarea v-model="contactMessage"></textarea>
         </div>
         <button @click="gonder">Gönder</button>
      </div>

   </div>
</template>

<script>
export default {
   name: "ContactPage",
   data(){
      return {
         contactType: false,
         contactMessage: "",
      }
   },
   methods: {
      gonder(){
         if(this.contactType && this.contactMessage != "")
            alert("Başarılı");
         else alert("Seçim Yapınız !");
      }
   }
}
</script>

<style scoped>
   .contact-form { width: 100%; }
   .contact-form .input-line { width: 100%; line-height: 30px; }
   .contact-form .input-line input { padding: 5px; }
   .contact-form .textarea-line { width: 100%; }
   .contact-form .textarea-line p { margin-bottom: 10px; }
   .contact-form .textarea-line textarea { width: 95%; min-height: 50px; margin-bottom: 10px; }
   .contact-form button { padding: 10px; background: #1C351D; border: none; color: #ffffff; }
</style>
