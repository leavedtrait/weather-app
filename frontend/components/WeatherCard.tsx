import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Sun } from "lucide-react"
import { JSX } from "react/jsx-dev-runtime"
import type {WeatherData} from "@/lib/utils"



export default function WeatherCard({ date, iconUrl, temperature }: WeatherData) {
  return (
    <Card className="max-w-xs rounded-sm md:max-w-md text-center">
      <CardHeader className="flex items-center justify-center">
        <CardTitle className="text-lg">{date}</CardTitle>
        
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <img src={iconUrl} alt="Weather Icon" width={50} height={50} />
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <CardDescription className="text-2xl font-bold">
          {temperature}
        </CardDescription>
      </CardFooter>
    </Card>
  )
}
