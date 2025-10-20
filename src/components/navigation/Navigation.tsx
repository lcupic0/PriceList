"use client"
import { useState, useEffect } from "react";
import React from "react";
import navigation from "./navigation.module.css"
import Link from "next/link"
import { usePathname } from "next/navigation";
import {Page} from "@/config";
import contentfulService from "@/lib/contentfulClient";
import { KategorijaItem } from "@/lib/contentfulClient";
import Image from "next/image";


const Navigation: React.FC = () => {

  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [kategorije, setKategorije] = useState<KategorijaItem[]>([]);
  const pathname = usePathname();
  const splitedPathname = `${pathname.split("/")[2]}`;

  useEffect(() => {
    console.log(splitedPathname);
  }, [splitedPathname]);

    useEffect(() => {
      const fetchData = async () => {
  
          const fetchedKategorije = await contentfulService.getAllKategorijas();
  
          setKategorije(fetchedKategorije);
      };
  
      fetchData();
    }, []);

  return (
    <div className={navigation.wrap}>
      <div className={navigation.wrapper}>
        <Link href="/" style={{textDecoration: 'none'}}>
          <div className={navigation.logo}>Caffe Bar Korolar</div>
        </Link>
        <nav className={`${navigation["primary"]} ${isNavExpanded ? navigation["data-visible"] : ""}`}>
          <ul className={navigation.list}>
                {kategorije.map(({naziv, slug}) => (
                    <li className={`${navigation.listitem}`} key={slug}>
                      <Link href={`/kategorija/${slug}`} className={`${navigation.link} ${splitedPathname === slug ? navigation.active : ''}`} onClick={() => setIsNavExpanded(!isNavExpanded)}>
                        {naziv}
                      </Link>
                    </li>
                ))}
          </ul>
        </nav>

        <div className={navigation["mobile-nav-icons"]}>
          <div className={`${navigation["mobile-toggle"]} ${isNavExpanded ? `${navigation.change}` : ""}`} onClick={() => {setIsNavExpanded(!isNavExpanded);}}>
            <div className={navigation.bar1}></div>
            <div className={navigation.bar2}></div>
            <div className={navigation.bar3}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navigation