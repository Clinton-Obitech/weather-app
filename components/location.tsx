"use client"

import axios from "axios";
import { useEffect, useState } from "react";

export default function UserLocation() {

    const [location, setLocation] = useState({
        region: "",
        country: ""
    })

    useEffect(() => {
        const getUserLocation = async () => {
            try {
                if (!navigator.onLine) {
                   return;
                }

                const { data } = await axios.get("/api/location")

                 setLocation({
                   region: data.city,
                   country: data.country
                })

                    

            } catch (err) {
                console.error(err)
            }
        }
        getUserLocation();
    }, [])


    return (
        <div style={{display: "flex", gap: "0.5rem"}}>
            <i className="fa-solid fa-location-dot"/> 
            {location.region || location.country ? (
                <div>{location.region}, {location.country}</div>
            ) : (
               <div>not found</div>
            )}
        </div>
    )
}