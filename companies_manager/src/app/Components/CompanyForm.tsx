"use client";

import styles from './styles.module.css';

export default function CompanyForm({ name, setName, email, setEmail, phone, setPhone, street, setStreet, city, setCity, country, setCountry, countryCode, setCountryCode, postalCode, setPostalCode} : any) {
    

    return (
        <div className={styles["form-container"]}>
            <form className={styles["form"]}>
                <label className={styles["form-label"]}>Company Name</label>
                <input id="name" type="text" className={styles["form-control"]} value={name} onChange={(e) => setName(e.target.value)}></input>
                <label className={styles["form-label"]}>Email</label>
                <input id = "email" type="text" className={styles["form-control"]} value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label className={styles["form-label"]}>Phone</label>
                <input id = "phone" type="text" className={styles["form-control"]} value={phone} onChange={(e) => setPhone(e.target.value)}></input>
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
  