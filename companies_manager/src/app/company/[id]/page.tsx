
export default async function showCompany() {
    const response = await fetch("http://localhost:3000/api/companies");
    const companies = await response.json();
  
    return (
      <div className="wrapper">
        <div className="header-container">
          <h1>Company Info</h1>
        </div>
      </div>
    );
  }
  