'use client'
import WeatherCard from "@/components/WeatherCard";
import StatusCard from "@/components/StatusCard";
import { Droplets, Wind } from "lucide-react";
import { StatusCardProps, WeatherData as WeatherCardData } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams, useSearchParams } from 'next/navigation';
import { WeatherStatusSection } from "@/components/WeatherStatusSection";

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

// Define a type for the forecast item from your backend
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

interface ProcessedWeatherData extends Omit<WeatherCardData, 'icon'> {
  iconUrl: string;
}





export default function Home() {
  const [weatherData, setWeatherData] = useState<ProcessedWeatherData[]>([]);
  const [humidity, setHumidity] = useState<number>(0);
  const [windSpeed, setWindSpeed] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const unit = searchParams.get('unit');
  const params = useParams();

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      const cityParam = params.city || "Nairobi"; // Default to Nairobi

      try {
        const response = await fetch(`/api/weather/${cityParam}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: WeatherAPIResponse = await response.json();

        const processedWeatherData: ProcessedWeatherData[] = [];
        const today = new Date().toLocaleDateString();
        const nextThreeDays: string[] = [];
        let forecastIndex = 0;

        while (nextThreeDays.length < 3 && forecastIndex < data.forecast.length) {
          const forecastItem = data.forecast[forecastIndex];
          const forecastDate = new Date(forecastItem.dt_txt).toLocaleDateString();

          if (forecastDate !== today && !nextThreeDays.includes(forecastDate)) {
            nextThreeDays.push(forecastDate);
            const date = new Date(forecastItem.dt_txt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            });
            let temperature = forecastItem.main.temp;
            if (unit === 'imperial') {
              temperature = (temperature * 9) / 5 + 32;
            }
            const formattedTemperature = `${Math.round(temperature)}°${unit === 'imperial' ? 'F' : 'C'}`;
            const iconCode = forecastItem.weather[0]?.icon;

            processedWeatherData.push({ date, iconUrl: iconCode, temperature: formattedTemperature });
          }
          forecastIndex++;
        }

        if (data.forecast.length > 0) {
          // Assuming the first forecast item represents near-current conditions for humidity and wind
          setHumidity(data.forecast[0]?.main.humidity || 0);
          setWindSpeed(Math.round(data.forecast[0]?.wind.speed * 3.6) || 0);
        }

        setWeatherData(processedWeatherData);
        setLoading(false);
      } catch (e: any) {
        setError(e.message);
        setLoading(false);
        console.error("Could not fetch weather:", e);
      }
    };

    fetchWeather();
  }, [unit, params.city]);

  if (loading) {
    return (
      <div className="flex justify-between space-y-4 flex-col">
        <div className="p-2 grid grid-cols-2 md:grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton className="h-48 w-full" key={index} />
          ))}
        </div>
        <div className="flex flex-row p-4 items-center justify-center w-full">
          <div className="w-full grid grid-cols-2 gap-2 items-center">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="h-48 w-full rounded-xl" />
                <div className="space-y-2 mt-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-6 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error loading weather data: {error}</div>;
  }

  return (
    <div className="flex justify-between space-y-4 flex-col">
      <div className="p-2 grid grid-cols-2 md:grid-cols-3 gap-2">
        {weatherData.map((item, index) => (
          <WeatherCard
            key={index}
            date={item.date}
            iconUrl={`https://openweathermap.org/img/wn/${item.iconUrl}@2x.png`}
            temperature={item.temperature}
          />
        ))}
      </div>
      <div className="flex flex-row p-4 items-center justify-center w-full">
        <WeatherStatusSection humidity={humidity} windSpeed={windSpeed} />
      </div>
    </div>
  );
}