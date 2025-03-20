"use client";

import styles from './styles.module.css';

export default function EmployeeForm({ name, setName, surname, setSurname, email, setEmail, phone, setPhone, company_id, setCompany, role, setRole} : any) {

    return (
        <div className={styles["form-container"]}>
            <form className={styles["form"]}>
                <label className={styles["form-label"]}>Name</label>
                <input id="name" type="text" className={styles["form-control"]} value={name} onChange={(e) => setName(e.target.value)}></input>
                <label className={styles["form-label"]}>Surname</label>
                <input id="surname" type="text" className={styles["form-control"]} value={surname} onChange={(e) => setSurname(e.target.value)}></input>
                <label className={styles["form-label"]}>Email</label>
                <input id = "email" type="text" className={styles["form-control"]} value={email} onChange={(e) => setEmail(e.target.value)}></input>
                <label className={styles["form-label"]}>Phone</label>
                <input id = "phone" type="text" className={styles["form-control"]} value={phone} onChange={(e) => setPhone(e.target.value)}></input>
                <label className={styles["form-label"]}>Role</label>
                <input id="address" type="text" className={styles["form-control"]} value={role} onChange={(e) => setRole(e.target.value)}></input> 
                <label className={styles["form-label"]}>Company ID</label>
                <input id="address" type="text" className={styles["form-control"]} value={company_id} onChange={(e) => setCompany(e.target.value)}></input> 
            </form>
        </div>
    );
  }
  