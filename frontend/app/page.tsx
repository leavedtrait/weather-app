import WeatherCard from "@/components/WeatherCard";
import StatusCard from "@/components/StatusCard"; // adjust path if needed
import { Droplets, Wind, Sun } from "lucide-react";
import { StatusCardProps, WeatherData } from "@/lib/utils";

export function WeatherStatusSection() {
  const status: StatusCardProps[] = [
    {
      title: "Humidity",
      icon: <Droplets/>,
      value: "68%"
    },
    {
      title: "Humidity",
      icon: <Droplets/>,
      value: "68%"
    }
  ]
  return (
    <div className="w-full grid grid-cols-2 gap-2  items-center">
      {status.map((item, index) => (
        <StatusCard
          key={index}
          title={item.title}
          icon={item.icon}
          value={item.value}
        />
      ))}
    </div>
  );
}


export default function Home() {
  const weatherData: WeatherData[] = [
    {
      date: "April 23",
      icon: <Sun />,
      temperature: "24°C",
    },
    {
      date: "April 24",
      icon: <Sun />,
      temperature: "26°C",
    },
    {
      date: "April 25",
      icon: <Sun />,
      temperature: "23°C",
    },
  ];

  return (
    <div className="flex justify-between space-y-4 flex-col">
      <div className="p-2 grid grid-cols-2 md:grid-cols-3 gap-2">
        {weatherData.map((item, index) => (
          <WeatherCard
            key={index}
            date={item.date}
            icon={item.icon}
            temperature={item.temperature}
          />
        ))}
      </div>
      <div className="flex flex-row p-4 items-center justify-center w-full">
        <WeatherStatusSection/>
      </div>
    </div>
   

  );
}
