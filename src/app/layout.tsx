import type { Metadata } from "next"
import "./globals.css"
import { Provider } from "@/components/ui/provider"
import { StructuredData } from "@/components/seo/StructuredData"
import Script from "next/script"

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === "production" ? "https://moments.mugio.studio" : "http://localhost:3000"),
  title: {
    default: "走走小日 moments - 陪妳一起過生活",
    template: "%s | 走走小日 moments",
  },
  description: "走走小日 moments 是一款生活系日常遊戲，跟著麥尾與小貝狗在城市中探索。追蹤我們以獲得最新消息與釋出時間。",
  keywords: ["走走小日", "麥尾", "moments", "Mugio Studio", "通勤", "日常遊戲", "療癒遊戲", "小麥", "小貝狗"],
  alternates: {
    canonical: "https://moments.mugio.studio",
  },
  authors: [{ name: "Mugio Studio" }],
  creator: "Mugio Studio",
  publisher: "Mugio Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://moments.mugio.studio",
    siteName: "走走小日 moments",
    title: "走走小日 moments - 陪你一起過生活",
    description: "走走小日 moments 是一款生活系日常遊戲，跟著麥尾與小貝狗在城市中探索。追蹤我們以獲得最新消息。",
    images: [
      {
        url: "/moments_og.jpg",
        width: 1200,
        height: 630,
        alt: "走走小日 moments",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "走走小日 moments - 一頁式官網",
    description: "走走小日 moments 是一款生活系日常遊戲，跟著麥尾與小貝狗在城市中探索。追蹤我們以獲得最新消息。",
    images: ["/moments_og.jpg"],
    creator: "@mugio_studio",
  },
  verification: {
    google: "",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const GA_ID = "G-K8RTFPVJ41"

  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <head>
        <StructuredData />
        {/* Google Analytics in head for verification */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        {/* Microsoft Clarity */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "u71eltbxbv");
          `}
        </Script>
      </head>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
