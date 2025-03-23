"use client";

import { CompanyCard } from "@/app/Components/CompanyCard";
import { notFound, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import { useApi } from '@/app/api/api';
import { EmployeeCard } from "@/app/Components/EmployeeCard";

export default function CompanyPage() {
    const params = useParams();
    const id = params.id as string;
    const [company, setCompany] = useState<Company>({});
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [address, setAddress] = useState<Address>();

    useEffect(() => {
            const fetchCompany = async () => {
              try {
                  const response1 = await fetch(`http://localhost:4000/api/companies/${id}`);
                  const response2 = await fetch(`http://localhost:4000/api/employees/company-employees/${id}`);
                    
                  const company_data = await response1.json();
                  const employees_data = await response2.json();

                  console.log(company_data);

                  if (company_data) {
                    const response3 = await fetch(`http://localhost:4000/api/addresses/${company_data.address}`);
                      const address_data = await response3.json();
                      setAddress(address_data);
                  }
                  setCompany(company_data);
                  setEmployees(employees_data);
                  
              } catch (error) {
                console.error('Error fetching company:', error);
              }
            };
        
            fetchCompany();
          }, []);

  return (
    <div className="wrapper">
        <div className="header-container">
            <h1>Company Info</h1>
          </div>
          <div className="content-container">
            <CompanyCard _id={company._id} name={company.name} phone={company.phone} email={company.email} address={address}/>
            <ul className="employees-list">
                {employees.map((employee: Employee) => (
                    <li key={employee._id}><EmployeeCard _id={employee._id} name={employee.name} surname={employee.surname} phone={employee.phone} role={employee.role} company={employee.company} email={employee.email} address={employee.address}/></li>
            ))}
            </ul>
          </div>
    </div>
  );
}