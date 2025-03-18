import '../styles/globals.css';

// Main application component that wraps all pages
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
