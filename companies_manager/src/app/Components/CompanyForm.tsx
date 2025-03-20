"use client";

import styles from './styles.module.css';

export default function CompanyForm({ name, setName, email, setEmail, phone, setPhone} : any) {
    

    return (
        <div className={styles["form-container"]}>
            <form className={styles["form"]}>
                <label className={styles["form-label"]}>Company Name</label>
                <input id="name" type="text" className={styles["form-control"]} value={name} onChange={(e) => setName(e.target.value)}></input>
                <label className={styles["form-label"]}>Email</label>
                <input id = "email" type="text" className={styles["form-control"]} value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label className={styles["form-label"]}>Phone</label>
                <input id = "phone" type="text" className={styles["form-control"]} value={phone} onChange={(e) => setPhone(e.target.value)}></input>
            </form> 
        </div>
    );
  }
  