export function StructuredData() {
  const baseUrl = "https://moments.mugio.studio";

  const gameSchema = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    name: "走走小日 moments",
    alternateName: ["走走小日", "moments", "麥尾"],
    description:
      "走走小日 moments 是一款療癒系日常遊戲，跟著麥尾與小貝狗在城市中探索。以步行蒐集、輕任務循環與角色互動為核心，陪你在城市裡記錄那些閃著光的小日常。",
    url: baseUrl,
    image: `${baseUrl}/moments_og.jpg`,
    keywords: "走走小日,麥尾,moments,療癒遊戲,日常遊戲,通勤遊戲",
    sameAs: [
      "https://www.instagram.com/mugio_studio/",
      "https://www.threads.com/@mugio_studio?xmt=AQF02DIAlQ7wBCOVZ-VhMzDSEHaKmZHHx_JHAI31v419qAg",
      "https://www.youtube.com/@Mugio-studio",
    ],
    publisher: {
      "@type": "Organization",
      name: "Mugio Studio",
    },
    character: [
      {
        "@type": "Thing",
        name: "麥尾",
        description: "走走小日 moments 的主要角色之一",
      },
      {
        "@type": "Thing",
        name: "小貝狗",
        description: "走走小日 moments 的主要角色之一",
      },
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "走走小日 moments",
    alternateName: ["走走小日", "moments", "麥尾"],
    url: baseUrl,
    description:
      "走走小日 moments 官方網站 - 一款療癒系日常遊戲，跟著麥尾與小貝狗在城市中探索。",
    publisher: {
      "@type": "Organization",
      name: "Mugio Studio",
    },
  };

  const structuredData = [gameSchema, websiteSchema];

  return (
    <>
      {structuredData.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
