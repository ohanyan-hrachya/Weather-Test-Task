"use client";

import { useEffect } from "react";
import { useRouter } from 'next/navigation'
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "@/app/styles/layout.module.css";
import { useAppSelector } from "@/lib/hooks";
import { selectForecast } from "@/lib/features/search/searchSlice";

let weekday = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

const Nav = () => {
    const router = useRouter();
    const pathname = usePathname();
    const forecast = useAppSelector(selectForecast);

    useEffect(() => {
        if (forecast) {
            router.push(`/${forecast?.list?.[0].dt}`);
        }
    }, [forecast])

    if (!forecast) {
        return;
    }

    return (
        <nav className={styles.nav}>
            {forecast?.list?.map((item: any) => (
                <Link
                    className={`${styles.link} ${pathname === `/${item.dt}` ? styles.active : ""}`}
                    href={`/${item.dt}`}
                    key={item.dt}
                >
                    <p className={styles.linkTitle}>{weekday[new Date(item.dt * 1000).getUTCDay()]}</p>
                    <p className={styles.linkInfo}>{Math.round(item.temp.day)}&deg;</p>
                    <div>
                        <img
                            src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                        />
                    </div>
                </Link>

            ))}
        </nav>
    );
};

export default Nav;
