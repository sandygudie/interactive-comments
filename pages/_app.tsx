import { AppProvider } from "../context/index";
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  return (
    <AppProvider>
      <Component {...pageProps} />
    </AppProvider>
  );
}

// is context necessary for this app
// can you used conmponent composition
//use lodash method for mapping
// use reducer method for updating state
// learn recursive
// change component and page naming
// ensure typescriptt
