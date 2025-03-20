"use client";

import { redirect,notFound, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useApi } from "@/app/api/api"
import AddressForm  from "@/app/Components/AddressForm";
import CompanyForm from "@/app/Components/CompanyForm";

async function handleSubmit(event: React.FormEvent, form_data: Object, editCompany: any) {
    event.preventDefault();
    let isFormValid = true;

    const arrayObject = Object.values(form_data);

    arrayObject.forEach(element => {
        if (element == "") {
            isFormValid = false;
        }
    });

    if (isFormValid) {

        const [id, name, email, phone, street, country, postalCode, countryCode, city] = arrayObject;
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

        editCompany(id, company);
        redirect("/");
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

export default function editCompany() {
    const { getCompany, editCompany } = useApi();
    const params = useParams();
    const id = params.id as string;
    const [company, setCompany] = useState<Partial<Company>>({});
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [street, setStreet] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [city, setCity] = useState("");

    useEffect(() => {
        const selectedCompany = getCompany(id);
        console.log(selectedCompany);
      if (selectedCompany) {
        setCompany(selectedCompany);
        setName(company.name!);
        setEmail(company.email!);
        setPhone(company.phone!);
            console.log("company found:", selectedCompany);
        } else {
            console.log("company not found for id:", id);
      }
      if (company?.address) {
        console.log("Address:", company.address.text);
        
        setStreet(company.address!.street);
        setCity(company.address!.city);
        setCountry(company.address!.country);
        setCountryCode(company.address!.countryCode!);
        setPostalCode(company.address!.postalCode);
      }
    }, [company]);

  if (!company) {
    notFound();
  }
    
  return (
    <div className="wrapper">
        <div className="header-container">
            <h1>Edit Company</h1>
        </div>
        <div className="content-container">
        <CompanyForm name={name} setName={setName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone}></CompanyForm>
          <AddressForm street={street} setStreet={setStreet} city={city} setCity={setCity} country={country} setCountry={setCountry} countryCode={countryCode} setCountryCode={setCountryCode} postalCode={postalCode} setPostalCode = {setPostalCode}></AddressForm>
              <div className="buttons-wrapper"> 
                  <button type="submit" className="form-button" id="saveButton" onClick={(e) => handleSubmit(e, { id, name, email, phone, street, country, postalCode, countryCode, city}, editCompany)}>Edit Company</button>
                    <button className="form-button" id="clearButton" onClick={() => handleClear(setName, setEmail, setPhone, setStreet, setCountry, setPostalCode, setCountryCode, setCity)}>Clear</button>
              </div>
        </div>
    </div>
  );
}
  