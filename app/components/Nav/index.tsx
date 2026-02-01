"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
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
    const list = useMemo(() => forecast?.list ?? [], [forecast]);

    useEffect(() => {
        if (list.length > 0 && (!pathname || pathname === "/")) {
            router.push(`/${list[0].dt}`);
        }
    }, [list, pathname, router]);

    if (!forecast) {
        return (
            <nav className={styles.nav}>
                <div className={styles.emptyState}>
                    <p className={styles.emptyTitle}>Search for a city to get started.</p>
                    <p className={styles.emptySubtitle}>Your 5-day forecast will appear here.</p>
                </div>
            </nav>
        );
    }

    return (
        <nav className={styles.nav}>
            {list.map((item: any) => (
                <Link
                    className={`${styles.link} ${pathname === `/${item.dt}` ? styles.active : ""}`}
                    href={`/${item.dt}`}
                    key={item.dt}
                >
                    <p className={styles.linkTitle}>{weekday[new Date(item.dt * 1000).getUTCDay()]}</p>
                    <p className={styles.linkInfo}>
                        {Math.round(item.temp.min)}&deg; / {Math.round(item.temp.max)}&deg;
                    </p>
                    <div className={styles.iconWrap}>
                        <img
                            src={`https://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                            alt={item.weather[0].description ?? "Forecast icon"}
                        />
                    </div>
                </Link>

            ))}
        </nav>
    );
};

export default Nav;
