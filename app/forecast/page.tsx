import Forecast from "@/components/forecast";
import "./forecast.css";

export default function ForecastDashboard() {
    return (
        <div className="forecast">
            <h1>Forecast</h1>
            <main>
                <Forecast />
            </main>
        </div>
    )
}