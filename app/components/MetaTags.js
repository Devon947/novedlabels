'use client';

import Head from 'next/head';

export default function MetaTags({
  title = 'NOVEDLabels - Professional Shipping Labels & E-commerce Solutions',
  description = 'Premium shipping labels and e-commerce solutions. Fast, reliable, and professional shipping services for your business needs.',
  keywords = 'shipping labels, e-commerce, professional shipping, business solutions, NOVEDLabels',
  ogImage = 'https://novedlabels.com/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  canonical = 'https://novedlabels.com',
  children
}) {
  const fullTitle = `${title} | NOVEDLabels`;
  
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Additional Meta Tags */}
      {children}
    </Head>
  );
} 