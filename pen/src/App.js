import "./style/App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Forum from "./pages/Forum";
import Gallery from "./pages/Gallery";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import { MessageProvider } from "./context/MessageContext";
import TopicDetails from "./pages/TopicDetails";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const AppRoutes = () => {
  const { user, loading } = useAuth();
  if (loading) {
    return <div className="loading">Loading...</div>
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/forum" element={user ? <Forum /> : <Navigate to="/" />} />
      <Route path="/topic/:id" element={<TopicDetails />} />
      <Route path="/gallery" element={user ? <Gallery /> : <Navigate to="/" />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
      <Route path="/messages" element={user ? <Messages /> : <Navigate to="/" />} />
    </Routes> 
  );
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <MessageProvider>
        <div className="App">
          <Header />
          <main className="main-content">
            <AppRoutes />
          </main>
          <Footer />
            </div>
          </MessageProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
