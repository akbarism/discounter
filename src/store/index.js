import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    qr_code: null,
    res: null,
    status_device: null,
    sent_msg: null,
    quota: null,
  },
  mutations: {
    QR_CODE(state, data) {
      state.qr_code = data;
    },
    GET_QUOTA(state, data) {
      state.quota = data.quota;
    },
    GET_DEVICE(state, data) {
      state.status_device = data;
    },
    GET_SENT(state, data) {
      state.sent_msg = data;
    },
    ERR_MSG(state, error) {
      state.errMsg = error;
    },
    RES_MSG(state, error) {
      state.res = error;
    },
  },
  actions: {
    getDevice(context) {
      return new Promise((resolve, reject) => {
        let config = {
          // header token
          headers: {
            Authorization: `Bearer bQtgudb42{~a@MqzkuP~K4e}trSVWiIuyMm9i2U5Sr{ikJ9p-akbar`,
          },
        };
        axios
          .get(`https://api.kirimwa.id/v1/devices/xiamoi-kentang`, config)
          .then((res) => {
            let data = res.data;
            context.commit("GET_DEVICE", data);
            resolve(data);
          })
          .catch((error) => {
            context.commit("ERR_MSG", error.response.data);
            reject(error.response.data);
          });
      });
    },
    getQr(context) {
      return new Promise((resolve, reject) => {
        let config = {
          // header token
          headers: {
            Authorization: `Bearer bQtgudb42{~a@MqzkuP~K4e}trSVWiIuyMm9i2U5Sr{ikJ9p-akbar`,
          },
        };
        axios
          .get(`https://api.kirimwa.id/v1/qr?device_id=xiamoi-kentang`, config)
          .then((res) => {
            let data = res.data;
            context.commit("QR_CODE", data);
            resolve(data);
          })
          .catch((error) => {
            context.commit("ERR_MSG", error.response.data);
            reject(error.response.data);
          });
      });
    },
    getQuota(context) {
      return new Promise((resolve, reject) => {
        let config = {
          // header token
          headers: {
            Authorization: `Bearer bQtgudb42{~a@MqzkuP~K4e}trSVWiIuyMm9i2U5Sr{ikJ9p-akbar`,
          },
        };
        axios
          .get(`https://api.kirimwa.id/v1/quotas`, config)
          .then((res) => {
            let data = res.data;
            context.commit("GET_QUOTA", data);
            resolve(data);
          })
          .catch((error) => {
            context.commit("ERR_MSG", error.response.data);
            reject(error.response.data);
          });
      });
    },
    sendMsg(context, data) {
      return new Promise((resolve, reject) => {
        let config = {
          // header token
          headers: {
            Authorization: `Bearer bQtgudb42{~a@MqzkuP~K4e}trSVWiIuyMm9i2U5Sr{ikJ9p-akbar`,
          },
        };
        axios
          .post(`https://api.kirimwa.id/v1/messages`, data, config)
          .then((res) => {
            let data = res.data;
            context.commit("RES_MSG", data);
            resolve(data);
          })
          .catch((error) => {
            context.commit("ERR_MSG", error.response.data);
            reject(error.response.data);
          });
      });
    },
    getSentMsg(context) {
      return new Promise((resolve, reject) => {
        let config = {
          // header token
          headers: {
            Authorization: `Bearer bQtgudb42{~a@MqzkuP~K4e}trSVWiIuyMm9i2U5Sr{ikJ9p-akbar`,
          },
        };
        axios
          .get(`https://api.kirimwa.id/v1/messages`, config)
          .then((res) => {
            let data = res.data;
            context.commit("GET_SENT", data);
            resolve(data);
          })
          .catch((error) => {
            context.commit("ERR_MSG", error.response.data);
            reject(error.response.data);
          });
      });
    },
  },
  modules: {},
});
