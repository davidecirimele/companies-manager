"use client";

"use client";

import { useApi } from '@/app/api/api';
import AddressForm from '@/app/Components/AddressForm';
import EmployeeForm from '@/app/Components/EmployeeForm';
import { useState, useEffect } from "react";

async function handleSubmit(event: React.FormEvent, form_data: Object) {
    event.preventDefault();
    let isFormValid = true;

    const arrayObject = Object.values(form_data);

    arrayObject.forEach(element => {
        console.log(element);
        if (element == "") {
            isFormValid = false;
        }
    });

    if (isFormValid) {

        const [name, surname, email, phone, company, role, street, country, postalCode, countryCode, city] = arrayObject;
        const text = street + "," + postalCode + " " + city + "," + country;

        const address: Address = {
            street: street,
            postalCode: postalCode,
            country: country,
            countryCode: countryCode,
            city: city,
            text: text
        };

        const employee: Employee = {
            name: name,
            surname: surname,
            email: email,
            phone: phone,
            company: company,
            role: role,
            address: address
        }

        const response = await fetch('http://localhost:4000/api/employees/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });

        console.log(response);
    }
  }

function handleClear( setForm1:any, setForm2:any) {
    setForm1({
        name : "",
        surname: "",
        email: "",
        phone: "",
        company_id: "",
        role: ""
    });

    setForm2({
        street: "",
        country: "",
        postalCode: "",
        countryCode: "",
        city: ""
    })
    }

export default function createEmployee() {
    const [employeeform, setEmployeeForm] = useState({
        name : "",
        surname: "",
        email: "",
        phone: "",
        company_id: "",
        role: ""
    });

    const [addressform, setAddressForm] = useState({
        street: "",
        country: "",
        postalCode: "",
        countryCode: "",
        city: ""
    });
    
  return (
    <div className="wrapper">
      <div className="header-container">
        <h1>Add Employee</h1>
        </div>
        <div className="content-container">
            <EmployeeForm form={employeeform} setForm={setEmployeeForm}></EmployeeForm>
              <AddressForm form={addressform} setForm={ setAddressForm}></AddressForm>
              <div className="buttons-wrapper"> 
                  <button type="submit" className="form-button" id="saveButton" onClick={(e) => handleSubmit(e, { ...employeeform, ...addressform })}>Add Employee</button>
                    <button className="form-button" id="clearButton" onClick={() => handleClear(setEmployeeForm, setAddressForm)}>Clear</button>
              </div>
        </div>
    </div>
  );
}
