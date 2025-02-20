import SearchableLayout from "@/components/searchable-layout"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import BookItem from "@/components/book-item"
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next"
import fetchBooks from "@/lib/fetch-book"

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

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}