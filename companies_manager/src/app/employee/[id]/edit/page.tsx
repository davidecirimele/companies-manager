"use client";

import { useRouter,notFound, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useApi } from "@/app/api/api"
import AddressForm  from "@/app/Components/AddressForm";
import EmployeeForm from "@/app/Components/EmployeeForm";

async function handleSubmit(event: React.FormEvent, form_data: Object, id: string, router: any) {
    event.preventDefault();
    let isFormValid = true;

    const arrayObject = Object.values(form_data);

    arrayObject.forEach(element => {
        if (element == "") {
            isFormValid = false;
        }
    });

    if (isFormValid) {

        const [name, surname, email, phone, company, role, _id, street, country, postalCode, countryCode, city] = arrayObject;
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

        const employee: Employee = {
            name: name,
            surname: surname,
            email: email,
            phone: phone,
            company: company,
            role: role,
            address: address
        }
      
        console.log(employee);

      const response = await fetch(`http://localhost:4000/api/employees/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ employee: employee, address: address })
      });
    
      console.log(await response.json());
    
      router.push("/");
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

export default function editEmployee() {
    const params = useParams();
  const id = params.id as string;
  const router = useRouter();
    const [employeeform, setEmployeeForm] = useState({
      name : "",
      surname: "",
      email: "",
      phone: "",
      company_id: "",
      role: ""
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
      const fetchEmployee = async () => {
        try {
          const response1 = await fetch(`http://localhost:4000/api/employees/${id}`);
                
          const employee_data = await response1.json();

          console.log(employee_data)
    
          const response2 = await fetch(`http://localhost:4000/api/addresses/${employee_data.address}`);
                
          const address_data = await response2.json();

          if (employee_data) {

            setEmployeeForm({
              name: employee_data.name || "",
              surname: employee_data.surname || "",
                email: employee_data.email || "",
              phone: employee_data.phone || "",
              company_id: employee_data.company || "",
                role: employee_data.role || ""
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
          console.error('Error fetching employee:', error);
        }
      };
                
      fetchEmployee();
    }, []);
    
  return (
    <div className="wrapper">
      <div className="header-container">
        <h1>Edit Employee</h1>
        </div>
        <div className="content-container">
        <EmployeeForm form={employeeform} setForm={setEmployeeForm}></EmployeeForm>
        <AddressForm form={addressform} setForm={ setAddressForm}></AddressForm>
        <div className="buttons-wrapper"> 
                  <button type="submit" className="form-button" id="saveButton" onClick={(e) => handleSubmit(e, { ...employeeform, ...addressform }, id, router)}>Edit Employee</button>
                    <button className="form-button" id="clearButton" onClick={() => handleClear(setEmployeeForm, setAddressForm)}>Clear</button>
              </div>
        </div>
    </div>
  );
}
