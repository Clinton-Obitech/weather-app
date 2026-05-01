"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import UserLocation from "./location";
import styles from "./components.module.css";

type CurrentWeather = {
    time: string;
    interval: number;
    temperature: number;
    windspeed: number;
    winddirection: number;
    is_day: number;
    weathercode: number;
}

export default function CurrentWeatherCard() {

    const [currentWeather, setCurentWeather] = useState<CurrentWeather | null>(null)
    const [message, setMessage] = useState("fetching current weather...");

    useEffect(() => {
        async function getCurrentWeather() {
            try {
                if (!navigator.onLine) {
                    setMessage("no internet connection");
                    return;
                } else if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition( async (position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;

                    const { data } = await axios.post("/api/current-weather", {lat, long})
                    setCurentWeather(data)

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
        getCurrentWeather();
    }, [])


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
      95: { label: "Thunderstorm", emoji: "⛈️" }
    };

    const weather = currentWeather 
    ? weatherMap[currentWeather.weathercode] 
    : null;

    const getFeelsLike = (temp: number) => {
      if (temp < 20) return "Cold 🥶";
      if (temp < 28) return "Warm 🙂";
      if (temp < 35) return "Hot 🥵";
        return "Very hot 🔥";
    };

    const temp = currentWeather
    ? currentWeather.temperature : 0;

    const wind = currentWeather 
    ? currentWeather.windspeed : 0;

    const getWindLabel = (speed: number) => {
      if (speed < 10) return "Calm 🌬️";
      if (speed < 20) return "Breezy 🍃";
      if (speed < 40) return "Windy 🌪️";
        return "Very windy ⚠️";
    };

    const currentTime = 
    new Date().toLocaleTimeString("en-NG", {
            timeZone: "Africa/Lagos",
            weekday: "long",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
    })

    return (
        <div>
        <h2>Current weather</h2>

        {currentWeather ? (
            <div className="weatherCard">
            <section className="first">
                <UserLocation />
                <h2>NOW</h2>
                <span>{currentTime}</span>
            </section>

            <section className="second">
                <span className="emoji">{weather?.emoji}</span>
                <h3>{Math.round(temp)}°C {getFeelsLike(temp)}</h3>
                <h3 className="label">{weather?.label}</h3>
            </section>

            <section className="third">
                <h2>wind: {Math.round(wind)}km/h</h2>
                <h2>{getWindLabel(Math.round(wind))}</h2>
            </section>
        </div>
        ) : (
            <div className={styles.message}>{message}</div>
        )}
        </div>
    )
}