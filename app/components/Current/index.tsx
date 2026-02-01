"use client";

import styles from "@/app/styles/layout.module.css";

const Current = ({ current, weather }: { current: any; weather: any }) => {
    if (!current || !weather) {
        return null;
    }

    return (
        <section className={styles.currentCard}>
            <div className={styles.currentHeader}>
                <div>
                    <p className={styles.location}>{weather.name}</p>
                    <h2 className={styles.currentTitle}>{current.weather[0].main}</h2>
                    <p className={styles.currentSubtitle}>
                        {current.weather[0].description}
                    </p>
                </div>
                <div className={styles.currentIcon}>
                    <img
                        src={`https://openweathermap.org/img/w/${current.weather[0].icon}.png`}
                        alt={current.weather[0].description ?? "Current weather icon"}
                    />
                </div>
            </div>
            <div className={styles.currentTemp}>
                {Math.round(current.temp.day)}&deg;
            </div>
            <div className={styles.tempRange}>
                <span>Low {Math.round(current.temp.min)}&deg;</span>
                <span>High {Math.round(current.temp.max)}&deg;</span>
            </div>
        </section>
    );
};

export default Current;
