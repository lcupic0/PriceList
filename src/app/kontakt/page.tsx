import style from "./kontakt.module.css"
import Image from "next/image"

export default function Kontakt() {
    return(
        <div className={style.kontakt}>
            <div className={style.background}></div>
            <div className={style["left-col"]}>
            </div>
            <div className={style["right-col"]}>
                <div className={style.info}>
                    <h1>Kontaktirajte nas</h1>
                    <p>Imate bilo kakav oblik pitanja za nas? Primjedbu na neki proizvod? Želite prijaviti dobro ili loše iskustvo? Obratite nam se s povjerenjem!</p>
                </div>
                <form className={style.contactform}>
                    <div className={style.formgroup}>
                        <label htmlFor="fullname" className={style.label}>Ime i prezime</label>
                        <input className={style.input} type="text" name="fullname" placeholder="Unesite vaše ime i prezime"/>
                    </div>
                    <div className={style.formgroup}>
                        <label htmlFor="email" className={style.label}>Email</label>
                        <input className={style.input}  type="email" name="email" placeholder="Unesite vašu email adresu"/>
                    </div>
                    <div className={style.formgroup}>
                        <label className={style.label} htmlFor="opis">OPIS</label>
                        <textarea className={style.textarea} name="opis" cols={30} rows={6} placeholder='Pošaljite proizvoljni upit...'>
                        </textarea>
                    </div>
                    <button className={style.button}>Pošalji upit</button>
                </form>
            </div>
        </div>
    )
}