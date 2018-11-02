<template>
   <div id="lobby-deneme-page">
     Deneme: 
      {{ email }}
   </div>
</template>

<script>
export default {
  name: "LobbyDenemePage",
  data() {
    return {
      email: ""
    };
  },
  mounted() {
    if (this.$store.getters.user) this.email = this.$store.getters.user.email;
  }
};
</script>

<style>
</style>
