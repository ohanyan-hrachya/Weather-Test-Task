"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import { search } from "@/lib/features/search/searchSlice";
import { useAppDispatch } from "@/lib/hooks";

import styles from "@/app/styles/layout.module.css";

const Header = () => {
    const dispatch = useAppDispatch();
    const searchInputRef = useRef<HTMLInputElement>(null);

    const onSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(search(searchInputRef.current?.value ?? ""))
    };

    return (
        <header className={styles.header}>
            <form onSubmit={onSearch}>
                <input ref={searchInputRef} />
                <button>Search</button>
            </form>
        </header>
    )
}

export default Header;
