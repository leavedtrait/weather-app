import { StatusCardProps } from "@/lib/utils";
import { Droplets, Wind } from "lucide-react";
import StatusCard from "./StatusCard";

export function WeatherStatusSection({ humidity, windSpeed }: { humidity: number; windSpeed: number }) {
  const status: StatusCardProps[] = [
    {
      title: "Humidity",
      icon: <Droplets />,
      value: `${humidity}%`,
    },
    {
      title: "Wind",
      icon: <Wind />,
      value: `${windSpeed} km/h`,
    },
  ];
    return (
      <div className="w-full grid grid-cols-2 gap-2 items-center">
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