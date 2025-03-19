import Head from "next/head";
import { FC, ReactNode, useEffect } from "react";

import { APP_LOGO, APP_NAME, APP_URL } from "@/utils/constants";

interface Props {
  title?: string;
  children?: ReactNode;
  pageId?: string;
  className?: string;
}

const Page: FC<Props> = ({ title = APP_NAME, children, className, pageId }) => {
  useEffect(() => {
    if (pageId !== undefined) {
      document.body.dataset["page"] = pageId;
    }
  }, [pageId]);

  const titleStr = title ? `${title} - ` : "";
  const logoUrl = `/img/${APP_LOGO}`;

  return (
    <div className={`${className} flex flex-col`}>
      <Head>
        <title>{`${titleStr}${APP_NAME}`}</title>

        <meta name="description" content="" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content={APP_NAME} />

        {/* Twitter */}
        <meta name="twitter:title" content={APP_NAME} />
        <meta name="twitter:description" content="" />
        <meta name="twitter:image" content={logoUrl} />
        <meta name="twitter:card" content={logoUrl} />

        {/* Facebook OG */}
        <meta property="og:title" content={APP_NAME} />
        <meta property="og:description" content="" />
        <meta property="og:image" content={logoUrl} />
        <meta property="og:url" content={APP_URL} />

        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>

      {children}
    </div>
  );
};

export default Page;
