import { create } from "zustand";
import { persist } from "zustand/middleware";
import { exportLinks, getLinks, getLinkByShortLink } from "../http/get-links";
import { toast } from "react-toastify";
import { createLink } from "../http/create-link";
import { deleteLink } from "../http/delete-link";

export type Link = {
  originalLink: string;
  shortLink: string;
  accessCount?: string;
  createdAt?: string;
};

type LinkState = {
  links: Link[];
  addLink: (link: Link) => void;
  removeLink: (shortLink: string) => void;
  fetchLinks: () => void;
  exportLinks: () => Promise<string | undefined>;
  fetchLinkByShortLink: (shortLink: string) => Promise<Link | undefined>;
};

export const useLinks = create<LinkState>()(
  persist(
    (set) => ({
      links: [],

      addLink: async (link) => {
        try {
          const createdLink = await createLink(link);
          set((state) => ({ links: [...state.links, createdLink] }));
          toast.success("Link adicionado com sucesso!");
        } catch (error) {
          toast.error("Erro ao criar o link.");
          console.error("Erro ao criar link:", error);
        }
      },

      removeLink: async (shortLink) => {
        try {
          await deleteLink(shortLink);
          set((state) => ({
            links: state.links.filter((l) => l.shortLink !== shortLink),
          }));
          toast.success("Link removido com sucesso!");
        } catch (error) {
          toast.error("Erro ao deletar o link.");
          console.error("Erro ao deletar link:", error);
        }
      },

      fetchLinks: async () => {
        try {
          const { links } = await getLinks();
          set({ links });
        } catch (error) {
          toast.error("Erro ao buscar os links. Tente novamente.");
          console.error("Erro ao buscar links:", error);
        }
      },

      exportLinks: async () => {
        try {
          const { url } = await exportLinks();
          toast.success("CSV gerado com sucesso!");
          return url;
        } catch (error) {
          toast.error("Erro ao gerar CSV. Tente novamente.");
          console.error("Erro ao gerar CSV:", error);
        }
      },

      fetchLinkByShortLink: async (shortLink) => {
        try {
          const { link } = await getLinkByShortLink(shortLink);
          if (link) {
            set((state) => ({
                links: state.links.map((l) =>
                  l.shortLink === link.shortLink ? link : l
                ),
              }));
          }
          return link;
        } catch (error) {
          toast.error("Erro ao buscar o link.");
          console.error("Erro ao buscar link:", error);
        }
      },
    }),
    {
      name: "links-storage",
    }
  )
);
