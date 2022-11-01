<template>
    <div>
        <table class="table table-hover">
            <thead>
                <tr >
                    <th v-for="t, key in titulos" :key="key" scope="col" class="text-uppercase">{{t}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="obj in dados" :key="obj.id">
                    <td v-if="titulos.includes(chave)" v-for="valor, chave in obj" :key="chave">
                        <span v-if="chave == 'imagem' ">
                            <img :src="'/storage/'+valor" width="40" height="40">
                        </span>
                        <span v-else>
                            {{valor}}
                        </span>
                    </td>
                    <!--<th scope="row">{{m.id}}</th>
                    <td>{{m.nome}}</td>
                    <td><img :src="'/storage/'+m.imagem" width="40" height="40"></td>
                    -->
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        props:['dados', 'titulos']
    }
</script>
