import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {

  seconds: 61,

  countdown: function () {

    var countdownFn = setInterval(function () {

      this.seconds--;

      if(this.seconds<=0){

        clearInterval(countdownFn);

      }

    }.bind(this),1000);

  },

  workDeskState: '',

};

const store = new Vuex.Store({

  state

});



export default store;
