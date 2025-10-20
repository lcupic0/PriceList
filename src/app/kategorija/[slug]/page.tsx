import style from "./kategorija.module.css"
import { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import contentfulService from "@/lib/contentfulClient";
import { KategorijaItem, ParsiraniArtikal } from "@/lib/contentfulClient";

interface Params{
  slug: string;
}

export interface KategorijaPageParams{
  params: Params;
}

export default async function KategorijaPage({params}: KategorijaPageParams){

  const resolvedParams = await params;
  const fetchedKategorija = await contentfulService.getArtikalsByCategorySlug(resolvedParams.slug);
  console.log(fetchedKategorija);

  return (
    <div className={`${style.wrapper} ${style.container}`}>
      
        <div className={style.background}></div>

        <div className={style.cjenik}>
            <div className={style.cjenikHeader}>
                <div className={style.nazivKategorije}>{fetchedKategorija?.naziv}</div>
                <div className={style.nazivKategorije}>{fetchedKategorija?.nazivEngleski}</div>
            </div>
            
            <div className={style.cjenikProizvodi}>
              {fetchedKategorija?.artikli.map(artikal => (
              <div className={style.cjenikProizvod} key={artikal.naziv}>
                    <div className={style.nazivProizvoda}>
                        <div>{artikal.naziv}</div>
                        <div>{artikal.nazivEngleski}</div>
                    </div>
                    <div className={style.cijenaVolumen}>
                      {artikal.volumen ? <span>{artikal.volumen}l</span> : <span></span>}
                      <span className={style.cijenaProizvoda}>{artikal.cijena.toFixed(2)} €</span>
                    </div>
                </div>
              ))}
            </div>
        </div>

    </div>
  )
}