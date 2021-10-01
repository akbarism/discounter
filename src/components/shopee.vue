<template>
  <div class="container_component">
    <div class="breakpoint">
      <div class="mb-3">
        <h3>Data Order</h3>
      </div>
      <v-card class="pa-3 mb-3" v-for="(item, idx) in person" :key="idx">
        <div class="temp_close">
          <v-btn
            depressed
            x-small
            color="red"
            class="remove_person"
            dark
            @click="removePerson(item)"
            ><v-icon small>mdi-close</v-icon></v-btn
          >
        </div>
        <v-text-field
          label="Person Name"
          placeholder="Nama penghutang"
          hide-details="auto"
          v-model="item.name"
          outlined
          dense
          autocomplete="off"
        ></v-text-field>
        <div
          class="d-flex mt-2"
          v-for="(price, i) in item.pesanan"
          :key="`price-${i}`"
        >
          <div class="connector"></div>
          <div class="d-flex align-center mx-1">
            <b>Rp</b>
          </div>
          <v-text-field
            label="Order Price"
            hide-details="auto"
            v-model="price.price"
            type="number"
            outlined
            @blur="itemBlured(price)"
            :disabled="price.disabled"
            dense
            autocomplete="off"
          ></v-text-field>
          <div class="d-flex align-center">
            <v-btn
              fab
              depressed
              small
              color="red"
              class="ml-1"
              icon
              @click="removeOrder(price, idx)"
              ><v-icon>mdi-close-circle-outline</v-icon></v-btn
            >
          </div>
        </div>
        <div class="d-flex justify-end mt-2">
          <v-btn
            color="orange"
            small
            class="text-capitalize"
            dark
            depressed
            @click="addOrder(item)"
            >Add Order</v-btn
          >
        </div>
      </v-card>
      <div class="d-flex justify-end mt-2">
        <!-- <v-btn @click="checkPerson" class="mr-3">check</v-btn> -->
        <v-btn
          color="orange"
          dark
          class="text-capitalize"
          depressed
          @click="addPerson()"
          >Add Person</v-btn
        >
      </div>
      <div class="my-5">
        <v-card class="pa-3 mb-3">
          <h3 class="normal_line_height">Subtotal</h3>
          <small class="grey--text">(Total harga sebelum diskon)</small>
          <div>
            <h3>
              Rp
              {{
                subtotal
                  ? subtotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                  : 0
              }}
            </h3>
          </div>
        </v-card>
        <v-card class="pa-3 mb-3">
          <h3 class="normal_line_height">Diskon</h3>
          <small class="grey--text">(Subtotal Diskon Makanan)</small>
          <v-text-field
            label="Subtotal Diskon Makanan"
            v-model="diskon"
            placeholder="Subtotal Diskon Makanan"
            hide-details="auto"
            type="number"
            pattern="[1-9]"
            outlined
            dense
            class="mt-2"
          ></v-text-field>
        </v-card>
        <v-card class="pa-3">
          <h3>Biaya Tambahan</h3>
          <div class="mt-5">
            <div class="mb-5" v-for="item in extraCost" :key="item.name">
              <h3 class="normal_line_height">{{ item.name }}</h3>
              <small class="grey--text">{{ item.desc }}</small>
              <v-text-field
                :label="item.name"
                v-model="item.price"
                :placeholder="item.name"
                hide-details="auto"
                type="number"
                pattern="[1-9]"
                outlined
                dense
                class="mt-2"
              ></v-text-field>
              <v-divider class="my-2"></v-divider>
            </div>
          </div>
        </v-card>
      </div>
      <v-btn depressed block dark color="orange" @click="calculate"
        ><b>Hitung</b></v-btn
      >
      <v-card class="ma-3 pa-3" v-if="cutOff">
        <div v-for="(item, idx) in cutOff" :key="idx">
          Rp {{ item.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}
        </div>
        <div>
          Total Bayar : Rp
          {{ grandTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }}
        </div>
      </v-card>
      <DialogHasil
        v-bind:dialog="dialog"
        v-bind:person="person"
        v-bind:grandTotal="grandTotal"
        ref="hasil"
        @close="closeDialog"
      />
    </div>
  </div>
</template>

<script>
import DialogHasil from "./dialogHasil.vue";

export default {
  name: "penghitungDiskon",
  components: { DialogHasil },
  data() {
    return {
      person: [
        {
          name: "",
          pesanan: [
            {
              price: null,
              disabled: false,
            },
          ],
        },
      ],
      subtotal: null,
      extraCost: [
        {
          name: "Ongkir",
          desc: "(Ongkir yang sudah terdiskon)",
          price: null,
        },
        {
          name: "Biaya Layanan",
          desc: "(Jika Ada)",
          price: null,
        },
        {
          name: "Biaya Tambahan Utk restoran",
          desc: "(Jika Ada)",
          price: null,
        },
      ],
      diskon: null,
      cutOff: null,
      grandTotal: null,
      dialog: false,
    };
  },
  methods: {
    addOrder(item) {
      item.pesanan.push({
        price: null,
      });
    },
    addPerson() {
      this.person.push({
        name: "",
        pesanan: [
          {
            price: null,
          },
        ],
      });
    },

    elementFocused(count) {
      document.getElementById(`input-${count}`).focus();
    },

    itemBlured(item) {
      if (item.price) {
        item.disabled = true;
        this.countSubtotal();
      }
    },
    removeOrder(item, i) {
      const idx = this.person[i].pesanan.indexOf(item);
      if (idx > -1) {
        this.person[i].pesanan.splice(idx, 1);
        this.countSubtotal();
      }
    },
    removePerson(item) {
      const idx = this.person.indexOf(item);
      if (idx > -1) {
        this.person.splice(idx, 1);
        this.countSubtotal();
      }
    },
    countSubtotal() {
      this.person.forEach((item) => {
        let order = [];
        item.pesanan.forEach((i) => {
          let price = parseInt(i.price);
          if (!isNaN(price)) {
            order.push(price);
            item["startingPrice"] = order.reduce((a, b) => a + b, 0);
          }
        });
      });
      let temporal = [];
      this.person.forEach((item) => {
        temporal.push(item.startingPrice);
        this.subtotal = temporal.reduce((a, b) => a + b, 0);
      });
    },

    calculate() {
      let extra = this.extraCost.filter((el) => {
        return el.price != null && el.price != "";
      });
      extra = extra
        .map((el) => {
          return parseInt(el.price);
        })
        .reduce((a, b) => a + b, 0);
      let ListFinalPrice = [];
      this.person.forEach((unit) => {
        let cutOff =
          unit.startingPrice -
          (unit.startingPrice / this.subtotal) * this.diskon +
          extra / this.person.length;
        unit["finalPrice"] = Math.round(cutOff);
        ListFinalPrice.push(cutOff);
      });
      this.grandTotal = ListFinalPrice.reduce((a, b) => a + b, 0);
      this.dialog = true;
      // this.$refs.hasil.capture();
    },
    closeDialog() {
      this.dialog = false;
    },
  },
};
</script>

<style>
.container_component {
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  background: #f5f4f7;
}
.breakpoint {
  width: 100%;
  background: #fff;
  padding: 20px 20px 100px 20px;
}
.input_tmp {
  width: 50%;
}
.vold {
  width: 15%;
}
.counter {
  width: 35%;
}
.custom_input {
  border: 1px #000 solid;
  font-size: large;
  font-weight: bold;
  height: 35px;
  width: 35px;
}
._20font {
  font-size: 20px;
}
.normal_line_height {
  line-height: 5px;
}
.temp_close {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 5px;
}
.remove_person {
  right: -20px;
  margin-top: -20px;
}

.connector {
  border-radius: 0 0 0 5px;
  border-left: 1px solid gray;
  border-bottom: 1px solid gray;
  width: 10px;
  height: 15px;
  margin-left: 5px;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.rounded_max {
  border-radius: 10px !important;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
@media (min-width: 576px) {
  .breakpoint {
    width: 50%;
  }
}
@media (min-width: 768px) {
  .breakpoint {
    width: 40%;
  }
}
@media (min-width: 992px) {
  .breakpoint {
    width: 30%;
  }
}
</style>