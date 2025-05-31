
export function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-custom-gray-50 p-4 ">
        <div className="bg-custom-gray-100 rounded-lg p-12 flex flex-col items-center w-full max-w-lg">
            <img
              src="images/not_found.png"
              alt="404 Not Found"
            />
            <h1 className="text-custom-gray-800 text-lg font-bold mb-5 mt-4 text-center">Link não encontrado</h1>
            <div className="text-center text-custom-gray-500 text-sm gap-1 font-semibold">
                <p>O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em <a className="text-blue-base cursor-pointer" href="/">brev.ly</a>.</p>
            </div>
        </div>
    </main>
  );
}
