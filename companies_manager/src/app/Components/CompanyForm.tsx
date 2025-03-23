"use client";

import styles from './styles.module.css';

export default function CompanyForm({ form, setForm } : any) {
    

    return (
        <div className={styles["form-container"]}>
            <form className={styles["form"]}>
                <label className={styles["form-label"]}>Company Name</label>
                <input id="name" type="text" className={styles["form-control"]} value={form.name || ""} onChange={(e) => setForm((prev: any) => ({ ...prev, name:e.target.value}))}></input>
                <label className={styles["form-label"]}>Email</label>
                <input id = "email" type="text" className={styles["form-control"]} value={form.email || ""} onChange={(e) => setForm((prev: any) => ({ ...prev, email:e.target.value}))}></input>
                <label className={styles["form-label"]}>Phone</label>
                <input id = "phone" type="text" className={styles["form-control"]} value={form.phone || ""} onChange={(e) => setForm((prev: any) => ({ ...prev, phone:e.target.value}))}></input>
            </form> 
        </div>
    );
  }
  