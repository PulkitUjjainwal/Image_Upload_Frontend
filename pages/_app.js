// _app.js
import "../styles/globals.css"; // Import global CSS
import { useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress"; // Import NProgress for loading indicator
import "nprogress/nprogress.css"; // Import NProgress styles
import axios from "axios";

// Custom App component
function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Configure axios to include the token in requests
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    const handleRouteChangeStart = () => {
      NProgress.start();
    };
    const handleRouteChangeComplete = () => {
      NProgress.done();
    };
    const handleRouteChangeError = () => {
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeError);

    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeError);
    };
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
