
export default async function editCompany() {
    const response = await fetch("http://localhost:3000/api/companies");
    const companies = await response.json();
  
    return (
      <div className="wrapper">
        <div className="header-container">
          <h1>Add Company</h1>
        </div>
      </div>
    );
  }
  