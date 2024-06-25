<template>
  <div class="home">
    <img alt="M-Agric Trivia" src="@/assets/images/logo.jpg" />
    <p>Welcome to M-Agric Trivia, enter your phone number to play.</p>
    <input
      type="number"
      class="input"
      :value="msisdn"
      :disabled="disableInput"
    />
    <button :disabled="disableLogin" class="button" @click="start">Start Trivia</button>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data: () => {
    return {
      msisdn: "",
      disableInput: false,
      disableLogin: false,
    };
  },
  created() {
    let urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("uid")) {
      this.msisdn = atob(urlParams.get("uid"));
      this.disableInput = true;
    }
  },
  methods: {
    start: async function () {
      if (this.msisdn && this.msisdn.trim() != "") {
        this.disableLogin  = true;
        let res = await fetch(import.meta.env.VITE_API_BASE_URL + "/auth/login",{
          method: "POST",
          body: JSON.stringify({msisdn : this.msisdn})
        });
        let data = await res.json();
        if(data && data.status){
          let token = data.jwt;
          var user = {
            msisdn : this.msisdn,
            token: token
          };
          localStorage.setItem('user', JSON.stringify(user));
          this.$router.push("/play")
        }else{
          alert(data.message);
        }
        this.disableLogin  = false;
      }
    },
  },
};
</script>

<style scoped>
img {
  height: 100px;
  width: 100%;
  max-width: 500px;
}

.input {
  min-height: 30px;
  min-width: 250px;
  margin: 20px 0px;
}

.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: center;
  padding: 10px;
}
</style>
