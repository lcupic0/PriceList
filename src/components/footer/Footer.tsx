"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSignalMessenger} from "@fortawesome/free-brands-svg-icons"
import {faInstagram} from "@fortawesome/free-brands-svg-icons"
import footer from "./footer.module.css"; 
import { Page } from "@/config";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer: React.FC = () => {

  const pathName = usePathname();

  return (
    <div className={footer.wrapper}>
        {/* <p className={footer.quote}>Vrhunska kava uz brzu uslugu i povoljne cijene!</p> */}
        <div className={footer.info}>
          <h2 className={footer.title}>CAFFE BAR KOROLAR</h2>
          <a href="https://maps.app.goo.gl/vFxUqYEeDypjr9kJ7" target="_blank" rel="noopener noreferrer" style={{textDecoration: "none"}}>
            <span className={footer.adresa}>Ul. Ruđera Boškovića 37, 21000, Split</span>
          </a>
          <span className={footer.potpis}>&copy; 2025. Hrvojeva staza d.o.o.</span>
          <span className={footer.potpis}>Bardojevska ulica 26, 21215 Kaštel Lukšić</span>
          <span className={footer.potpis}>OIB: 08624168661</span>
          <div className={footer["drustvene-mreze"]}>
            <Link href="https://www.instagram.com/caffebar_korolar/" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className={footer.icon}/>
            </Link>
            <Link href="/kontakt" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faSignalMessenger} className={footer.icon} />
            </Link>
          </div>
        </div>
    </div>
  )
}

export default Footer;