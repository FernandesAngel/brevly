import axios from "axios";



interface Link {
    originalLink: string;
    shortLink: string;
    accessCount?: string;
    createdAt?: string;
}

export async function createLink(link: Link) {
  const response = await axios.post<Link>(
    "http://localhost:3333/links",
    link,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}