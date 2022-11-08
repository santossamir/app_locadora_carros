<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <!--Início card de busca.-->
                <card-component titulo="Busca de marcas">
                    <template v-slot:conteudo>
                        <div class="row">
                            <div class="col md-3">
                                <input-container-component titulo="ID" id="inputId" id-help="idHelp" texto-ajuda="Informe o ID da marca.">
                                    <input type="number" class="form-control" id="inputId" aria-describedby="idHelp" placeholder="ID" v-model="busca.id">
                                </input-container-component>
                            </div>
                            <div class="col md-3">
                                <input-container-component titulo="Nome da marca" id="inputNome" id-help="nomeHelp" texto-ajuda="Informe o nome da marca.">
                                    <input type="text" class="form-control" id="inputNome" aria-describedby="nomeHelp" placeholder="Nome da marca" v-model="busca.nome">
                                </input-container-component>
                            </div>
                        </div>
                    </template>
                    <template v-slot:rodape>
                        <button type="submit" class="btn btn-primary btn-sm me-md-2" @click="pesquisar()">Pesquisar</button>
                    </template>
                </card-component>
                <!--Final card de busca.-->

                <!--Início card listagem de marcas.-->
                <card-component titulo="Relação de Marcas">
                    <template v-slot:conteudo>
                        <table-component
                            :dados="marcas.data"
                            :visualizar="true"
                            :atualizar="true"
                            :remover="true"
                            :titulos="{
                                id: {titulo:'Id', tipo:'texto'},
                                nome: {titulo:'Nome', tipo:'texto'},
                                imagem: {titulo:'Logo', tipo:'imagem'},
                                created_at: {titulo:'Data da criação', tipo:'data'},
                            }">
                        </table-component>
                    </template>
                    <template v-slot:rodape>
                        <div class="row container-lg">
                            <div class="col-sm-10">
                                <paginate-component>
                                    <li v-for="l, key in marcas.links" :key="key" :class="l.active ? 'page-item active' : 'page-item'" @click="paginacao(l)">
                                        <a class="page-link" v-html="l.label"></a>
                                    </li>
                                </paginate-component>
                            </div>
                            <div class="col">
                                <button type="submit" class="btn btn-primary btn-sm me-md-2" data-bs-toggle="modal" data-bs-target="#modalMarca">Adicionar</button>
                            </div>
                        </div>
                    </template>
                </card-component>
                <!--Final card listagem de marcas.-->
            </div>
        </div>

        <!-- Modal -->
        <modal-component id="modalMarca" titulo="Adicionar Marca">

            <template v-slot:alertas>
                <alert-component tipo="success" :detalhes="transacaoDetalhes"  titulo="Cadastro realizado com sucesso!" v-if="transacaoStatus == 'adicionado'"></alert-component>
                <alert-component tipo="danger" :detalhes="transacaoDetalhes" titulo="Não foi possível fazer o cadastro." v-if="transacaoStatus == 'erro'"></alert-component>
            </template>

            <template v-slot:conteudo>
                <div class="form-group">
                    <input-container-component titulo="Nome da marca" id="novoNome" id-help="novoNomeHelp" texto-ajuda="Informe o nome da marca">
                        <input type="text" class="form-control" id="novoNome" aria-describedby="novoNomeHelp" placeholder="Nome da marca" v-model="nomeMarca">
                    </input-container-component>
                </div>

                <div class="form-group mt-3">
                    <input-container-component titulo="Imagem" id="novoImagem" id-help="novoImagemHelp" texto-ajuda="Selecione imagem no formato PNG">
                        <input type="file" class="form-control" id="novoImagem" aria-describedby="novoImagemHelp" placeholder="Selecione uma imagem" @change="carregarImagem($event)">
                    </input-container-component>
                </div>
            </template>
            <template v-slot:rodape>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                <button type="button" class="btn btn-primary" @click="salvar()">Salvar</button>
            </template>
        </modal-component>
        <!--<button type="button" @click="carregarLista()">Teste</button>-->
    </div>
</template>

<script>
    export default{
        computed:{
            token(){

                let token = document.cookie.split(';').find(indice =>{
                    return indice.includes('token=')
                })

                token = token.split('=')[1]
                token = 'Bearer ' + token

                return token
            }
        },
        data(){
            return{
                urlBase: 'http://localhost:8000/api/v1/marca',
                urlPaginacao: '',
                urlFiltro: '',
                nomeMarca:'',
                arquivoImagem:[],
                transacaoStatus: '',
                transacaoDetalhes: {},
                marcas: { data: [] },
                busca: {id: '', nome: ''}
            }
        },
        methods:{
            pesquisar() {

                let filtro = '';

                for(let chave in this.busca) {
                    if(this.busca[chave]){

                        if(filtro != ''){
                            filtro += ';'
                        }

                        filtro += chave + ':like:' + this.busca[chave];
                    }
                }
                if(filtro != ''){
                    this.urlPaginacao = 'page=1'
                    this.urlFiltro = '&filtro='+filtro
                }else{
                    this.urlFiltro = ''
                }

                this.carregarLista();
            },
            paginacao(l){
                if(l.url){
                    this.urlPaginacao = l.url.split('?')[1];
                    this.carregarLista()
                }
            },
            carregarLista(){

                let url = this.urlBase + '?' + this.urlPaginacao + this.urlFiltro;

                let config = {
                    headers:{
                        'Accept': 'aplication/json',
                        'Authorization': this.token
                    }
                }

                axios.get(url, config)
                    .then(response => {
                        this.marcas = response.data
                    })
                    .catch(errors => {
                        console.log(errors);
                    })
            },
            carregarImagem(e){
                this.arquivoImagem = e.target.files
            },
            salvar(){
                console.log(this.nomeMarca, this.arquivoImagem);

                let formData = new FormData();
                formData.append('nome', this.nomeMarca)
                formData.append('imagem', this.arquivoImagem[0])

                let config = {
                    headers:{
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'aplication/json',
                        'Authorization': this.token
                    }
                }

                axios.post(this.urlBase, formData, config)
                .then(response => {
                    this.transacaoStatus = 'adicionado'
                    this.transacaoDetalhes = {
                        mensagem:'ID do registro: '+response.data.id
                    };
                })
                .catch(errors =>{
                    this.transacaoStatus = 'erro';
                    this.transacaoDetalhes = {
                        mensagem: errors.response.data.message,
                        dados: errors.response.data.errors
                    };
                })
            }
        },
        mounted(){
            this.carregarLista()
        }
    }
</script>
