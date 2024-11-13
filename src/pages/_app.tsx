// src/pages/_app.tsx
import '../styles/globals.css';
import { AppProps } from 'next/app';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main className="container">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
