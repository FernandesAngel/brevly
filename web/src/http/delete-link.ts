import axios from "axios";


export async function deleteLink(shortLink: string) {
  const response = await axios.delete(
    `http://localhost:3333/links/${shortLink}`,
  );

  return { status: response.status };
}