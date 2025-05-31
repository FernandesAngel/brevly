import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { CreateLinkPage } from "./pages/create-link-page";
import { LinkRedirectPage } from "./pages/link-redirect-page";
import { NotFoundPage } from "./pages/not-found-page";


export function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateLinkPage/>} />
        <Route path="/not-found" element={<NotFoundPage/>} />
        <Route path="/:shortLink" element={<LinkRedirectPage />} />
      </Routes>
      <ToastContainer />
    </Router>
  )
}

