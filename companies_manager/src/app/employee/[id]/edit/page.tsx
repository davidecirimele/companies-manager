"use client";

import { redirect,notFound, useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useApi } from "@/app/api/api"
import AddressForm  from "@/app/Components/AddressForm";
import EmployeeForm from "@/app/Components/EmployeeForm";

async function handleSubmit(event: React.FormEvent, form_data: Object, editEmployee: any) {
    event.preventDefault();
    let isFormValid = true;

    const arrayObject = Object.values(form_data);

    arrayObject.forEach(element => {
        if (element == "") {
            isFormValid = false;
        }
    });

    if (isFormValid) {

        const [id, name, surname, email, phone, company, role, street, country, postalCode, countryCode, city] = arrayObject;
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

      editEmployee(id, employee);
      redirect("/");
    }
  }

  function handleClear(setName: any, setSurname: any, setEmail: any, setPhone: any, setCompany: any, setRole: any, setStreet: any, setCountry: any, setPostalCode: any, setCountryCode: any, setCity: any) {
      setName("");
      setSurname("");
    setEmail("");
      setPhone("");
      setCompany("");
      setRole("");
    setStreet("");
    setCountry("");
    setPostalCode("");
    setCountryCode("");
    setCity("");
    }

export default function editEmployee() {
    const { getEmployee, editEmployee } = useApi();
    const params = useParams();
    const id = params.id as string;
    const [employee, setEmployee] = useState<Partial<Employee>>({});
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [company_id, setCompany] = useState("");
    const [role, setRole] = useState("");
    const [street, setStreet] = useState("");
    const [country, setCountry] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [city, setCity] = useState("");

    useEffect(() => {
        const selectedEmployee = getEmployee(id);
        console.log(selectedEmployee);
      if (selectedEmployee) {
        setEmployee(selectedEmployee);
        setName(employee.name!);
        setSurname(employee.surname!);
        setEmail(employee.email!);
        setPhone(employee.phone!);
        setCompany(employee.company!);
        setRole(employee.role!);
            console.log("Employee found:", selectedEmployee);
        } else {
            console.log("Employee not found for id:", id);
      }
      if (employee?.address) {
        console.log("Address:", employee.address.text);
        
        setStreet(employee.address!.street);
        setCity(employee.address!.city);
        setCountry(employee.address!.country);
        setCountryCode(employee.address!.countryCode!);
        setPostalCode(employee.address!.postalCode);
      }
    }, [employee]);

  if (!employee) {
    notFound();
  }
    
  return (
    <div className="wrapper">
      <div className="header-container">
        <h1>Edit Employee</h1>
        </div>
        <div className="content-container">
        <EmployeeForm name={name} setName={setName} surname={surname} setSurname={setSurname} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} company_id={company_id} setCompany={setCompany} role={role} setRole={setRole}></EmployeeForm>
          <AddressForm street={street} setStreet={setStreet} city={city} setCity={setCity} country={country} setCountry={setCountry} countryCode={countryCode} setCountryCode={setCountryCode} postalCode={postalCode} setPostalCode = {setPostalCode}></AddressForm>
              <div className="buttons-wrapper"> 
                  <button type="submit" className="form-button" id="saveButton" onClick={(e) => handleSubmit(e, { id, name, surname, email, phone, company_id, role, street, country, postalCode, countryCode, city}, editEmployee)}>Edit Employee</button>
                    <button className="form-button" id="clearButton" onClick={() => handleClear(setName, setSurname, setEmail, setPhone, setCompany, setRole, setStreet, setCountry, setPostalCode, setCountryCode, setCity)}>Clear</button>
              </div>
        </div>
    </div>
  );
}
