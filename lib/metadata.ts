import type { Metadata } from "next";

export const siteConfig = {
  name: "Nihar Parekh",
  description:
    "Personal portfolio of Nihar Parekh. Specializing in cinematic editing, motion graphics, short-form reels, and visual storytelling.",
  url: "https://niharparekh.com",
  ogImage: "/og-image.png",
  creator: "@nihharise",
  authors: [
    {
      name: "Nihar Parekh",
      url: "mailto:niharparekh14@gmail.com",
    },
  ],
  keywords: [
    "Nihar Parekh",
    "Nihar",
    "Video Editor",
    "Motion Designer",
    "Cinematic Editor",
    "Short-Form Video",
    "After Effects",
    "Premiere Pro",
    "DaVinci Resolve",
    "Visual Storyteller",
  ],
} as const;

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [...siteConfig.authors],
  creator: siteConfig.creator,
  publisher: siteConfig.name,
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
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: siteConfig.creator,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.svg",
  },
  manifest: "/site.webmanifest",
};

export function createMetadata({
  title,
  description,
  path = "/",
  image,
  noIndex = false,
}: {
  title?: Metadata["title"];
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
}): Metadata {
  const ogTitle =
    typeof title === "string"
      ? title
      : typeof title === "object" && title !== null && "absolute" in title && typeof title.absolute === "string"
        ? title.absolute
        : siteConfig.name;

  const url = `${siteConfig.url}${path}`;
  const ogImage = image ?? siteConfig.ogImage;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: ogTitle,
      description: description ?? siteConfig.description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: typeof ogTitle === "string" ? ogTitle : siteConfig.name,
        },
      ],
    },
    twitter: {
      title: ogTitle,
      description: description ?? siteConfig.description,
      images: [ogImage],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
