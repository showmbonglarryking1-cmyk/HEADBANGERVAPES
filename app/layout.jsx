import "./globals.css";

export const metadata = {
  title: "Headbanger Vapes Pro",
  description: "Luxury reusable vape devices and accessories"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
