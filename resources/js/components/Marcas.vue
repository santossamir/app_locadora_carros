<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <!--Início card de busca.-->
                <div class="card mb-4">
                    <div class="card-header">Buscando Marcas</div>

                    <div class="card-body">
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
                    </div>

                    <div class="card-footer d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" class="btn btn-primary btn-sm me-md-2">Pesquisar</button>
                    </div>
                </div>
                <!--Final card de busca.-->

                <!--Início card listagem de marcas.-->
                <div class="card">
                    <div class="card-header">Relação de Marcas</div>

                    <div class="card-body">
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                        <td>Jacob</td>
                                        <td>Thornton</td>
                                        <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                        <td colspan="2">Larry the Bird</td>
                                        <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="card-footer d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="submit" class="btn btn-primary btn-sm me-md-2">Adicionar</button>
                    </div>
                </div>
                <!--Início card listagem de marcas.-->
            </div>
        </div>
    </div>
</template>

<script>

</script>
