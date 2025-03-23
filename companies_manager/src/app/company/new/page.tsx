"use client";

import { useApi } from '@/app/api/api';
import AddressForm from '@/app/Components/AddressForm';
import CompanyForm from "@/app/Components/CompanyForm";
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

        const [name, email, phone, street, country, postalCode, countryCode, city] = arrayObject;
        const text = street + "," + postalCode + " " + city + "," + country;

        const address: Address = {
            street: street,
            postalCode: postalCode,
            country: country,
            countryCode: countryCode,
            city: city,
            text: text
        };

        const company: Company = {
            name: name,
            email: email,
            phone: phone,
            address: address
        }

        const response = await fetch('http://localhost:4000/api/companies/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(company)
        });

        console.log(response);
    }
  }

  function handleClear(setForm1:any, setForm2:any) {
    setForm1({
        name : "",
        email: "",
        phone: ""
    });

    setForm2({
        street: "",
        country: "",
        postalCode: "",
        countryCode: "",
        city: ""
    })
}

export default function createCompany() {

    const [companyform, setCompanyForm] = useState({
        name : "",
        email: "",
        phone: ""
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
        <h1>Add Company</h1>
        </div>
        <div className="content-container">
              <CompanyForm form={companyform} setForm={setCompanyForm}></CompanyForm>
                <AddressForm form={addressform} setForm={ setAddressForm}></AddressForm>
              <div className="buttons-wrapper"> 
                  <button type="submit" className="form-button" id="saveButton" onClick={(e) => handleSubmit(e, { ...companyform, ...addressform })}>Add Company</button>
                    <button className="form-button" id="clearButton" onClick={() => handleClear(setCompanyForm, setAddressForm)}>Clear</button>
              </div>
        </div>
    </div>
  );
}
