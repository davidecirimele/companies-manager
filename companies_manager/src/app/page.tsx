"use client";

import { useState, useEffect } from "react";
import { CompanyCard } from "./Components/CompanyCard";
import { useApi } from '@/app/api/api';

export default function Home() {
  const { getAllCompanies, companies } = useApi();

  useEffect(() => {
    getAllCompanies();
  }, [companies]);

  return (
    <div className="wrapper">
      <div className="header-container">
        <h1>Companies</h1>
      </div>
      <div className="content-container">
        <ul className="companies-list">
            {companies.map((company: Company) => (
              <li key={company.id}><CompanyCard id={company.id} name={company.name} phone={company.phone} email={company.email} address={company.address}/></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
