<template>
  <v-app>
    <v-main>
      <router-view  />
      <v-bottom-navigation
        v-if="$route.name !== 'Home'"
        v-model="value"
        :color="value == 0 ? 'orange' : 'green'"
        dark
        class="nav-bottom"
      >
        <v-btn height="100%" @click="navigate('shopee')">
          <span>Shopee</span>
          <img src="./assets/img/logo-shopee.png" height="30px" alt="" />
        </v-btn>

        <v-btn height="100%" to="/grab">
          <span>Grab</span>

          <img src="./assets/img/logo-grab.png" height="30px" alt="" />
        </v-btn>
      </v-bottom-navigation>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      value: 0,
    };
  },
  mounted() {},
  methods: {
    navigate(route) {
      this.value = route == "shopee" ? 0 : 1;
      this.$router.push(`/${route}`);
    },
  },
};
</script>
<style scoped>
.nav-bottom {
  position: fixed;
  bottom: 0;
}
</style>
