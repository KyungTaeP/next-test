import style from './searchable-layout.module.css'
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";

export default function SearchableLayout(
        {children}:{
            children: ReactNode
        }
    ){
        const router = useRouter()
        const [search, setSearch] = useState("")

        const q = router.query.q as string

        useEffect(()=>{
            setSearch(q || "")
        },[q])

        // React에서 발생한 ChangeEvent 인데,
        // HTML의 input 에서 발생한 이벤트 타입이라는 뜻
        const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value)
        }

        const onSubmit = () => {
            // search가 비어있거나, 
            // q 와 search가 동일하면 페이지 이동 없음
            if(!search || q === search) {
                return
            }
            router.push(`/search?q=${search}`)
        }

        // 이 이벤트는 React의 KeyboardEvent이고, 
        // HTML의 Input 영역에서 발생한 이벤트이다.
        const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if(e.key === 'Enter') {
                onSubmit()
            }
        }

    return (
        <div>
            <div className={style.searchbar_container}>
                <input
                value={search}
                onKeyDown={onKeyDown}
                onChange={onChangeSearch}
                placeholder="검색어를 입력하세요..." 
                />
                <button onClick={onSubmit}>검색</button>
            </div>
            {children}
        </div>
    )
}