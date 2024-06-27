<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-green px-10 py-5"
  >
    <img
      src="@/assets/images/logo.jpg"
      alt="Total Trivia Logo"
      class="w-full mb-8"
    />
    <!-- <h1 class="text-white text-3xl font-bold mb-8">M-Agric Trivia</h1> -->
    <p class="text-white mb-8 text-center font-bold text-md">
      Welcome to M-Agric Trivia, enter your phone number to play.
    </p>
    <input
      type="text"
      placeholder="Enter your phone number"
      class="bg-white w-full px-6 py-2 rounded-full"
      :value="msisdn"
      :disabled="disableInput"
    />
    <button
      :disabled="disableLogin" @click="start"
      class="bg-white text-green-500 px-6 py-2 rounded-full w-full mt-4 mb-4">
      Start Trivia
    </button>
  </div>
</template>

<script>
export default {
  name: "Index",
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
        this.disableLogin = true;
        let res = await fetch(
          import.meta.env.VITE_API_BASE_URL + "/api/v1/auth/login",
          {
            method: "POST",
            body: JSON.stringify({ msisdn: this.msisdn }),
          }
        );
        let data = await res.json();
        if (data && data.status) {
          let token = data.jwt;
          var user = {
            msisdn: this.msisdn,
            token: token,
          };
          localStorage.setItem("user", JSON.stringify(user));
          this.$router.push("/trivia");
        } else {
          alert(data.message);
        }
        this.disableLogin = false;
      }
    },
  },
};
</script>

<style scoped>
/* Add any additional styling here */
</style>
