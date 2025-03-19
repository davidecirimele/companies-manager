
export default async function editCompany({id}:string) {
    const response = await fetch("http://localhost:3000/api/companies");
    const companies = await response.json();
  
    return (
      <div className="wrapper">
        <div className="header-container">
            <h1>Edit Company with id: {id} </h1>
        </div>
      </div>
    );
  }
  