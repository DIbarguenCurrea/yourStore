import "./App.css";
import { Layout } from "antd";
import Cart from "./pages/cart";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import ProtectedRoute from "./routes/ProtectedRoute";

const { Header, Content, Footer } = Layout;

//Como le vamos añadir un Layout a la app, debemos primero sacar una función y luego usarla en el APP.

function MainLayout() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header>
        <Navbar />
      </Header>

      <Content style={{ padding: "24px" }}>
        <Outlet />
      </Content>

      <Footer style={{ textAlign: "center" }}>footer</Footer>
    </Layout>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Route>
    </Routes>
  );
}


export default App;
