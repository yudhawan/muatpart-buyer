import localFont from "next/font/local";
import "./globals.scss";
import App from "@/common/App";

const azFont = localFont({
  src: [
    {
      path: "../fonts/AvenirNextLTPro-Bold.otf",
      weight: "700",
      style: "bolder",
    },
    {
      path: "../fonts/AvenirNextLTPro-Demi.otf",
      weight: "600",
      style: "bold",
    },
    {
      path: "../fonts/AvenirNextLTPro-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/AvenirNextLTPro-Regular.otf",
      weight: "400",
      style: "lighter",
    },
  ],
});

export const metadata = {
  title: "Muatparts Buyer",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${azFont.className} antialiased`}
      >
        <App>
          {children}
        </App>
      </body>
    </html>
  );
}
