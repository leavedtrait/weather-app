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