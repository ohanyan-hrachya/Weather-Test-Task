"use client";

import styles from "@/app/styles/layout.module.css";

const Hourly = ({ weather, current }: { weather: any; current: any }) => {
    if (!weather || !current) {
        return null;
    }

    return (
        <section className={styles.detailsCard}>
            <h3 className={styles.detailsTitle}>Details</h3>
            <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                    <span>Humidity</span>
                    <strong>{weather.main.humidity}%</strong>
                </div>
                <div className={styles.detailItem}>
                    <span>Wind</span>
                    <strong>{Math.round(weather.wind.speed)} m/s</strong>
                </div>
                <div className={styles.detailItem}>
                    <span>Pressure</span>
                    <strong>{weather.main.pressure} hPa</strong>
                </div>
                <div className={styles.detailItem}>
                    <span>Feels like</span>
                    <strong>{Math.round(weather.main.feels_like)}&deg;</strong>
                </div>
                <div className={styles.detailItem}>
                    <span>Sunrise</span>
                    <strong>
                        {new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </strong>
                </div>
                <div className={styles.detailItem}>
                    <span>Sunset</span>
                    <strong>
                        {new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </strong>
                </div>
            </div>
        </section>
    );
};

export default Hourly;
