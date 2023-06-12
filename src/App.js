import React from "react";
import ChatPage from "./pages/ChatPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import Layout from "./components/Layout";
import ImageToTextConverter from "./pages/TestPage";
import ImageUploader from "./pages/TestPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ChatPage />} />
          <Route path="/auth" element={<ImageToTextConverter />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
