<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent scrollable max-width="500px">
      <v-card>
        <v-toolbar dense flat>
          <h3>Screenshoot sebelum close</h3>
          <v-spacer></v-spacer>
          <v-btn fab x- small depressed @click="$emit('close')"
            ><v-icon small>mdi-close</v-icon></v-btn
          >
        </v-toolbar>
        <v-card-text v-if="grandTotal">
          <div id="bill">
            <div id="content">
              <div class="r pa-2">
                <div class="pertiga"><b>Name</b></div>
                <div class="pertiga"><b>Harga</b></div>
              </div>
              <div class="r pa-2" v-for="(item, idx) in person" :key="idx">
                <div class="pertiga">{{ item.name }}</div>
                <div class="pertiga">Rp {{ item.finalPrice }}</div>
              </div>
              <div class="r pa-2">
                <div class="pertiga">
                  <div class="d-flex justify-end px-2"><b>Total:</b></div>
                </div>
                <div class="pertiga">
                  <b
                    >Rp
                    {{
                      grandTotal
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                    }}</b
                  >
                </div>
              </div>
            </div>
          </div>
        </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import html2canvas from "html2canvas";
export default {
  name: "dialogHasil",
  props: ["dialog", "person", "grandTotal"],
  methods: {
    capture() {
      setTimeout(() => {
        let el = document.getElementById("bill");
        html2canvas(el).then(function (canvas) {
          el.appendChild(canvas);
          document.getElementById("content").style.display = "none";
        });
      }, 200);
    },
    downloadImg() {
      let cnvs = document.getElementsByTagName('canvas')[0]
      console.log(cnvs);
      var dt = cnvs.toDataURL("image/jpeg");
      location.href = dt;
    },
  },
};
</script>

<style scoped>
.pertiga {
  width: calc(100% / 2);
}
.r {
  display: flex;
  border-bottom: 1px #f5f4f7 solid;
}
.r:hover {
  background: #f5f4f7;
}
</style>