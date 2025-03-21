'use client';

import { redirect, usePathname } from 'next/navigation';
import styles from './styles.module.css';
import { types } from 'util';
import { useApi } from '../api/api';

function ConditionalButton({ handleViewClick, id }: { handleViewClick: (id: string) => void; id: string }) {
    const pathname = usePathname();

    if (pathname !== "/") return null;

    return (
        <button className={styles["control-button"]} type="button" onClick={() => handleViewClick(id)}>
            View Company
        </button>
    );
}

export function CompanyCard({ id, name, phone, address, email }: Company) {

    const { deleteCompany } = useApi();

    const handleEditClick = (id?: string) => {
        const url = `/company/${id}/edit`;
        redirect(url);
    };

    const handleViewClick = (id?: string) => {
        const url = `/company/${id}`;
        redirect(url);
    };

    const handleDeleteClick = (id?: string) => {
        if(id)
            deleteCompany(id);
        redirect('/');
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
            <div className={styles['buttons-container']}>
                <ConditionalButton handleViewClick={handleViewClick} id={id!}></ConditionalButton>
                <button className={styles['control-button']} type='button' onClick={() => handleEditClick(id)}>Edit Company</button>
                <button className={styles['control-button']} type='button' onClick={() => handleDeleteClick(id)}>Delete Company</button>
            </div>
        </div>
    );
  }
  