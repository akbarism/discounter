<template>
  <div>
    <div class="pa-3" v-if="quota">
      <h1>sisa kuota mu : {{ 100 - quota.today_usage }}</h1>
    </div>
    <v-btn @click="generateQr"> scan </v-btn>
    <div class="pa-3" v-if="qr">
      {{ qr }}
    </div>

    <img
      src="https://api.kirimwa.id/v1/qr/show?qrcode=1%40TDTCs9e2o3cK3PQN%2Bcr%2Fi%2B3uBPUSopDtKPc2GlBeBdAbLe3LKRpY1h90THWZr9Sxk4q%2FgIdOSpeM%2BQ%3D%3D%2CPSldSBwolGK2cfw1cmrbRzx6AOBeCc17vppHaQc0pFE%3D%2CEEvMCAAP28eR5um1fcE7Kw%3D%3D&device_id=xiamoi-kentang"
      alt=""
    />
    <div class="pa-3">
      <v-row>
        <v-col cols="10">
          <v-textarea
            outlined
            label="type something"
            v-model="txt"
            hide-details="auto"
          ></v-textarea>
        </v-col>
        <v-col cols="2">
          <v-btn @click="broadcast">send</v-btn>
        </v-col>
      </v-row>
    </div>
    <div class="my-5" v-if="sent">
      <div v-for="msg in sent.data" :key="msg.id">
        <div class="ma-3">
          <p class="ma-0">
            {{ msg.payload.message }}
          </p>
          <p>{{ msg.status }} || {{ msg.payload.phone_number }}</p>
        </div>
      </div>
    </div>
    <div class="my-5" v-if="device">
      {{ device }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "scanQr",
  computed: {
    ...mapState({
      device: (state) => state.status_device,
      qr: (state) => state.qr_code,
      sent: (state) => state.sent_msg,
      quota: (state) => state.quota,
    }),
  },
  data() {
    return {
      txt: "",
      listNumber: [6283812609066],
      // listNumber: [
      //   6283812609066, 6285703008684, 6282233477637, 62895343884140,
      //   6285691935749, 6285156306472, 6282218781134,
      // ],
      isIntervaled: false,
    };
  },
  mounted() {
    this.getDevice();
    this.getSent();
    this.checkQuota();
  },
  methods: {
    getDevice() {
      this.$store.dispatch("getDevice");
    },
    checkQuota() {
      this.$store.dispatch("getQuota");
    },
    generateQr() {
      this.$store
        .dispatch("getQr")
        .then((data) => {
          console.log(data);
          this.getDevice();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    broadcast() {
      let i = 0;
      let loop = null;
      this.isIntervaled = true;
      loop = setInterval(() => {
        this.send(this.listNumber[i]);
        i++;
        if (i == this.listNumber.length) {
          clearInterval(loop);
          this.isIntervaled = false;
          console.log("looping selesai");
        }
      }, 3000);
    },
    send(ppl) {
      console.log(ppl);
      let data = {
        phone_number: ppl,
        message: this.txt,
        device_id: "xiamoi-kentang",
        message_type: "text",
      };
      this.$store
        .dispatch("sendMsg", data)
        .then(() => {
          if (!this.isIntervaled) {
            this.txt = "";
          }
          this.checkQuota();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getSent() {
      this.$store.dispatch("getSentMsg");
    },
  },
};
</script>

<style>
</style>