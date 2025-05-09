import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import CountryDetails from "./components/CountryDetails";
import Home from "./pages/Home";
import ChatBot from "./components/ChatBot";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <ChatBot />
        <Routes>
          <Route path="/country/:id" element={<CountryDetails />} />
          <Route path="/" element={<Home />} />
          <Route path="/all" element={<Main />} />
          <Route path="/chat" element={<ChatBot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
