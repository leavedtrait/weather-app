<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WeatherController extends Controller
{
    // default city Nairobi
    public function index()
    {
        return $this->getWeatherByCity('Nairobi');
    }

    // query weather by city name 
    public function getWeatherByCityName(string $city)
    {
        return $this->getWeatherByCity($city);
    }

    // beautiful work right here
    private function getWeatherByCity(string $city)
    {
        $apiKey = env('WEATHER_API_KEY');

        // Get coordinates for the city
        $geoResponse = Http::get('http://api.openweathermap.org/geo/1.0/direct', [
            'q' => $city,
            'limit' => 1,
            'appid' => $apiKey,
        ]);

        if ($geoResponse->failed() || empty($geoResponse[0])) {
            return response()->json(['error' => 'Could not find location coordinates.'], 404);
        }

        $location = $geoResponse[0];
        $lat = $location['lat'];
        $lon = $location['lon'];

        // Get weather using coordinates
        $weatherResponse = Http::get('https://api.openweathermap.org/data/2.5/forecast', [
            'lat' => $lat,
            'lon' => $lon,
            'appid' => $apiKey,
            'units' => 'metric',
        ]);

        if ($weatherResponse->failed()) {
            return response()->json(['error' => 'Could not fetch weather data.'], 500);
        }
        $forecastData = $weatherResponse->json();
       
           //Get only the next 3 days by slicing the array (24 records = 3 days * 8 intervals/day)
           $threeDayForecast = array_slice($forecastData['list'], 0, 24);
       
           return response()->json([
               'location' => $location,
               'forecast' => $threeDayForecast,
           ]);
    }
}
