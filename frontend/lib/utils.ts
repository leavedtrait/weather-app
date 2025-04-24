import { clsx, type ClassValue } from "clsx"
import { JSX } from "react/jsx-dev-runtime"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type WeatherData = {
  date: string
  icon: JSX.Element
  temperature: string
}

export type StatusCardProps = {
  title: string;
  icon: JSX.Element;
  value: string;
};

export interface ForecastResponse {
  location: Location;
  forecast: Forecast[];
}

export interface Location {
  name: string;
  local_names: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export interface Forecast {
  dt: number;
  main: MainWeatherData;
  weather: WeatherDescription[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number; // Probability of precipitation
  rain?: Rain;
  sys: Sys;
  dt_txt: string;
}

export interface MainWeatherData {
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

export interface WeatherDescription {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Rain {
  '3h': number;
}

export interface Sys {
  pod: 'd' | 'n';
}
