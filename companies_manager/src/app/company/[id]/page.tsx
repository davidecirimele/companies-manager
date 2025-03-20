"use client";

import { CompanyCard } from "@/app/Components/CompanyCard";
import { notFound, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import { useApi } from '@/app/api/api';
import { EmployeeCard } from "@/app/Components/EmployeeCard";

export default function CompanyPage() {
    const { getCompany, getCompanyEmployees } = useApi();
    const params = useParams();
    const id = params.id as string;
    const [company, setCompany] = useState<Company>({});
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        const selectedCompany = getCompany(id);
        setEmployees(getCompanyEmployees(id));
        if(selectedCompany)
            setCompany(selectedCompany);
      }, [company]);

  if (!company) {
    notFound();
  }

  return (
    <div className="wrapper">
        <div className="header-container">
            <h1>Company Info</h1>
          </div>
          <div className="content-container">
            <CompanyCard id={company.id} name={company.name} phone={company.phone} email={company.email} address={company.address}/>
            <ul className="employees-list">
                {employees.map((employee: Employee) => (
                    <li key={employee.id}><EmployeeCard id={employee.id} name={employee.name} surname={employee.surname} phone={employee.phone} role={employee.role} company={employee.company} email={employee.email} address={employee.address}/></li>
            ))}
            </ul>
          </div>
    </div>
  );
}