import { AppProviders } from "./providers";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./styles/global.css";
import "./styles/theme.css";

function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}

export default App;
