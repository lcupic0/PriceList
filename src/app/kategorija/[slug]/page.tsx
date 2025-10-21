import style from "./kategorija.module.css";
import contentfulService from "@/lib/contentfulClient";

const KategorijaPage = async ({ params }: any)  => {

  const fetchedKategorija =
    await contentfulService.getArtikalsByCategorySlug((await params).slug);

  return (
    <div className={`${style.wrapper} ${style.container}`}>
      <div className={style.background}></div>

      <div className={style.cjenik}>
        <div className={style.cjenikHeader}>
          <div className={style.nazivKategorije}>{fetchedKategorija?.naziv}</div>
          <div className={style.nazivKategorije}>
            {fetchedKategorija?.nazivEngleski}
          </div>
        </div>

        <div className={style.cjenikProizvodi}>
          {fetchedKategorija?.artikli.map((artikal) => (
            <div className={style.cjenikProizvod} key={artikal.naziv}>
              <div className={style.nazivProizvoda}>
                <div>{artikal.naziv}</div>
                <div>{artikal.nazivEngleski}</div>
              </div>
              <div className={style.cijenaVolumen}>
                {artikal.volumen ? <span>{artikal.volumen} l</span> : <span />}
                <span className={style.cijenaProizvoda}>
                  {artikal.cijena.toFixed(2)} €
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default KategorijaPage