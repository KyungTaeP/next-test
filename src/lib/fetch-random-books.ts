import { BookData } from "@/types"

// q 는 선택적. 안받아도 가능
export default async function fetchRandomBooks() : Promise<BookData[]> {
   const url = `http://localhost:12345/book/random`

   try {
    const response = await fetch(url)

    // response 가 OK가 아니면 Error를 그대로 전달
    if(!response.ok) {
        throw new Error()
    }
    return await response.json()
   } catch(err){
    console.error(err)
    return []
   }
}