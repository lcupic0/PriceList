import style from "./kategorija.module.css";
import contentfulService from "@/lib/contentfulClient";

export default async function KategorijaPage({
  params,
}: {
  params: { slug: string };
}) {
  // ✅ Works in Next.js 15 and satisfies TypeScript
  const { slug } = await Promise.resolve(params);

  const fetchedKategorija =
    await contentfulService.getArtikalsByCategorySlug(slug);

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
