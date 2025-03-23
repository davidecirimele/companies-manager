'use client';

import { useRouter, usePathname } from 'next/navigation';
import styles from './styles.module.css';
import { types } from 'util';
import { useApi } from '../api/api';

function ConditionalButton({ handleViewClick, id }: { handleViewClick: (id: string) => void; id: string }) {
    const pathname = usePathname();

    const url = "/employee/" + id;

    if (pathname === url) return null;

    return (
        <button className={styles["control-button"]} type="button" onClick={() => handleViewClick(id)}>
            View Employee
        </button>
    );
}

export function EmployeeCard({ _id, name, surname, phone, role, company, address, email }: Partial<Employee>) {
    const router = useRouter();

    const { deleteEmployee } = useApi();
    
    const handleEditClick = (id?: string) => {
        const url = `/employee/${id}/edit`;
        router.push(url);
    };

    const handleViewClick = (id?: string) => {
        const url = `/employee/${id}`;
        router.push(url);
    };

    const handleDeleteClick = async (id?: string) => {
        if (id) {

            const response = await fetch(`http://localhost:4000/api/employees/delete/${id}`, {
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
            <h2 className={styles['card-heading']}>{surname}, {name}</h2>
            <div className={styles['card-info-street']}>
                <p className={styles['card-info']}>{address?.street}</p>
                <h4 className={styles['card-info']}>{address?.city}</h4>
                <p className={styles['card-info']}>country: {address?.country}</p>
                <p className={styles['card-info']}>CAP: {address?.postalCode}</p>
            </div>
            <p className={styles['card-info']}>phone: {phone}</p>
            <p className={styles['card-info']}>email: {email}</p>
            <p className={styles['card-info']}>company id: {company}</p>
            <div className={styles['buttons-container']}>
                <ConditionalButton handleViewClick={handleViewClick} id={_id!}></ConditionalButton>
                <button className={styles['control-button']} type='button' onClick={() => handleEditClick(_id)}>Edit Employee</button>
                <button className={styles['control-button']} type='button' onClick={() => handleDeleteClick(_id)}>Delete Employee</button>
            </div>
        </div>
    );
  }
  