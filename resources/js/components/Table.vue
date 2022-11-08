<template>
    <div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th v-for="t, key in titulos" :key="key" scope="col">{{t.titulo}}</th>
                    <th v-if="visualizar || atualizar || remover"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="obj in dadosFiltrados" :key="chave">
                    <td v-for="valor, chaveValor in obj" :key="chaveValor">
                        <span v-if="titulos[chaveValor].tipo == 'texto'">{{valor}}</span>
                        <span v-if="titulos[chaveValor].tipo == 'data'">{{valor}}</span>
                        <span v-if="titulos[chaveValor].tipo == 'imagem'">
                            <img :src="'/storage/'+valor" width="40" height="40">
                        </span>
                    </td>
                    <td v-if="visualizar || atualizar || remover">
                        <button v-if="visualizar" class="btn btn-outline-primary btn-sm">Visualizar</button>
                        <button v-if="atualizar" class="btn btn-outline-success btn-sm">Atualizar</button>
                        <button v-if="remover" class="btn btn-outline-danger btn-sm">Remover</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        props:['dados', 'titulos', 'atualizar', 'remover', 'visualizar'],
        computed:{
            dadosFiltrados(){

                let campos = Object.keys(this.titulos);
                let dadosFiltrados = [];

                this.dados.map((item, chave)=>{

                    let itemFiltrado = {};

                    campos.forEach(campo =>{

                        itemFiltrado[campo] = item[campo]
                    });
                    dadosFiltrados.push(itemFiltrado);
                });

               return dadosFiltrados;
            }
        }
    }
</script>
