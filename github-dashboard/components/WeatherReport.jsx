import { useState,useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Car } from "lucide-react";
export default function WeatherReport() {
  const [weatherData, setWeatherData] = useState(null);
  const [cleanedData, setCleanedData] = useState(null);
  const [location, setLocation] = useState("Mangalore");
  const API=process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;
  

  useEffect(() => {
    if (API) {
      fetchWeather();
    } else {
      console.error("API key is not set");
    }
  }, [API, location]);
  
  const fetchWeather = async () => {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API}&units=metric`);
        console.log(JSON.stringify(response));
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        setWeatherData(data);
        }
    catch (error) {
        console.error("Error fetching weather data:", error);
        setWeatherData(null);
    }
    }
  return (
    <div className="space-y-4 sm:space-y-6">
    <Card className="bg-gray-800 text-white border-gray-700 h-full">
        <CardHeader>
            <CardTitle className="text-2xl font-semibold">Weather Report</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-row items-center gap-2 ">
          <Input
          className="bg-black text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
            type="text" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
            <Button
            className=" bg-black text-white"
            onClick={fetchWeather}
            >
              Get Weather
            </Button>

            
        </CardContent>
        <div className="p-4  text-white rounded-lg">
               {weatherData && (
  <div className="text-white space-y-2">
    <p className="text-xl font-bold">{weatherData.name}, {weatherData.sys.country}</p>
    <p className="text-lg">Temp: {weatherData.main.temp}°C</p>
    <p className="text-lg">Feels like: {weatherData.main.feels_like}°C</p>
    <p className="text-lg">Weather: {weatherData.weather[0].description}</p>
    <p className="text-lg">Humidity: {weatherData.main.humidity}%</p>
    <p className="text-lg">Wind: {weatherData.wind.speed} m/s</p>
  </div>
)}

              
            </div>
    </Card>
    </div>
  );
}
