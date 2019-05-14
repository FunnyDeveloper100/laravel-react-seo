<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    private $table = 'users';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists($this->table);

        Schema::create($this->table, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';

            $table->increments('id');

            $table->string('name', 64)->nullable(false)->unique();
            $table->string('email', 64)->nullable(false)->unique();
            $table->string('phone', 16)->nullable(true);
            $table->string('password', 64)->nullable(false);
            $table->string('image', 255)->nullable(true);
            $table->string('fullname', 128)->nullable(true);
            $table->string('address', 255)->nullable(true);
            $table->string('provider', 128)->nullable(true);
            $table->string('provider_id', 128)->nullable(true);
            $table->text('provider_data')->nullable(true);
            $table->tinyInteger('is_admin')->default(0);
            $table->tinyInteger('status')->default(0);
            $table->tinyInteger('gender')->default(0);
            $table->tinyInteger('deleted')->default(0);

            $table->timestamp('logged_at')->nullable(true);

            $table->rememberToken();

            $table->timestamps();

            $table->index(['status', 'deleted']);
        });

        DB::table($this->table)->insert([
            'name' => 'admin',
            'email' => 'admin@yeahkids.vn',
            'phone' => '0888523111',
            'password' => \Illuminate\Support\Facades\Hash::make('123312'),
            'image' => '',
            'fullname' => 'Administrator',
            'address' => 'Hanoi',
            'status' => 1
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists($this->table);
    }
}
