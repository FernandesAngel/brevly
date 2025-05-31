import { useCallback, useEffect } from "react";
import { Button } from "./ui/button";
import { LinkItem } from "./ui/link-item";
import { DownloadSimpleIcon, LinkIcon } from "@phosphor-icons/react";
import { useLinks } from "../store/links";


 export function LinkList() {
  const { links, fetchLinks, exportLinks } = useLinks();

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const handleExportCSV = useCallback(async () => {
    const resultUrl = await exportLinks();

    if (resultUrl) {
      window.open(resultUrl, "_blank");
    }
  }, [exportLinks]);


   return (
      <div className="bg-custom-gray-100 w-full rounded-lg p-6 h-full max-h-[300px] md:max-h-[500px]">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-custom-gray-800 text-lg font-bold ">Meus links</h2>
          <Button size="small" onClick={handleExportCSV}>
            <DownloadSimpleIcon size={16}  color="#1F2025"  />
            Baixar CSV
          </Button>
        </div>

        <div className="gap-2 max-h-[200px] md:max-h-[350px] overflow-y-auto">
        {links
            .filter((link): link is NonNullable<typeof link> => link != null)
            .map((link) => (
                <div key={link.shortLink}>
                <div className="border border-gray-100 w-full" />
                <LinkItem
                    shortLink={link.shortLink}
                    fullLink={link.originalLink}
                    accessCount={link.accessCount?.toString() || "0"}
                />
                </div>
            ))}
            {!links || links.length === 0 && (
                <>
                <div className="border border-gray-100 w-full" />
                <div className="flex flex-col items-center justify-center h-full gap-5 py-8">
                    <LinkIcon size={40}  color="#74798B"  />
                    <p className="text-custom-gray-500 text-xs md:text-sm">AINDA NÃO EXISTEM LINKS CADASTRADOS</p>
                </div>
                </>
            )}
        </div>
      </div>
   );
 }