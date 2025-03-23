"use client";

import { notFound, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import { useApi } from '@/app/api/api';
import { EmployeeCard } from "@/app/Components/EmployeeCard";

export default function EmployeePage() {
    const params = useParams();
    const id = params.id as string;
    const [employee, setEmployee] = useState<Partial<Employee>>({});

    useEffect(() => {
        const fetchEmployee = async () => {
          try {
            const response = await fetch(`http://localhost:4000/api/employees/${id}`);
            const data = await response.json();
            setEmployee(data);
          } catch (error) {
            console.error('Error fetching employees:', error);
          }
        };
    
        fetchEmployee();
      }, []);

  return (
    <div className="wrapper">
        <div className="header-container">
            <h1>Employee Info</h1>
          </div>
          <div className="content-container">
            <EmployeeCard _id={employee._id} name={employee.name} surname={employee.surname} phone={employee.phone} role={employee.role} company={employee.company} email={employee.email} address={employee.address}/>
          </div>
    </div>
  );
}