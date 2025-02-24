import SearchableLayout from "@/components/searchable-layout"
import { useRouter } from "next/router"
import { ReactNode, useEffect, useState } from "react"
import BookItem from "@/components/book-item"
import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType } from "next"
import fetchBooks from "@/lib/fetch-book"
import { BookData } from "@/types"

/*
// SSR(서버 사이드 렌더링) 으로 반영
export const getServerSideProps = async(context : GetServerSidePropsContext) => {
    const q = context.query.q
    const books = await fetchBooks(q as string)

    return {
        props:{
            books
        }
    }
}
*/

// 검색 결과를 서버로부터 불러오는 동작은 불가.
// query 값을 불러 올 수없음
// 단, function Page 안에 작성해서가능
// export const getStaticProps = async(context : GetStaticPropsContext) => {
//     const q = context.query.q
//     const books = await fetchBooks(q as string)

//     return {
//         props:{
//             books
//         }
//     }
// }

// SSG 방식일 경우의 코드
export default function Page(){
    const [books, setBooks] = useState<BookData[]>([])

    const router = useRouter()
    const q = router.query.q

    const fetchSearchResult = async() => {
        const data = await fetchBooks(q as string)
        setBooks(data)
    }

    useEffect(()=>{
        if(q){
            // 검색 결과를 불러오는 로직
            fetchSearchResult()
        }
    }, [q])

   return (
   <div>
    {books.map((book)=>(
        <BookItem key={book.id} {...book} />
    ))}
   </div>
   )
}

/*
// SSR 시 코드
export default function Page({
    books
}: InferGetServerSidePropsType<typeof getServerSideProps>){
   return (
   <div>
    {books.map((book)=>(
        <BookItem key={book.id} {...book} />
    ))}
   </div>
   )
}
*/
Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}