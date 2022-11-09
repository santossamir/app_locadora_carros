
require('./bootstrap');

window.Vue = require('vue').default;

import Vue from 'vue';
/* Importando e configurando o vuex*/
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        item: {},
        transacao: { status: '', mensagem: '', dados: ''}
    }
})

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('login-component', require('./components/Login.vue').default);
Vue.component('home-component', require('./components/Home.vue').default);
Vue.component('marcas-component', require('./components/Marcas.vue').default);
Vue.component('input-container-component', require('./components/InputContainer.vue').default);
Vue.component('table-component', require('./components/Table.vue').default);
Vue.component('card-component', require('./components/Card.vue').default);
Vue.component('modal-component', require('./components/Modal.vue').default);
Vue.component('alert-component', require('./components/Alert.vue').default);
Vue.component('paginate-component', require('./components/Paginate.vue').default);

Vue.filter('formataDataTempoGlobal', function(d){
    if(!d){
        return ''
    }
    
    d = d.split('T')

    let data = d[0];
    let tempo = d[1];

    //Formatando data
    data = data.split('-');
    data = data[2] + '-' + data[1] + '-' + data[0];

    //Formatando tempo
    tempo = tempo.split('.');
    tempo = tempo[0];

    return data + '  ' + tempo
});

const app = new Vue({
    el: '#app',
    store
});
