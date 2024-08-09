"use client";

import { useAppSelector } from "@/lib/hooks";
import Current from "../components/Current";
import Hourly from "../components/Hourly";
import { selectForecast, selectWeather } from "@/lib/features/search/searchSlice";
import { useEffect, useState } from "react";

export default function Content({
  params: { slug },
}: {
  params: { slug: string };
}) {

  const forecast = useAppSelector(selectForecast);
  const weather = useAppSelector(selectWeather);
  const [current, setCurrent] = useState<any>(null);

  useEffect(() => {
    const numberSlug = Number(slug);
    const current = forecast?.list?.find(({ dt }: any) => dt === numberSlug);

    if (current) {
      setCurrent(current)
    }

  }, [weather])

  if (!current) {
    return;
  }

  return (
    <div>
      <Current current={current} weather={weather} />
      <Hourly weather={weather} slug={slug} />
    </div>
  );
}
