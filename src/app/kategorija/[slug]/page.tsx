// src/app/kategorija/[slug]/page.tsx
import style from "./kategorija.module.css";
import contentfulService from "@/lib/contentfulClient";

// ✅ Explicitly type params as Promise<{ slug: string }>
export default async function KategorijaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const fetchedKategorija =
    await contentfulService.getArtikalsByCategorySlug(slug);

    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log(fetchedKategorija);

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
                {artikal.volumen ? <span>{artikal.volumen} l</span> : <span></span>}
                <span className={style.cijenaProizvoda}>
                  {artikal.cijena.toFixed(2)} €
                </span>
              </div>
            </div>
          ))}
          <div className={`${style.cjenikProizvod} ${style.cjenikUpozorenje}`}>
            Zabranjeno je točenje i prodaja alkoholnih pića osobama mlađim od 18 godina.
          </div>
        </div>
      </div>
    </div>
  );
}
