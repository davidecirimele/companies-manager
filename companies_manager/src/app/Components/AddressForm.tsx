

"use client";

import styles from './styles.module.css';

export default function EmployeeForm({ street, setStreet, city, setCity, country, setCountry, countryCode, setCountryCode, postalCode, setPostalCode} : any) {

    return (
        <div className={styles["form-container"]}>
            <h1>Address Info</h1>
            <form className={styles["form"]}>
                <label className={styles["form-label"]}>Address Street</label>
                <input id="address" type="text" className={styles["form-control"]} value={street} onChange={(e) => setStreet(e.target.value)}></input> 
                <label className={styles["form-label"]}>Address City</label>
                <input id="address" type="text" className={styles["form-control"]} value={city} onChange={(e) => setCity(e.target.value)}></input> 
                <label className={styles["form-label"]}>Address Country</label>
                <input id="address" type="text" className={styles["form-control"]} value={country} onChange={(e) => setCountry(e.target.value)}></input> 
                <label className={styles["form-label"]}>Address Country Code</label>
                <input id="address" type="text" className={styles["form-control"]} value={countryCode} onChange={(e) => setCountryCode(e.target.value)}></input> 
                <label className={styles["form-label"]}>Address Postal Code</label>
                <input id="address" type="text" className={styles["form-control"]} value={postalCode} onChange={(e) => setPostalCode(e.target.value)}></input> 
            </form> 
        </div>
    );
  }
  