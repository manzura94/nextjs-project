import { AppProps, AppContext } from 'next/app';
import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
    const { Component, ctx } = appContext;

    let pageProps = {};
    if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
};

export default MyApp;
