import SearchableLayout from "@/components/searchable-layout"
import style from "./index.module.css"
import { ReactNode, useEffect } from "react"
import books from '@/mock/books.json'
import BookItem from "@/components/book-item"
import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next"
import fetchBooks from "@/lib/fetch-book"
import fetchRandomBooks from "@/lib/fetch-random-books"

/*
// SSR(서버 사이드 렌더링) 으로 반영
// 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수
// 사전 렌더링 시 1번만 서버에서 실행됨
export const getServerSideProps= async() => {
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
    }
  }
}
*/
// SSG 으로 반영
export const getStaticProps= async() => {
  // const allBooks = await fetchBooks()
  // const recoBooks = await fetchRandomBooks()
  console.log('인덱스 페이지(SSG)')

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
    }
  }
}

// 자동으로 타읍을 추론해주는 명령어
export default function Home({ allBooks, recoBooks } : 
  // SSR 방식
  // InferGetServerSidePropsType<typeof getServerSideProps>
  // SSG 방식
  InferGetStaticPropsType<typeof getStaticProps>
) {

  return (
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
  )
}

Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}