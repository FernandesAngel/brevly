import { useCallback, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useLinks } from "../store/links";

function isValidURL(url: string) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function isAlphanumeric(text: string) {
  return /^[a-zA-Z0-9]+$/.test(text);
}

export function NewLink() {
  const [originalLink, setOriginalLink] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [errors, setErrors] = useState({
    originalLink: "",
    shortLink: "",
  });

  const { addLink } = useLinks();

  const validateInputs = () => {
    const newErrors = { originalLink: "", shortLink: "" };

    if (!originalLink) {
      newErrors.originalLink = "O link original é obrigatório.";
    } else if (!isValidURL(originalLink)) {
      newErrors.originalLink = "O link deve começar com https:// e ser válido.";
    }

    if (!shortLink) {
      newErrors.shortLink = "O link encurtado é obrigatório.";
    } else if (!isAlphanumeric(shortLink)) {
      newErrors.shortLink = "Use apenas letras e números, sem espaços ou símbolos.";
    }

    setErrors(newErrors);
    return !newErrors.originalLink && !newErrors.shortLink;
  };

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateInputs()) return;

      addLink({ originalLink, shortLink });
      setOriginalLink("");
      setShortLink("");
      setErrors({ originalLink: "", shortLink: "" });
    },
    [originalLink, shortLink, addLink]
  );

  return (
    <div className="bg-custom-gray-100 w-full rounded-lg p-6">
      <h1 className="text-custom-gray-800 text-lg font-bold mb-5">Novo link</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <Input
            type="text"
            label="LINK ORIGINAL"
            placeholder="https://exemplo.com.br"
            value={originalLink}
            onChange={(e) => setOriginalLink(e.target.value)}
          />
          {errors.originalLink && (
            <p className="text-red-500 text-xs mt-1">{errors.originalLink}</p>
          )}
        </div>

        <div>
          <Input
            type="text"
            label="LINK ENCURTADO"
            prefixText="brev.ly/"
            placeholder="exemplo123"
            value={shortLink}
            onChange={(e) => setShortLink(e.target.value)}
          />
          {errors.shortLink && (
            <p className="text-red-500 text-xs mt-1">{errors.shortLink}</p>
          )}
        </div>

        <Button type="submit" size="default" className="mt-2">
          Salvar Link
        </Button>
      </form>
    </div>
  );
}
