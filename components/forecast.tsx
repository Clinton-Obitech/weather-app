"use client"

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import UserLocation from "./location";
import styles from "./components.module.css";

type Daily = {
    day: string[],
    temperature_max: number[],
    temperature_min: number[],
    weather: number[]
}

export default function Forecast() {

    const [forecast, setForecast] = useState<Daily>({
        day: [],
        temperature_max: [],
        temperature_min: [],
        weather: []
    })

    const [message, setMessage] = useState("fetching forecast...")

    useEffect(() => {
        async function getForecast() {

            try {
                if (!navigator.onLine) {
                    setMessage("no internet connection");
                    return;
                } else if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition( async (position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;

                    const { data } = await axios.post("/api/daily-weather", {lat, long})
                    setForecast({
                        day: data.time,
                        temperature_max: data.temperature_2m_max,
                        temperature_min: data.temperature_2m_min,
                        weather: data.weathercode
                    })

                    }, (error) => {
                        if (error.code === 1) {
                            setMessage("location permission denied")
                            return;
                        } else if (error.code === 2) {
                            setMessage("location unavailable")
                            return;
                        } else if (error.code === 3) {
                            setMessage("location request timed out")
                            return;
                        }
                    })
                }

            } catch (err) {
                console.error(err)
                setMessage("something went wrong")
            }
        }
        getForecast();
    }, []);

    const weatherMap: Record<number, { label: string; emoji: string }> = {
      0: { label: "Clear sky", emoji: "☀️" },
      1: { label: "Mainly clear", emoji: "🌤️" },
      2: { label: "Partly cloudy", emoji: "⛅" },
      3: { label: "Overcast", emoji: "☁️" },

      45: { label: "Fog", emoji: "🌫️" },
      48: { label: "Fog", emoji: "🌫️" },

      51: { label: "Light drizzle", emoji: "🌦️" },
      53: { label: "Drizzle", emoji: "🌦️" },
      55: { label: "Heavy drizzle", emoji: "🌧️" },

      61: { label: "Light rain", emoji: "🌧️" },
      63: { label: "Rain", emoji: "🌧️" },
      65: { label: "Heavy rain", emoji: "🌧️" },

      80: { label: "Rain showers", emoji: "🌦️" },
      81: { label: "moderate Rain showers", emoji: "🌦️" },
      82: { label: "violent Rain showers", emoji: "⛈️" },
      95: { label: "Thunderstorm", emoji: "⛈️" }
    };

    return (
        <div>
           <section>
            <h2>7 days forecast</h2>
            <UserLocation />
            {forecast.day.length ? (
                <>
                {forecast.day.map((day, index) => (
                <div key={day}>
                    <p>{new Date(day).toLocaleDateString([], {
                        weekday: "long",
                        month: "short",
                        day: "numeric"
                    })}</p>

                    <div className="weather">
                        <p>{weatherMap[forecast.weather[index]]?.label}{" "}</p>
                        <span>{weatherMap[forecast.weather[index]]?.emoji}{" "}</span>
                    </div>

                    <div className="temperature">
                        <p>{Math.round(forecast.temperature_max[index])}°C</p>
                        <p>{Math.round(forecast.temperature_min[index])}°C</p>
                    </div>
                    
                </div>
            ))}
            </>
            ) : (
             <div className={styles.message}
             >
                {message}
            </div>
            )}
        </section>
        </div>
    )
}