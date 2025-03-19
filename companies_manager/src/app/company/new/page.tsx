"use client";

import CompanyForm from "@/app/Components/CompanyForm";
import styles from './styles.module.css';
import { useState } from "react";
import { join } from "path";

const companies_api_url = "http://localhost:3000/api/companies";
const addresses_api_url = "http://localhost:3000/api/addresses";

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
    
        await fetch(companies_api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(company),
        });

        await fetch(addresses_api_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(address),
        });
    }
  }

  function handleClear(setName: any, setEmail: any, setPhone: any, setStreet: any, setCountry: any, setPostalCode: any, setCountryCode: any, setCity: any) {
    setName("");
    setEmail("");
    setPhone("");
    setStreet("");
    setCountry("");
    setPostalCode("");
    setCountryCode("");
    setCity("");
}

export default function createCompany() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [city, setCity] = useState("");

  return (
    <div className="wrapper">
      <div className="header-container">
        <h1>Add Company</h1>
        </div>
        <div className="content-container">
              <CompanyForm name={name} setName={setName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} street={street} setStreet={setStreet} city={city} setCity={setCity} country={country} setCountry={setCountry} countryCode={countryCode} setCountryCode={setCountryCode} postalCode={postalCode} setPostalCode = {setPostalCode}></CompanyForm> 
              <div className="buttons-wrapper"> 
                  <button type="submit" className="form-button" id="saveButton" onClick={(e) => handleSubmit(e, { name, email, phone ,street, country, postalCode, countryCode, city})}>Add Company</button>
                    <button className="form-button" id="clearButton" onClick={() => handleClear(setName, setEmail, setPhone, setStreet, setCountry, setPostalCode, setCountryCode, setCity)}>Clear</button>
                </div>
        </div>
    </div>
  );
}
