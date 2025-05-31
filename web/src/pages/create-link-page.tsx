
import { NewLink } from "../components/new-link";
import { LinkList } from "../components/link-list";

export function CreateLinkPage() {

    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-custom-gray-50">
        <section className="flex flex-col items-center justify-center gap-4 w-dvw p-4 md:flex-row md:items-start">
          <div className="flex flex-col items-center justify-center gap-4 w-full max-w-md md:max-w-sm">
            <img
              src="images/logo.png"
              alt="Brevly Logo"
              className="w-100 self-center md:self-start mb-4 md:mb-0"
            />
            <NewLink />
          </div>
          <div className="flex flex-col items-center md:mt-10 justify-center gap-4 w-full max-w-md md:max-w-lg lg:max-w-xl ">
            <LinkList />
          </div>
        </section>
      </main>
    )
  }