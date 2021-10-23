<template>
  <div class="container_component">
    <div class="breakpoint pa-3">
      <v-alert outlined color="orange">
        <div class="text-h6">Welcome</div>
        <div>
          Aplikasi untuk mmebagi hasil rata harga makanan yang sudah terdiskon, yang di beli menggunakan grabfood dan shopeefood.
        </div>
      </v-alert>
      <v-btn class="text-capitalize" block depressed color="orange" dark to="/shopee"
        >Mulai</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "penghitungDiskon",
  data() {
    return {
      items: [
        {
          price: null,
          originalPrice: null,
          qty: 1,
          disabled: false,
        },
      ],
      beforeTotal: null,
      diskon: null,
      ongkir: null,
      result: null,
      cutOff: null,
      grandTotal: null,
      idxEl: 0,
    };
  },
  methods: {
    addItem() {
      this.idxEl++;
      this.items.push({
        price: null,
        originalPrice: null,
        qty: 1,
        disabled: false,
      });
      setTimeout(() => this.elementFocused(this.idxEl), 100);
    },
    elementFocused(count) {
      document.getElementById(`input-${count}`).focus();
    },
    addQty(item) {
      if (item.price) {
        item.qty++;
        if (!item.originalPrice) {
          item.originalPrice = item.price;
          item.price = parseInt(item.price) + parseInt(item.originalPrice);
          this.countSubtotal();
        } else {
          item.price = parseInt(item.price) + parseInt(item.originalPrice);
          this.countSubtotal();
        }
      }
    },
    minQty(item) {
      if (item.qty > 1) {
        item.qty--;
        if (!item.originalPrice) {
          item.originalPrice = item.price;
          item.price = parseInt(item.price) - parseInt(item.originalPrice);
          this.countSubtotal();
        } else {
          item.price = parseInt(item.price) - parseInt(item.originalPrice);
          this.countSubtotal();
        }
      } else {
        const idx = this.items.indexOf(item);
        if (idx > -1) {
          this.items.splice(idx, 1);
          this.idxEl--;
        }
        this.countSubtotal();
      }
    },
    itemBlured(item) {
      if (item.price) {
        item.disabled = true;
        this.countSubtotal();
      }
    },
    countSubtotal() {
      let justPrice = this.items.map((el) => {
        return parseInt(el.price);
      });
      this.beforeTotal = justPrice.reduce((a, b) => a + b, 0);
    },
    calculate() {
      let orderList = [];
      let cutOff = [];
      this.items.forEach((item) => {
        if (item.price) {
          let unit = parseInt(item.price) / item.qty;
          for (let i = 0; i < item.qty; i++) {
            orderList.push(unit);
          }
        }
      });
      orderList.forEach((item) => {
        cutOff.push(
          item -
            (item / this.beforeTotal) * this.diskon +
            this.ongkir / orderList.length
        );
      });
      this.cutOff = cutOff.map((el) => {
        return Math.ceil(el);
      });
      this.grandTotal = cutOff.reduce((a, b) => a + b, 0);
    },
  },
};
</script>

<style scoped>
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
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
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