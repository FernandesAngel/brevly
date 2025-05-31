import { useCallback } from "react";
import { useLinks } from "../../store/links";
import { Button } from "./button";
import { CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { toast } from "react-toastify";

type ILinkItem = {
  shortLink: string;
  fullLink: string;
  accessCount: string;
 }

 export function LinkItem({
    shortLink,
    fullLink,
    accessCount,
 }: ILinkItem) {

  const { removeLink } = useLinks();

  const handleDelete = useCallback(() => {
    removeLink(shortLink);
  }, [removeLink, shortLink]);

  const accessURL = `${window.location.host}/${shortLink}`;

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(accessURL)
      .then(() => {
        toast.success("Link copiado para a área de transferência!");
      })
      .catch((error) => {
        console.error("Erro ao copiar o link:", error);
      });
  }, [accessURL]);

  const accessCountNNumber = Number(accessCount);
  const validAccessCount = Number.isNaN(accessCountNNumber) ? 0 : accessCountNNumber;

   return(
   <div className="flex flex-row justify-between items-center w-full ">
    <div className="text-custom-gray-800 gap-1 py-2 w-1/2">
      <a href={`/${shortLink}`} className="text-blue-base font-semibold truncate overflow-hidden whitespace-nowrap hover:text-blue-dark">
        brev.ly/{shortLink}
      </a>
      <p className="truncate overflow-hidden whitespace-nowrap">
        {fullLink}
      </p>
    </div>
    <div className="text-custom-gray-800 text-sm flex flex-row gap-1 items-center">
      <p>{validAccessCount} {validAccessCount === 1 ? "acesso" : "acessos"}</p>
      <Button size="icon" onClick={copyToClipboard} >
        <CopyIcon size={16}  color="#1F2025" />
      </Button>
      <Button size="icon" onClick={handleDelete}>
        <TrashIcon size={16}  color="#1F2025" />
      </Button>
    </div>

   </div>
  )

 }