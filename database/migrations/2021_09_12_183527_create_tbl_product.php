<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblProduct extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_product', function (Blueprint $table) {
            $table->increments('pr_id');
            $table->integer('cate_id');
            $table->integer('br_id');
            $table->string('pr_name');
            $table->text('pr_des');
            $table->text('pr_content');
            $table->string('pr_price');
            $table->string('pr_img');
            $table->integer('pr_status');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tbl_product');
    }
}
