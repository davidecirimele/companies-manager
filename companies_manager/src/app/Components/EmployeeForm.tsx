"use client";

import { useEffect, useState } from 'react';
import styles from './styles.module.css';

export function CompanySelector({ form, companies, setForm }: any) {
    useEffect(() => {
        if (companies.length > 0 && form.company_id==="") {
            console.log(companies[0]._id);
            setForm((prev: any) => ({ ...prev, company_id: companies[0]._id }));
        }
    }, [companies]);

    
    
    return (
        <select className={styles["selector"]} name="selectedCompany" value={form.company_id} onChange={(e) => setForm((prev: any) => ({ ...prev, company_id: e.target.value }))}>
            { 
                companies.map((company: { _id: string, name: string }) => (
                    <option className={styles["selector-option"]} key={company._id} value={company._id}>
                        {company.name}
                    </option>
                ))
            }
        </select>
    );
}

export default function EmployeeForm({ form, setForm }: any) {
    
    const [companies, setCompanies] = useState<string[]>([]);
    
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch(`http://localhost:4000/api/companies/all-companies`);
                const data = await response.json();
                console.log(data);
                setCompanies(data.map((company: { _id: string, name: string }) => {
                    return { _id: company._id, name: company.name };
                }));
            } catch (error) {
                console.error('Error fetching company:', error);
            }
        };
            
        fetchCompanies();
        }, []);

    return (
        <div className={styles["form-container"]}>
            <form className={styles["form"]}>
                <label className={styles["form-label"]}>Name</label>
                <input id="name" type="text" className={styles["form-control"]} value={form.name || ""} onChange={(e) => setForm((prev: any) => ({ ...prev, name:e.target.value}))}></input>
                <label className={styles["form-label"]}>Surname</label>
                <input id="surname" type="text" className={styles["form-control"]} value={form.surname || ""} onChange={(e) => setForm((prev: any) => ({ ...prev, surname:e.target.value}))}></input>
                <label className={styles["form-label"]}>Email</label>
                <input id = "email" type="text" className={styles["form-control"]} value={form.email || ""} onChange={(e) => setForm((prev: any) => ({ ...prev, email:e.target.value}))}></input>
                <label className={styles["form-label"]}>Phone</label>
                <input id = "phone" type="text" className={styles["form-control"]} value={form.phone || ""} onChange={(e) => setForm((prev: any) => ({ ...prev, phone:e.target.value}))}></input>
                <label className={styles["form-label"]}>Role</label>
                <input id="address" type="text" className={styles["form-control"]} value={form.role || ""} onChange={(e) => setForm((prev: any) => ({ ...prev, role:e.target.value}))}></input> 
                <label className={styles["form-label"]}>Company ID</label>
                <CompanySelector className={styles["form-control"]} form={ form } companies={companies} setForm={setForm}></CompanySelector> 
            </form>
        </div>
    );
  }
  