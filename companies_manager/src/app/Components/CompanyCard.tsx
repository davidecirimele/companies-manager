import styles from './styles.module.css';
import { types } from 'util';

export function CompanyCard({name, phone, address}:Company) {
    return (
        <div className={styles['card-container']}>
            <h3 className={styles['card-heading']}>{name}</h3>
            <div className={styles['card-info-street']}>
                <p className={styles['card-info']}>{address.street}</p>
                <h4 className={styles['card-info']}>{address.city}</h4>
                <p className={styles['card-info']}>{address.country}</p>
                <p className={styles['card-info']}>{address.postalCode}</p>
            </div>
            <p className={styles['card-info']}>{phone}</p>
        </div>
    );
  }
  