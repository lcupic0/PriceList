import Link from "next/link";
import style from "./not-found.module.css"

const NotFound = () => {

    return(
        <div className={style.notfound}>
            <div className={style.wrapper}>
                <h1 className={style.naslov}>ERROR 404</h1>
                <div className={style.opis}>Izgleda da stranica koju tražite nije dostupna...</div>
                <Link href="/" style={{textDecoration: 'none'}}>
                    <button className={style.button}>Početna stranica</button>
                </Link>
            </div>
        </div>
    )
}

export default NotFound;