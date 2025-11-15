import { Routes, Route } from "react-router-dom";
import ListToDoPage from "./views/ListToDoPage";
import ListToDoDetailPage from "./views/ListToDoDetailPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListToDoPage />} />
        
      <Route path="/lists/:listId" element={<ListToDoDetailPage />} />
    </Routes>
  );
}
export default App;