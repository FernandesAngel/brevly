import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useLinks } from "../store/links";

export function LinkRedirectPage() {
  const { fetchLinkByShortLink } = useLinks();
  const { shortLink } = useParams<{ shortLink: string }>();
  const [originalLink, setOriginalLink] = useState<string | null>(null);
  const navigate = useNavigate();
  const hasFetched = useRef(false);

  const fetchOriginalLink = useCallback(async (short: string) => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    try {
      if (!short) {
        throw new Error("Short link is required");
      }

      const data = await fetchLinkByShortLink(short);

      if (data?.originalLink) {
        setOriginalLink(data?.originalLink);
        setTimeout(() => {
         window.location.href = data?.originalLink;
        }, 2000);
      }
    } catch (error) {
      toast.error("Link não encontrado");
      console.error("Erro ao buscar link:", error);
      navigate("/not-found");
    }
  }, [navigate, fetchLinkByShortLink]);

  useEffect(() => {
    if (shortLink) {
      fetchOriginalLink(shortLink);
    }
  }, [fetchOriginalLink, shortLink]);

  const url = originalLink || "/";

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-custom-gray-50 p-4 ">
      <div className="bg-custom-gray-100 w-full rounded-lg p-6 flex flex-col items-center max-w-md">
        <img src="images/logo_redirect.svg" alt="Redirecionando" />
        <h1 className="text-custom-gray-800 text-lg font-bold mb-5 text-center">
          Redirecionando...
        </h1>
        <div className="text-center text-custom-gray-500 text-sm gap-1 font-semibold">
          <p>O link será aberto automaticamente em alguns instantes.</p>
          <p>
            Não foi redirecionado?{" "}
            <a className="text-blue-base cursor-pointer" href={url}>
              Acesse aqui
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
