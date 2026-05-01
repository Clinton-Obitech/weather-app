"use client"

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import styles from "./components.module.css";

type Hourly = {
    time: string[],
    temperature: number[]
}

export default function HourlyWeatherCard() {

    const [hourlyWeather, setHourlyWeather] = useState<Hourly>({
        time: [],
        temperature: []
    })

    const [message, setMessage] = useState("fetching hourly weather...");

    const scrollRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        async function getHourlyWeather() {

            try {
                if (!navigator.onLine) {
                    setMessage("no internet connection");
                    return;
                } else if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition( async (position) => {
                    const lat = position.coords.latitude;
                    const long = position.coords.longitude;

                    const { data } = await axios.post("/api/hourly-weather", {lat, long})
                    setHourlyWeather({
                        time: data.time,
                        temperature: data.temperature_2m
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
        getHourlyWeather();
    }, []);

    useEffect(() => {
        if (!hourlyWeather.time.length || !scrollRef.current) return;

           const now = new Date().getHours();

           const currentIndex = hourlyWeather.time.findIndex((t:string) => {
                return new Date(t).getHours() === now;
           })

           if (currentIndex !== -1) {
            scrollRef.current.children[currentIndex]?.scrollIntoView({
                behavior: "smooth",
                inline: "center",
                block: "nearest"
            })
           }
    }, [hourlyWeather.time])

    const getFeelsLike = (temp: number) => {
      if (temp < 20) return "Cold 🥶";
      if (temp < 28) return "Warm 🙂";
      if (temp < 35) return "Hot 🥵";
        return "Very hot 🔥";
    };

    return (
        <div className="hourly">
        <h2>Hourly weather</h2>
        {hourlyWeather.time.length ? (
            <section className="hourlyCard" ref={scrollRef} >
            {hourlyWeather.time.map((time, index) => (
                <div key={time}>
                    <p>{new Date(time).toLocaleTimeString([], {
                        hour: "numeric",
                        hour12: true
                    })}</p>
                    <p>{Math.round(hourlyWeather.temperature[index])}°C</p>
                    <span>{getFeelsLike(hourlyWeather.temperature[index])}</span>
                </div>
            ))}
          </section>
        ) : (
            <div className={styles.message}>{message}</div>
        )}
        </div>
    )
}