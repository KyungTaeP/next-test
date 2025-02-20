import { BookData } from "@/types"

export default async function fetchOneBook(
    id:number
):Promise<BookData | null>{
    // BookData 를 반환하거나 null 을 반환
    const url = `http://localhost:12345/book/${id}`

    try {
        const response = await fetch(url)
        if(!response.ok) {
            throw new Error()
        }

        return await response.json()
    } catch(err){
        console.error(err)
        return null
    }
}