import Image from "next/image";

export default function Header() {
    return (
        <header>
            <div>
                <Image
                src="/logo.png"
                alt="weather logo"
                width={70}
                height={50}
                style={{objectFit: "cover"}}
                />
            </div>
            <h2>Weatherly</h2>
        </header>
    )
}