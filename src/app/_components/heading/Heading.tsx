"use client"
import style from "./heading.module.css"
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { KategorijaItem, ParsiraniArtikal } from "@/lib/contentfulClient";
import contentfulService from "@/lib/contentfulClient";
import Link from "next/link";

export default function Heading(){

  const [kategorije, setKategorije] = useState<KategorijaItem[]>([]);

  useEffect(() => {
        console.log(kategorije);
  }, [kategorije]);

  useEffect(() => {
    const fetchData = async () => {

        const fetchedKategorije = await contentfulService.getAllKategorijas();

        setKategorije(fetchedKategorije);
    };

    fetchData();
  }, []);

  return (
    <div className={`${style.wrapper} ${style.container}`}>
      <div className={style.background}></div>
      <div className={style.proizvodi}>
        {kategorije.map((kategorija) => (
          <Link href={`/kategorija/${kategorija.slug}`} style={{textDecoration: 'none', color: 'unset'}}  key={kategorija.slug}>
            <div className={style.card}>
              <div className={style.figure} style={{ backgroundImage: `linear-gradient(
              rgba(0, 0, 0, 0.545),
              rgba(255, 255, 255, 0.097)
              ), url(${kategorija.slika.url})`}}></div>
              <div className={style.natpis}>{kategorija.naziv}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}