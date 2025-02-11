import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

// NextPage에 getLayout을 추가 (page:ReactNode)이고, ReactNode를 반환
// getLayout이 없을 경우를 대비하여 ? 를 추가
type NextPageWithLayout = NextPage & {
  getLayout ?: (page:ReactNode)=> ReactNode
}

export default function App(
  { 
    Component, 
    pageProps 
  }: AppProps & {
    Component: NextPageWithLayout
  }
) {

  // getLayout 을 설정 안한 컴포넌트의 에러를 없애기 위한 코드
  const getLayout = Component.getLayout ?? ((page:ReactNode)=>page)

  return(
    <div>
      <GlobalLayout>
          {getLayout(<Component {...pageProps} />)}
      </GlobalLayout>
    </div>
    )
}
