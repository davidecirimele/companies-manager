'use client';

import { useRouter, usePathname } from 'next/navigation';
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

function ConditionalInfo({ address }: { address: Address | undefined }) {
    const pathname = usePathname();

    if (address === undefined) return null;

    return (
        <div className={styles['card-info-street']}>
            <p className={styles['card-info']}>{address?.street}</p>
            <h4 className={styles['card-info']}>{address?.city}</h4>
            <p className={styles['card-info']}>country: {address?.country}</p>
            <p className={styles['card-info']}>CAP: {address?.postalCode}</p>
        </div>
    );
}

export function CompanyCard({ _id, name, phone, address, email }: Company) {

    const router = useRouter()

    const { deleteCompany } = useApi();

    const handleEditClick = (id?: string) => {
        const url = `/company/${id}/edit`;
        router.push(url);
    };

    const handleViewClick = (id?: string) => {
        const url = `/company/${id}`;
        router.push(url);
    };

    const handleDeleteClick = async (id?: string) => {
        if (id) {

            const response = await fetch(`http://localhost:4000/api/companies/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });

            const data = response.json()
            
            console.log(data);
            router.push('/');
        }
    };

    return (
        <div className={styles['card-container']}>
            <h3 className={styles['card-heading']}>id: {_id}</h3>
            <h2 className={styles['card-heading']}>{name}</h2>
            <ConditionalInfo address={address}></ConditionalInfo>
            <p className={styles['card-info']}>phone: {phone}</p>
            <p className={styles['card-info']}>email: {email}</p>
            <div className={styles['buttons-container']}>
                <ConditionalButton handleViewClick={handleViewClick} id={_id!}></ConditionalButton>
                <button className={styles['control-button']} type='button' onClick={() => handleEditClick(_id)}>Edit Company</button>
                <button className={styles['control-button']} type='button' onClick={() => handleDeleteClick(_id)}>Delete Company</button>
            </div>
        </div>
    );
  }
  