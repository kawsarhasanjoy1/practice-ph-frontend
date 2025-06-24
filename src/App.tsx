import "./App.css";
import MainLayout from "./components/layout/MainLayout";
import PrivateRoute from "./components/layout/PrivateRoute";

function App() {
  return (
    <PrivateRoute role={undefined}>
      <MainLayout />
    </PrivateRoute>
  );
}

export default App;
