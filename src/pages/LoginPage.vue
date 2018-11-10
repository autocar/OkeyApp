<template>
  <div id="login-page">

    <div class="login-box">
      <div class="login-box-topimage">
        <img src="../assets/images/login-bg-women.png" />
      </div>
      <div class="login-title">
        Giriş Yap
      </div>
      <div class="input-fields-cover">
        <div class="input-fields">
          <input v-model="email" type="email" placeholder="E-mail Adresiniz" />
          <input v-model="password" type="password" placeholder="Şifre" />
          <input type="button" value="Giriş Yap" @click="girisYap()" />
          <div class="alt-alanlar">
            <a href="#">Şifremi Unuttum</a>
          </div>
          <div class="alt-alanlar">
            <label for="benihatirla">Beni Hatırla</label>
            <input type="checkbox" id="benihatirla" name="beni_hatirla" value="benihatirla" checked />
          </div>
        </div>
        <div class="input-fields other-fields">
          <!-- <input @click="facebookGiris()" class="facebook-giris" type="button" value="Facebook'ta Oyna" />
          <input @click="googleGiris()" class="google-giris" type="button" value="Google ile Giriş" /> -->
          <input @click="kayitOl()" class="kayit-ol" type="button" value="Kayıt Ol" />
          <input @click="misafir()" class="misafir-giris" type="button" value="Misafir olarak oyna" />

          <hr>

          <div id="google-signin-button"></div>
          <input @click="facebookLogin()" class="facebook-giris" type="button" value="Facebook ile Giriş" />

        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  mounted() {
    gapi.signin2.render("google-signin-button", {
      onsuccess: this.googleLogin
    });
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined)
        this.$router.push("/saloon-select");
    }
  },
  methods: {
    googleLogin(googleUser) {
      console.log("googleLogin:", googleUser);
      var profile = googleUser.getBasicProfile();
      console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log("Name: " + profile.getName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
    },
    facebookLogin() {
      FB.login(function(res) {
        console.log("facebookLogin", res);
      });
    },
    kayitOl() {
      this.$router.push({ path: "/signup" });
    },
    girisYap() {
      this.$store.dispatch("signInEmailPass", {
        email: this.email,
        password: this.password
      });
    },
    facebookGiris() {
      this.$store.dispatch("signInFacebook");
    },
    googleGiris() {
      this.$store.dispatch("signInGoogle");
    },
    misafir() {
      this.denemeMisafirAuth();
    },
    denemeMisafirAuth() {
      fetch("http://game-server-dev.now.sh/api/auth/login", {
        method: "POST",
        /* bu kısım olunca CORS hatası veriyor
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }, */
        body: JSON.stringify({
          type: "guest"
        })
      })
        .then(res => res.json())
        .then(function(data) {
          console.log(data);
          if (data.success === false) {
            alert("hata " + JSON.stringify(data));
            return;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    authServer(type, id) {
      fetch("http://game-server-dev.now.sh/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ type: type, id: id })
      })
        .then(res => res.json())
        .then(function(data) {
          console.log(data);
          if (data.success === false) {
            alert("hata " + JSON.stringify(data));
            return;
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.login-box {
  width: 700px;
  height: 400px;
  max-width: 100%;
  height: auto;
  margin: 11% auto auto auto;
}

.login-box .login-box-topimage {
  width: 30%;
  text-align: center;
  margin: 40px auto -80px auto;
  z-index: -1;
  position: relative;
  left: 0;
  right: 0;
}
.login-box .login-box-topimage img {
  max-width: 100%;
  margin-left: -100px;
}

.login-title {
  width: calc(100% - 40px);
  background-color: #131313;
  color: #ffffff;
  padding: 20px;
}

.input-fields-cover {
  background-color: #d1d3cf;
  height: auto;
  width: auto;
  overflow: hidden;
}

input {
  font-size: 1rem;
}

.input-fields {
  width: 60%;
  float: left;
}
.input-fields input {
  padding: 10px;
  margin: 10px 20px;
  box-shadow: 2px 2px 5px #808080;
  border-radius: 5px;
  width: calc(100% - 60px);
  border-style: solid;
  border-color: #ffffff;
}
.input-fields input[type="button"] {
  width: calc(100% - 35px) !important;
}
.input-fields .alt-alanlar {
  width: calc(50% - 20px);
  float: left;
  padding: 10px;
  text-align: center;
}
.input-fields .alt-alanlar input {
  width: 15px;
  height: 15px;
  padding: 0;
  margin: 0 5px;
  box-shadow: 0 0 0;
}
.input-fields .alt-alanlar a {
  color: #131313;
  text-decoration: none;
}

.other-fields {
  width: 39%;
  border-left: 1px solid #afafaf;
}
.other-fields input {
  color: #ffffff;
  background: #818080;
}
.other-fields .facebook-giris {
  background: #4267b2;
}
.other-fields .google-giris {
  background: #db3236;
}

@media screen and (max-width: 700px) {
  .login-box {
    width: calc(100% - 40px);
    margin: 60px 20px 20px 20px;
  }
  .login-title {
    margin-top: 50px;
  }
}

@media screen and (max-width: 500px) {
  body {
    background-size: 190%;
    background-position: 50% -30px;
  }

  .login-box .login-box-topimage {
    width: 35%;
    margin-top: 80px;
  }

  .other-fields {
    width: 100%;
  }
  .input-fields {
    width: 90%;
  }
  .input-fields input {
    width: 94%;
  }
  .input-fields input[type="button"] {
    width: 100% !important;
  }
}
</style>
