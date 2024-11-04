import React from "react";
import Link from "next/link";
import styles from "@/styles/home/header.module.css";

const Header = () => {
    return (
        <>
            <div className={styles.headerContainer}>
                <div className={styles.Home}>
                    <Link href="/">Home</Link>
                </div>
                <div className={styles.studentList}>
                    <Link href="/studentList">Student List</Link>
                </div>
            </div>
        </>
    );
};

export default Header;
