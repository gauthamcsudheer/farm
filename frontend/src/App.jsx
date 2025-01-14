import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import MultilingualOCR from "./components/MultilingualOCR";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ocr" element={<MultilingualOCR />} />
            </Routes>
        </Router>
    );
}

export default App;
