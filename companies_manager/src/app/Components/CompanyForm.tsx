import styles from './styles.module.css';
import { types } from 'util';

function setName(name: string) {
    
}

function setEmail(email: string) {
    
}

function setAddress(address: string) {
    
}

function setPhone(phone: string) {
    
}

export function CompanyForm({name, email, phone, address}:CompanyBase) {
    return (
        <div className={styles["form-container"]}>
            <div className={styles["form"]}>
                <label className={styles["form-label"]}>Company Name</label>
                <input id="name" type="text" className={styles["form-control"]} value={name}></input>
                <label className={styles["form-label"]}>Email</label>
                <input id = "email" type="text" className={styles["form-control"]} value={email}></input>
                <label className={styles["form-label"]}>Phone</label>
                <input id = "phone" type="text" className={styles["form-control"]} value={phone}></input>
                <label className={styles["form-label"]}>Address</label>
                <input id="address" type="text" className={styles["form-control"]} value={address}></input> 
            </div>
            <div className={styles["buttons-wrapper"]}> 
                <button className={styles["form-button"]} id="saveButton">Save</button>
                <button className={styles["form-button"]} id="clearButton">Clear</button>
            </div>
        </div>
    );
  }
  