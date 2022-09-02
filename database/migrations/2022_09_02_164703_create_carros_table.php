<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarrosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_carros', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('modelo_id');
            $table->string('placa', 10)->unique();
            $table->boolean('disponivel');
            $table->integer('km');
            $table->timestamps();

            //foreign key (constraints)
            $table->foreign('modelo_id')->references('id')->on('tb_modelos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_carros');
    }
}
