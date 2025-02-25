import SearchableLayout from "@/components/searchable-layout"
import style from "./index.module.css"
import { ReactNode } from "react"
import BookItem from "@/components/book-item"
import { InferGetStaticPropsType } from "next"
import fetchBooks from "@/lib/fetch-book"
import fetchRandomBooks from "@/lib/fetch-random-books"
import Head from "next/head"

// SSG 으로 반영
export const getStaticProps= async() => {
  // const allBooks = await fetchBooks()
  // const recoBooks = await fetchRandomBooks()

  // 위에 두가지 fetch 를 병렬로 하나로 합친 코드
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks()
  ])

  return {
    // 객체를 반환해야함 (props로), 그래야 전달 가능
    props: {
      allBooks,
      recoBooks
    },
  }
}

// 자동으로 타읍을 추론해주는 명령어
export default function Home({ allBooks, recoBooks } : 
  // SSG 방식
  InferGetStaticPropsType<typeof getStaticProps>
) {

  return (
    <>
    <Head>
      <title>한입북스</title>
      {/* content 의 / 는 public */}
      <meta
        property="og:image"
        content="/thumbnail.png"
      />
      <meta
        property="og:title"
        content="한입북스"
      />
      <meta
        property="og:description"
        content="한입 북스에 등록된 도서들을 만나보세요"
      />
    </Head>
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) =>(
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) =>(
            <BookItem key={book.id} {...book} />
          ))}
      </section>
    </div>
    </>
  )
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}