"use client";

import { useRouter,notFound, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useApi } from "@/app/api/api"
import AddressForm  from "@/app/Components/AddressForm";
import CompanyForm from "@/app/Components/CompanyForm";

async function handleSubmit(event: React.FormEvent, form_data: Object, param_id: string, router: any) {
    event.preventDefault();
    let isFormValid = true;

    const arrayObject = Object.values(form_data);

    arrayObject.forEach(element => {
        if (element == "") {
            isFormValid = false;
        }
    });

    console.log("ARRAY: "+arrayObject);

    if (isFormValid) {

        const [name, email, phone, _id, street, country, postalCode, countryCode, city] = arrayObject;
        const text = street + "," + postalCode + " " + city + "," + country;

        const address: Address = {
            _id: _id, 
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

        console.log(address);

        const response = await fetch(`http://localhost:4000/api/companies/edit/${param_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ company: company, address: address })
        });

        console.log(response);
        router.push("/");
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

export default function editCompany() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    
    const [companyform, setCompanyForm] = useState({
        name : "",
        email: "",
        phone: ""
    });

    const [addressform, setAddressForm] = useState({
        _id: "",
        street: "",
        country: "",
        postalCode: "",
        countryCode: "",
        city: ""
    });

    useEffect(() => {
        if (id) {
            const fetchCompany = async () => {
                try {
                    const response1 = await fetch(`http://localhost:4000/api/companies/${id}`);
                
                    const company_data = await response1.json();

                    console.log(company_data);
                
                    const response2 = await fetch(`http://localhost:4000/api/addresses/${company_data.address}`);
                            
                    const address_data = await response2.json();

                    console.log(address_data);
                
                    

                    if (company_data) {

                        setCompanyForm({
                            name: company_data.name || "",
                            email: company_data.email || "",
                            phone: company_data.phone || ""
                        });
            

                        setAddressForm({
                            _id: address_data._id,
                            street: address_data.street || "",
                            country: address_data.country || "",
                            postalCode: address_data.postalCode || "",
                            countryCode: address_data.countryCode || "",
                            city: address_data.city || ""
                        });
                    }
                    
                } catch (error) {
                    console.error('Error fetching company:', error);
                }
            };
            
            fetchCompany();
        }
    }, [id]);
    
  return (
    <div className="wrapper">
        <div className="header-container">
            <h1>Edit Company</h1>
        </div>
        <div className="content-container">
            <CompanyForm form={companyform} setForm={setCompanyForm}></CompanyForm>
            <AddressForm form={addressform} setForm={ setAddressForm}></AddressForm>   
              <div className="buttons-wrapper"> 
                  <button type="submit" className="form-button" id="saveButton" onClick={(e) => handleSubmit(e, { ...companyform, ...addressform }, id, router)}>Edit Company</button>
                    <button className="form-button" id="clearButton" onClick={() => handleClear(setCompanyForm, setAddressForm)}>Clear</button>
              </div>
        </div>
    </div>
  );
}
  