'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel
} from "@/components/ui/sidebar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { JSX, useEffect, useState } from "react"
import { useParams, useSearchParams } from 'next/navigation';

type WeatherData = {
  weather: string
  iconUrl: string // Changed to store the image URL
  temperature: string
}

interface LocalNames {
  zh?: string;
  [key: string]: string | undefined;
}

interface Location {
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Rain {
  '3h'?: number;
}

interface Sys {
  pod: string;
}

interface ForecastItem {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  sys: Sys;
  dt_txt: string;
}

interface WeatherAPIResponse {
  location: Location;
  forecast: ForecastItem[];
}

export function SidebarCard({ weather, iconUrl, temperature }: WeatherData) {
  if (iconUrl !== ""){
    return (
      <Card className="max-w-xs border-transparent rounded-sm md:max-w-md text-center">
        <CardHeader className="flex items-center justify-center">
          <CardTitle className="text-lg">
            <img src={`https://openweathermap.org/img/wn/${iconUrl}@2x.png`} alt={weather} width={50} height={50} />
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          {temperature}
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <CardDescription className="text-2xl font-bold">
            {weather}
          </CardDescription>
        </CardFooter>
      </Card>
    )
    
  }
  
  return (
    <Card className="max-w-xs border-transparent rounded-sm md:max-w-md text-center">
      <CardHeader className="flex items-center justify-center">
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {temperature}
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <CardDescription className="text-2xl font-bold">
          {weather}
        </CardDescription>
      </CardFooter>
    </Card>
  )
  
}

export function AppSidebar() {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [locationName, setLocationName] = useState<string>("Nairobi");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const searchParams = useSearchParams();
  const unit = searchParams.get('unit'); // Get the 'unit' query parameter

  useEffect(() => {
    const fetchWeather = async (city: string, currentUnit: string | null) => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/weather/${city}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: WeatherAPIResponse = await response.json();
        setLocationName(data.location.name);

        if (data.forecast && data.forecast.length > 0) {
          const currentWeatherItem = data.forecast[0];
          let temperature = currentWeatherItem.main.temp;
          const weatherDescription = currentWeatherItem.weather[0]?.main || "Unknown";
          const iconCode = currentWeatherItem.weather[0]?.icon;
          let unitSymbol = '°C';

          if (currentUnit === 'imperial') {
            temperature = (temperature * 9) / 5 + 32;
            unitSymbol = '°F';
          }

          setCurrentWeather({
            weather: weatherDescription,
            iconUrl: iconCode, // Store the icon code directly
            temperature: `${Math.round(temperature)}${unitSymbol}`,
          });
        } else {
          setError("No forecast data available.");
        }
      } catch (e: any) {
        setError(e.message);
        console.error("Could not fetch weather:", e);
      } finally {
        setLoading(false);
      }
    };

    const cityParam = Array.isArray(params.city) ? params.city[0] : params.city;
    const currentUnit = searchParams.get('unit');
    fetchWeather(cityParam ?? "Nairobi", currentUnit);
  }, [params.city, searchParams]);

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
       
        {loading ? (
          <SidebarCard
            weather="Loading..."
            temperature=""
            iconUrl="01d" // Placeholder icon
          />
        ) : error ? (
          <SidebarCard
            weather="Error"
            temperature={error}
            iconUrl="01d" // Placeholder icon
          />
        ) : currentWeather ? (
          <SidebarCard
            weather={currentWeather.weather}
            temperature={currentWeather.temperature}
            iconUrl={currentWeather.iconUrl}
          />
        ) : (
          <SidebarCard
            weather="No data"
            temperature="Could not load weather"
            iconUrl="01d" // Placeholder icon
          />
        )}
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarCard
          weather={locationName}
          temperature={new Date().toLocaleDateString('en-GB')}
          iconUrl="" // No icon for location
        />
      </SidebarFooter>
    </Sidebar>
  )
}