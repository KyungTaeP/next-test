import { BookData } from "@/types"

export default async function fetchBooks(q?:string) :Promise<BookData[]> {
    // http://localhost:12345/api/book or http://localhost:12345/book
    let url = `http://localhost:12345/book`

    // q가 존재하면 기존 url 에 다음을 추가
   if(q) {
    url += `/search?q=${q}`
   }

    try {
        const response = await fetch(url)
         // response 가 OK가 아니면 Error를 그대로 전달
        if(!response.ok){
            throw new Error()
        }

        return await response.json()
    }
    catch(err){
        console.error(err)
        return []
    }
}