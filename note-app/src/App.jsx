import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index";
import NewNote from "./pages/NewNote/index";
import NoteDetail from "./pages/NoteDetail/index";
import './App.css'
import Layout from "./components/Layout/index";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<NewNote />} />
          <Route path="/notes/:id" element={<NoteDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
