import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { MapPin } from "lucide-react";

export default function WeatherReport() {
  const [weatherData, setWeatherData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [location, setLocation] = useState("Mangalore");
  const [tempLocation, setTempLocation] = useState("Mangalore");
  
  const API = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY;

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
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherData(null);
    }
  };

  const handleLocationChange = () => {
    setLocation(tempLocation);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="bg-gray-800 text-white border-gray-700 h-full">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Weather Report</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-black hover:bg-gray-700 text-white flex items-center gap-2 w-full sm:w-auto">
                  <MapPin size={16} />
                  Change Location
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 text-white border-gray-700 max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-white">Change Location</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <Input
                    className="bg-black text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                    type="text"
                    placeholder="Enter city name"
                    value={tempLocation}
                    onChange={(e) => setTempLocation(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLocationChange()}
                  />
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      className="border-gray-600 text-gray-300 bg-gray-800 hover:bg-gray-700"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={handleLocationChange}
                    >
                      Update Location
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            {weatherData && (
              <div className="text-sm text-gray-300">
                Current: <span className="text-white font-medium">{weatherData.name}</span>
              </div>
            )}
          </div>
        </CardContent>

        {weatherData ? (
          <div className="px-6 pb-6">
            <div className="bg-gray-900 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">{weatherData.name}</h3>
                <span className="text-3xl font-bold text-blue-400">{Math.round(weatherData.main.temp)}°C</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="space-y-2">
                  <p className="text-gray-300">
                    <span className="text-white font-medium">Feels like:</span> {Math.round(weatherData.main.feels_like)}°C
                  </p>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">Weather:</span> {weatherData.weather[0].description}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-300">
                    <span className="text-white font-medium">Humidity:</span> {weatherData.main.humidity}%
                  </p>
                  <p className="text-gray-300">
                    <span className="text-white font-medium">Wind:</span> {weatherData.wind.speed} m/s
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-6 pb-6">
            <div className="bg-gray-900 rounded-lg p-4 text-center text-gray-400">
              Click "Change Location" to get weather data for your city
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}