import axios from "axios";

interface Link {
    originalLink: string;
    shortLink: string;
    accessCount: string;
    createdAt: string;
}

export async function getLinks() {

  const response = await axios.get<{ links: Link[] }>(
    "http://localhost:3333/links",
  );

  return { links: response.data.links };
}

export async function exportLinks() {
    const response = await axios.get<{ reportUrl: string }>(
        "http://localhost:3333/links/export",
    );

    return { url: response.data.reportUrl };
}

export async function getLinkByShortLink(shortLink: string) {

    const response = await axios.get<Link>(
        `http://localhost:3333/links/${shortLink}`
      );

    return { link: response.data };
}