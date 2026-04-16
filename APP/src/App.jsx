import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Layout } from "antd";
import Navbar from "./components/navbar/navbar";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Layout style={{ minHeight: "100vh" }}>
              <Header>
                <Navbar />
              </Header>
              <Content style={{ padding: "24px" }}>
                <HomePage />
              </Content>
              <Footer style={{ textAlign: "center" }}>footer</Footer>
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
