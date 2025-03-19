'use client';

import { redirect } from 'next/navigation';
import styles from './styles.module.css';
import { types } from 'util';

export function CompanyCard({ id, name, phone, address, email }: Company) {

    const handleClick = () => {
        redirect('/company/${id}/edit');
    };

    return (
        <div className={styles['card-container']}>
            <h3 className={styles['card-heading']}>id: {id}</h3>
            <h2 className={styles['card-heading']}>{name}</h2>
            <div className={styles['card-info-street']}>
                <p className={styles['card-info']}>{address?.street}</p>
                <h4 className={styles['card-info']}>{address?.city}</h4>
                <p className={styles['card-info']}>country: {address?.country}</p>
                <p className={styles['card-info']}>CAP: {address?.postalCode}</p>
            </div>
            <p className={styles['card-info']}>phone: {phone}</p>
            <p className={styles['card-info']}>email: {email}</p>
            <button className={ styles['edit-button']}type='button' onClick={handleClick}>Edit Company</button>
        </div>
    );
  }
  