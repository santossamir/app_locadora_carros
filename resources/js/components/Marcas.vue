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
                                    <input type="number" class="form-control" id="inputId" aria-describedby="idHelp" placeholder="ID">
                                </input-container-component>
                            </div>
                            <div class="col md-3">
                                <input-container-component titulo="Nome da marca" id="inputNome" id-help="nomeHelp" texto-ajuda="Informe o nome da marca.">
                                    <input type="text" class="form-control" id="inputNome" aria-describedby="nomeHelp" placeholder="Nome da marca">
                                </input-container-component>
                            </div>
                        </div>
                    </template>
                    <template v-slot:rodape>
                        <button type="submit" class="btn btn-primary btn-sm me-md-2">Pesquisar</button>
                    </template>
                </card-component>
                <!--Final card de busca.-->

                <!--Início card listagem de marcas.-->
                <card-component titulo="Relação de Marcas">
                    <template v-slot:conteudo>
                        <table-component></table-component>
                    </template>
                    <template v-slot:rodape>
                        <button type="submit" class="btn btn-primary btn-sm me-md-2" data-bs-toggle="modal" data-bs-target="#modalMarca">Adicionar</button>
                    </template>
                </card-component>
                <!--Início card listagem de marcas.-->
            </div>
        </div>

        <!-- Modal -->
        <modal-component id="modalMarca" titulo="Adicionar Marca">
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
    </div>
</template>

<script>
    export default{
        data(){
            return{
                urlBase: 'http://localhost:8000/api/v1/marca',
                nomeMarca:'',
                arquivoImagem:[]
            }
        },
        methods:{
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
                        'Accept': 'aplication/json'
                    }
                }

                axios.post(this.urlBase, formData, config)
                .then(response => {
                    console.log(response);
                })
                .catch(erros =>{
                    console.log(erros);
                })
            }
        }
    }
</script>
