import "@/app/dashboard/dashboard.css";
import CurrentWeatherCard from "@/components/current-weather-card";
import HourlyWeatherCard from "@/components/hourly-weather-card";

export default function WeatherDashboard() {
    return (
        <div className="dashboard">
            <h1>my weather</h1>
            <main>
                <CurrentWeatherCard />
                <HourlyWeatherCard />
            </main>
        </div>
    )
}