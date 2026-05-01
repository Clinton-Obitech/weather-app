import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import UserLocation from "@/components/location";

export default async function Home() {
  
  return (
    <div className="home">
      <main className="relative w-full h-[500px]">
        <Image
        src="/weather-bg.png"
        alt="weather background"
        fill
        style={{objectFit: "cover", objectPosition: 'right'}}
        loading="eager"
        />
        <div className="location">
        <UserLocation />
        </div>
        <h1>stay ahead<br></br>of the weather</h1>
        <h3>get real time updates, accurate forecasts, 
          and everything you need to plan your day with confidence.
        </h3>
        <nav>
          <Link href="/dashboard" style={{backgroundColor: "navy", color: "white"}}>
          <i className="fa-solid fa-cloud"></i>
          check weather
          </Link>
          <Link href="/forecast" style={{backgroundColor: "whitesmoke", color: "black"}}>
          <i className="fa-solid fa-calendar"></i>
          view forecast
          </Link>
        </nav>
      </main>
        <h2>from sunny mornings to unexpected storms,
          our weather app keeps you informed anytime,anywhere.
        </h2>
      <section className="highlights">
        <section>
          <span style={{backgroundColor: "blue"}}><i className="fa-solid fa-temperature-empty"></i></span>
          <h2>real-time condition</h2>
          <h3>see current temperature, humidity, wind speed, and more at a glance.</h3>
        </section>
        <section>
          <span style={{backgroundColor: "green"}}><i className="fa-solid fa-calendar"></i></span>
          <h2>accurate forecast</h2>
          <h3>hourly and 7-days forecasts powered by reliable data to help you plan better.</h3>
        </section>
        <section>
          <span style={{backgroundColor: "purple"}}><i className="fa-solid fa-location-dot"></i></span>
          <h2>location-based updates</h2>
          <h3>automatically detect your location and get instant weather updates wherever you are.</h3>
        </section>
      </section>

      <div className="notification">
      <section>
        <Image
        src="/notification-bg.png"
        alt="notification background"
        fill
        style={{objectFit: "cover", objectPosition: 'top', borderRadius: "3px"}}
        />
        <h2>be prepared,<br></br>everyday</h2>
        <h4>don't let the weather catch you off guard.<br></br>stay informed and stay ready.</h4>
        <a href="">enable alerts</a>
      </section>
      </div>
    </div>
  );
}
