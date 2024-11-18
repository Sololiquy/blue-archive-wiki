import React from "react";

import styles from "@/styles/home/home.module.css";

const Home = () => {
    return (
        <>
            <div className={styles.background}></div>
            <div className={styles.container}>
                <img className={styles.arona} src="/blue-archive-wiki/Arona_pyrox.png" alt="" />
                <div className={styles.text}>Arona</div>
            </div>
        </>
    );
};

export default Home;
