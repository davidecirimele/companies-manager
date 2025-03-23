"use client";

import styles from './styles.module.css';

export default function EmployeeForm({ form, setForm}: any) {

    return (
        <div className={styles["form-container"]}>
            <h1>Address Info</h1>
            <form className={styles["form"]}>
                <label className={styles["form-label"]}>Street</label>
                <input id="address" type="text" className={styles["form-control"]} value={form.street || ""} onChange={(e) => setForm((prev: any) => ({...prev, street: e.target.value}))}></input> 
                <label className={styles["form-label"]}>City</label>
                <input id="address" type="text" className={styles["form-control"]} value={form.city || ""} onChange={(e) => setForm((prev: any) => ({...prev, city: e.target.value}))}></input> 
                <label className={styles["form-label"]}>Country</label>
                <input id="address" type="text" className={styles["form-control"]} value={form.country || ""} onChange={(e) => setForm((prev: any) => ({...prev, country: e.target.value}))}></input> 
                <label className={styles["form-label"]}>Country Code</label>
                <input id="address" type="text" className={styles["form-control"]} value={form.countryCode || ""} onChange={(e) => setForm((prev: any) => ({...prev, countryCode: e.target.value}))}></input> 
                <label className={styles["form-label"]}>Postal Code</label>
                <input id="address" type="text" className={styles["form-control"]} value={form.postalCode || ""} onChange={(e) => setForm((prev: any) => ({...prev, postalCode: e.target.value}))}></input> 
            </form> 
        </div>
    );
  }
  