const { default: axios } = require('axios');
//const { config } = require('vue/types/umd');

window._ = require('lodash');

try {
    require('bootstrap');
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios');

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });

axios.interceptors.request.use(
    config => {
        //Definir para todas as requisições parâmetros de accept e autorization
        config.headers.Accept = "appliation/json"

        //Recuperando token de autorização dos cookies
        let token = document.cookie.split(';').find(indice =>{
            return indice.includes('token=')
        })

        token = token.split('=')[1]
        token = 'Bearer ' + token

        config.headers.Authorization = token

        console.log('Interceptando resquest antes do envio.', config)
        return config
    },
    error => {
        console.log('Erro na requisição: ', error)
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    response => {
        console.log('Interceptamos a resposta antes da aplicação.', response)
        return response
    },
    error => {
        console.log('Erro na resposta: ', error.response);

        if(error.response.status == 401 && error.response.data.message == 'Token has expired'){
            console.log('Fazer uma nova requisição...');
            
            axios.post('http://localhost:8000/api/refresh')
                .then(response => {
                    console.log('Refresh com sucesso: ', response);

                    document.cookie = 'token='+response.data.token
                    console.log('Token atualizado: ', response.data.token);

                    window.location.reload()
                })
        }
        return Promise.reject(error)
    }
)
