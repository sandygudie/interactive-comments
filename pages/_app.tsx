import { AppProvider } from "../context/index";
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}


// use reducer method for updating state
// use login
// 

