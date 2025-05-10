import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import CountryDetails from "./components/CountryDetails";
import Home from "./pages/Home";
import ChatBot from "./components/ChatBot";
import "./App.css";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Posts from "./pages/Posts";

function App() {
  return (
    <Router>
      <Header />
      <div>
        <ChatBot />
        <Routes>
          <Route path="/country/:id" element={<CountryDetails />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignIn />} />
          <Route path="/countries" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/blog" element={<Posts />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
