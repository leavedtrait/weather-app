<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WeatherController;

//decided to keep default laravel welcome page cause it looks good
Route::get('/', function () {
    return view('welcome');
});
//default city is Nairobi 
Route::get('/weather',[WeatherController::class, 'index']);
//get weather for city by id
Route::get('/weather/{city}',[WeatherController::class, 'getWeatherByCityName']);
