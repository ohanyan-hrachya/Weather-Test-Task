"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/lib/hooks";
import Current from "../components/Current";
import Hourly from "../components/Hourly";
import { selectForecast, selectStatus, selectWeather } from "@/lib/features/search/searchSlice";
import styles from "@/app/styles/layout.module.css";

export default function Content({
  params: { slug },
}: {
  params: { slug: string };
}) {

  const forecast = useAppSelector(selectForecast);
  const weather = useAppSelector(selectWeather);
  const status = useAppSelector(selectStatus);

  const current = useMemo(() => {
    const list = forecast?.list ?? [];

    if (!list.length) {
      return null;
    }

    if (!slug) {
      return list[0];
    }

    const numberSlug = Number(slug);
    return list.find(({ dt }: any) => dt === numberSlug) ?? list[0];
  }, [forecast, slug]);

  if (status === "loading") {
    return (
      <section className={styles.loadingState}>
        <p>Loading forecast…</p>
      </section>
    );
  }

  if (!current || !weather) {
    return (
      <section className={styles.loadingState}>
        <p>Search for a city to view the forecast.</p>
      </section>
    );
  }

  return (
    <div className={styles.dashboard}>
      <Current current={current} weather={weather} />
      <Hourly weather={weather} current={current} />
    </div>
  );
}
