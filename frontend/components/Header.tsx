'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation'; // Assuming you are using Next.js

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [unit, setUnit] = useState("metric"); // Default to Celsius (metric)
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize searchQuery from URL if it exists
    const initialCity = searchParams.get('city');
    if (initialCity) {
      setSearchQuery(initialCity);
    }

    // Initialize unit from URL if it exists
    const initialUnit = searchParams.get('unit');
    if (initialUnit === 'metric' || initialUnit === 'imperial') {
      setUnit(initialUnit);
    }
  }, [searchParams]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      const formattedCity = searchQuery.trim().toLowerCase().replace(/\s+/g, '-');
      console.log("Navigating to:", `/${formattedCity}`);
      router.push(`/${formattedCity}`)
      // In a real application, you would also trigger a weather data fetch here.
    }
  };

  const handleUnitChange = (newUnit: "metric" | "imperial") => {
    if (unit !== newUnit) {
      console.log("Changing unit to:", newUnit);
      setUnit(newUnit);
      // Update the URL with the unit query parameter
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set('unit', newUnit);
      router.push(`/?${newParams.toString()}`);
      // In a real application, you would likely refetch the weather data here.
    }
  };

  return (
    <div className=" w-full flex justify-between items-center space-x-4 ">
      {/* Search bar */}
      <form onSubmit={handleSearch} className="flex w-full md:max-w-sm max-w-xs justify-center items-center space-x-4">
        <Input
          type="search"
          placeholder="Search..."
          className="rounded-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit" size="icon" className="rounded-xs">
          GO
        </Button>
      </form>

      {/* Button group */}
      <div className="flex h-10 items-center mx-auto text-sm border">
        <Button
          className={`rounded-xs bg-transparent text-foreground hover:bg-white hover:text-background ${
            unit === "metric" ? "bg-white text-background" : ""
          }`}
          size="icon"
          onClick={() => handleUnitChange("metric")}
        >
          °C
        </Button>
        <Separator orientation="vertical" />
        <Button
          className={`rounded-xs bg-transparent text-foreground hover:bg-white hover:text-background ${
            unit === "imperial" ? "bg-white text-background" : ""
          }`}
          size="icon"
          onClick={() => handleUnitChange("imperial")}
        >
          °F
        </Button>
      </div>
    </div>
  );
}