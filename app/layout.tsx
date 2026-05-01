import "@/app/globals.css";
import Header from "../components/header";
import Footer from "@/components/footer";

export default function RootLayout({children}: 
  Readonly<{children: React.ReactNode;}>) 
{
  return (
    <html
      lang="en"
    >
      <head>
        <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
