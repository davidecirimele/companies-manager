"use client";

import { useState, useEffect } from "react";
import { CompanyCard } from "./Components/CompanyCard";

export default function Home() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/companies/all-companies');
        const data = await response.json();
        setCompanies(data);
      } catch (error) {
        console.error('Error fetching companies:', error);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="wrapper">
      <div className="header-container">
        <h1>Companies</h1>
      </div>
      <div className="content-container">
        <ul className="companies-list">
          {companies.map((company: Company) => (
            <li key={company._id}>
              <CompanyCard _id={company._id} name={company.name} phone={company.phone} email={company.email}/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}