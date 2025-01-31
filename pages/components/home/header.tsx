import React from "react";
import Link from "next/link";
import styles from "@/styles/home/header.module.css";

const Header = () => {
    return (
        <>
            <div className={styles.headerContainer}>
                <div className={styles.logo}>
                    <img className={styles.logoIMG} src="/blue-archive-wiki/Blue_Archive_EN_logo.svg" alt="" />
                </div>
                <div className={styles.Home}>
                    <Link href="/">Home</Link>
                </div>
                <div className={styles.studentList}>
                    <Link href="/layout/studentList">Student</Link>
                </div>
                {/* <div className={styles.enemyList}>
                    <Link href="/layout/enemyDetail">Enemy</Link>
                </div> */}
            </div>
        </>
    );
};

export default Header;
