"use client";

import { notFound } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";
import { useApi } from '@/app/api/api';
import { EmployeeCard } from "@/app/Components/EmployeeCard";

export default function EmployeePage({ params }: { params: {id: string} }) {
    const { getEmployee } = useApi();
    const id = params.id;
    const [employee, setEmployee] = useState<Partial<Employee>>({});

    useEffect(() => {
        const selectedEmployee = getEmployee(id);
        console.log(selectedEmployee);
        if (selectedEmployee) {
            console.log("Employee found:", selectedEmployee);
            setEmployee(selectedEmployee);
        } else {
            console.log("Employee not found for id:", id);
        }
      }, [employee]);

  if (!employee) {
    notFound();
  }

  return (
    <div className="wrapper">
        <div className="header-container">
            <h1>Employee Info</h1>
          </div>
          <div className="content-container">
            <EmployeeCard id={employee.id} name={employee.name} surname={employee.surname} phone={employee.phone} role={employee.role} company={employee.company} email={employee.email} address={employee.address}/>
          </div>
    </div>
  );
}