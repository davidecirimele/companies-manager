import { CompanyCard } from "./Components/CompanyCard";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/companies");
  const companies = await response.json();

  return (
    <div className="wrapper">
      <div className="header-container">
        <h1>Companies List</h1>
      </div>
      <div className="content-container">
        <ul className="companies-list">
            {companies.map((company: Company) => (
              <li key={company.id}><CompanyCard id={company.id} name={company.name} phone={company.phone} address={company.address}/></li>
          ))}
        </ul>
      </div>
    </div>
  );
}
