"use client";

import { FormEvent, useRef } from "react";

import { search } from "@/lib/features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import styles from "@/app/styles/layout.module.css";
import { selectError, selectStatus } from "@/lib/features/search/searchSlice";

const Header = () => {
    const dispatch = useAppDispatch();
    const searchInputRef = useRef<HTMLInputElement>(null);
    const status = useAppSelector(selectStatus);
    const error = useAppSelector(selectError);

    const onSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const value = searchInputRef.current?.value ?? "";
        dispatch(search(value.trim()));
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div>
                    <p className={styles.kicker}>Forecast</p>
                    <h1 className={styles.title}>Find your local weather</h1>
                    <p className={styles.subtitle}>
                        Search a city to see the 5-day outlook and current conditions.
                    </p>
                </div>
                <form onSubmit={onSearch} className={styles.searchForm} aria-label="Search city weather">
                    <label className={styles.srOnly} htmlFor="city-search">
                        City name
                    </label>
                    <input
                        id="city-search"
                        ref={searchInputRef}
                        placeholder="Try London, Tokyo, or Lagos"
                        className={styles.searchInput}
                        required
                    />
                    <button className={styles.searchButton} disabled={status === "loading"}>
                        {status === "loading" ? "Searching..." : "Search"}
                    </button>
                </form>
                {error ? <p className={styles.error}>{error}</p> : null}
            </div>
        </header>
    )
}

export default Header;
