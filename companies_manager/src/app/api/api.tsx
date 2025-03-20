"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';
import crypto from 'crypto';

const defaultCompanies : Company[] = [{ "id": "1", "name": "Tech Innovators", "email": "info@techinnovators.com", "phone": "3491234567", "employees": [], "address": { "street": "Via Roma, 10", "city": "Milano", "postalCode": "20100", "country": "Italy" } }, { "id": "2", "name": "Green Energy Solutions", "email": "contact@greenenergy.com", "phone": "3482345678", "employees": [], "address": { "street": "Corso Vittorio Emanuele, 25", "city": "Torino", "postalCode": "10100", "country": "Italy" } }, { "id": "3", "name": "Foodies Delight", "email": "hello@foodiesdelight.com", "phone": "3473456789", "employees": [], "address": { "street": "Piazza Navona, 15", "city": "Roma", "postalCode": "00100", "country": "Italy" } }, { "id": "4", "name": "EduTech Academy", "email": "support@edutechacademy.com", "phone": "3464567890", "employees": [], "address": { "street": "Via Garibaldi, 8", "city": "Firenze", "postalCode": "50100", "country": "Italy" } }, { "id": "5", "name": "HealthFirst Clinic", "email": "appointments@healthfirst.com", "phone": "3455678901", "employees": [], "address": { "street": "Viale della Libertà, 20", "city": "Napoli", "postalCode": "80100", "country": "Italy" } }, { "id": "6", "name": "Travel Wonders", "email": "booking@travelwonders.com", "phone": "3446789012", "employees": [], "address": { "street": "Lungomare, 50", "city": "Genova", "postalCode": "16100", "country": "Italy" } }, { "id": "7", "name": "Fashion Forward", "email": "contact@fashionforward.com", "phone": "3437890123", "employees": [], "address": { "street": "Via Montenapoleone, 3", "city": "Milano", "postalCode": "20121", "country": "Italy" } }, { "id": "8", "name": "AutoMoto Experts", "email": "service@automotoexperts.com", "phone": "3428901234", "employees": [], "address": { "street": "Via Emilia, 45", "city": "Bologna", "postalCode": "40100", "country": "Italy" } }, { "id": "9", "name": "Home Comforts", "email": "sales@homecomforts.com", "phone": "3419012345", "employees": [], "address": { "street": "Via Toledo, 12", "city": "Napoli", "postalCode": "80134", "country": "Italy" } }, { "id": "cb80cb67357a65857ebf2c0fcd69a3d9", "name": "Safe Solutions", "email": "safesolutions@info.com", "phone": "3289192839", "address": { "street": "Via Roma, 10", "postalCode": "87029", "country": "Italy", "countryCode": "IT", "city": "Scalea", "text": "Via Roma, 10,87029 Scalea,Italy" } }];
const defaultEmployees: Employee[] = [
    { id: "b78321526af5593de59cd689e0e07467", name: "Davide", surname: "Rossi", email: "daviderossi@info.com", phone: "3627182938", role: "Stagist", company: "2", address: { street: "Via Montevideo, 12", postalCode: "870291", country: "Italy", countryCode: "IT", city: "Napoli", text: "Via Montevideo, 12,870291 Napoli,Italy" } },
    { id: "a45dfg67hjkl891mno235tuv456xyz12", name: "Luca", surname: "Bianchi", email: "lucabianchi@info.com", phone: "3918273645", role: "Software Engineer", company: "5", address: { street: "Viale Europa, 45", postalCode: "00144", country: "Italy", countryCode: "IT", city: "Roma", text: "Viale Europa, 45,00144 Roma,Italy" } },
    { id: "98ghjk123abc456def789xyz", name: "Marco", surname: "Verdi", email: "marcoverdi@info.com", phone: "3397654321", role: "Project Manager", company: "3", address: { street: "Via Garibaldi, 32", postalCode: "10122", country: "Italy", countryCode: "IT", city: "Torino", text: "Via Garibaldi, 32,10122 Torino,Italy" } },
    { id: "12abc456def789ghi123jkl", name: "Francesca", surname: "Neri", email: "francescaneri@info.com", phone: "3289876543", role: "HR Manager", company: "1", address: { street: "Corso Buenos Aires, 10", postalCode: "20124", country: "Italy", countryCode: "IT", city: "Milano", text: "Corso Buenos Aires, 10,20124 Milano,Italy" } },
    { id: "5mno678pqr901stu234vwx", name: "Giulia", surname: "Ferrari", email: "giuliaferrari@info.com", phone: "3456789012", role: "Marketing Specialist", company: "4", address: { street: "Piazza Duomo, 5", postalCode: "80132", country: "Italy", countryCode: "IT", city: "Napoli", text: "Piazza Duomo, 5,80132 Napoli,Italy" } },
    { id: "7opq890rst123uvw456xyz", name: "Alessandro", surname: "Galli", email: "alessandrogalli@info.com", phone: "3204567890", role: "Accountant", company: "6", address: { street: "Via Manzoni, 78", postalCode: "40121", country: "Italy", countryCode: "IT", city: "Bologna", text: "Via Manzoni, 78,40121 Bologna,Italy" } },
    { id: "abc123def456ghi789jkl0", name: "Martina", surname: "Conti", email: "martinaconti@info.com", phone: "3291234567", role: "Designer", company: "2", address: { street: "Via Dante, 14", postalCode: "35100", country: "Italy", countryCode: "IT", city: "Padova", text: "Via Dante, 14,35100 Padova,Italy" } },
    { id: "def456ghi789jkl012mno3", name: "Stefano", surname: "Rinaldi", email: "stefanorinaldi@info.com", phone: "3337654321", role: "IT Support", company: "7", address: { street: "Via Roma, 50", postalCode: "09100", country: "Italy", countryCode: "IT", city: "Cagliari", text: "Via Roma, 50,09100 Cagliari,Italy" } },
    { id: "ghi789jkl012mno345pqr6", name: "Valentina", surname: "Moretti", email: "valentinamoretti@info.com", phone: "3318765432", role: "Finance Manager", company: "8", address: { street: "Corso Italia, 20", postalCode: "16121", country: "Italy", countryCode: "IT", city: "Genova", text: "Corso Italia, 20,16121 Genova,Italy" } },
    { id: "jkl012mno345pqr678stu9", name: "Roberto", surname: "De Luca", email: "robertodeluca@info.com", phone: "3409876543", role: "Business Analyst", company: "9", address: { street: "Piazza San Marco, 1", postalCode: "30124", country: "Italy", countryCode: "IT", city: "Venezia", text: "Piazza San Marco, 1,30124 Venezia,Italy" } },
    { id: "klm345nop678qrs901tuv2", name: "Elisa", surname: "Marini", email: "elisamarini@info.com", phone: "3276543210", role: "Sales Manager", company: "10", address: { street: "Via della Libertà, 8", postalCode: "50129", country: "Italy", countryCode: "IT", city: "Firenze", text: "Via della Libertà, 8,50129 Firenze,Italy" } },
    { id: "nop678qrs901tuv234wxy5", name: "Simone", surname: "Barbieri", email: "simonebarbieri@info.com", phone: "3129876543", role: "Legal Consultant", company: "11", address: { street: "Via Po, 22", postalCode: "10123", country: "Italy", countryCode: "IT", city: "Torino", text: "Via Po, 22,10123 Torino,Italy" } },
    { id: "qrs901tuv234wxy567zab8", name: "Chiara", surname: "Serra", email: "chiaraserra@info.com", phone: "3187654321", role: "Customer Support", company: "12", address: { street: "Corso Vercelli, 11", postalCode: "20145", country: "Italy", countryCode: "IT", city: "Milano", text: "Corso Vercelli, 11,20145 Milano,Italy" } },
    { id: "tuv234wxy567zab890cde1", name: "Federico", surname: "Pellegrini", email: "federicopellegrini@info.com", phone: "3254321098", role: "Researcher", company: "13", address: { street: "Via Toledo, 60", postalCode: "80134", country: "Italy", countryCode: "IT", city: "Napoli", text: "Via Toledo, 60,80134 Napoli,Italy" } },
    { id: "wxy567zab890cde123fgh4", name: "Anna", surname: "Fiore", email: "annafiore@info.com", phone: "3221098765", role: "Software Tester", company: "14", address: { street: "Via Marconi, 77", postalCode: "40122", country: "Italy", countryCode: "IT", city: "Bologna", text: "Via Marconi, 77,40122 Bologna,Italy" } }
  ];
const defaultAddresses: Address[] = [{ "street": "Via Sedile di Porto 124", "postalCode": "35020", "city": "Correzzola", "countryCode": "IT", "country": "Italy", "text": "Via Sedile di Porto 124, 35020 Correzzola, Italy" }, { "street": "Via Vicenza 53", "postalCode": "40068", "city": "Farneto", "countryCode": "IT", "country": "Italy", "text": "Via Vicenza 53, 40068 Farneto, Italy" }, { "street": "Via Licola Patria 98", "postalCode": "83040", "city": "Mattinella", "countryCode": "IT", "country": "Italy", "text": "Via Licola Patria 98, 83040 Mattinella, Italy" }, { "street": "Via Spalato 124", "postalCode": "21030", "city": "Orino", "countryCode": "IT", "country": "Italy", "text": "Via Spalato 124, 21030 Orino, Italy" }, { "street": "Via Santa Lucia 44", "postalCode": "06050", "city": "Izzalini", "countryCode": "IT", "country": "Italy", "text": "Via Santa Lucia 44, 06050 Izzalini, Italy" }, { "street": "Via Galvani 97", "postalCode": "00050", "city": "Testa Di Lepre Di Sopra", "countryCode": "IT", "country": "Italy", "text": "Via Galvani 97, 00050 Testa Di Lepre Di Sopra, Italy" }, { "street": "Via dei Fontanili 2", "postalCode": "20141", "city": "Milano", "countryCode": "IT", "country": "Italy", "text": "Via dei Fontanili 2, 20141 Milano, Italy" }, { "street": "Viale Corsica 95", "postalCode": "20133", "city": "Milano", "countryCode": "IT", "country": "Italy", "text": "Viale Corsica 95, 20133 Milano, Italy" }, { "street": "Via dei Mille 10", "postalCode": "00185", "city": "Roma", "countryCode": "IT", "country": "Italy", "text": "Via dei Mille 10, 00185 Roma, Italy" }, { "street": "Corso Buenos Aires 50", "postalCode": "20124", "city": "Milano", "countryCode": "IT", "country": "Italy", "text": "Corso Buenos Aires 50, 20124 Milano, Italy" }, { "street": "Piazza del Duomo 1", "postalCode": "50122", "city": "Firenze", "countryCode": "IT", "country": "Italy", "text": "Piazza del Duomo 1, 50122 Firenze, Italy" }, { "street": "Largo Augusto 8", "postalCode": "20122", "city": "Milano", "countryCode": "IT", "country": "Italy", "text": "Largo Augusto 8, 20122 Milano, Italy" }, { "street": "Via del Corso 200", "postalCode": "00186", "city": "Roma", "countryCode": "IT", "country": "Italy", "text": "Via del Corso 200, 00186 Roma, Italy" }, { "street": "Piazza San Marco 5", "postalCode": "30124", "city": "Venezia", "countryCode": "IT", "country": "Italy", "text": "Piazza San Marco 5, 30124 Venezia, Italy" }, { "street": "Via Etnea 123", "postalCode": "95131", "city": "Catania", "countryCode": "IT", "country": "Italy", "text": "Via Etnea 123, 95131 Catania, Italy" }, { "street": "Via Garibaldi 45", "postalCode": "16124", "city": "Genova", "countryCode": "IT", "country": "Italy", "text": "Via Garibaldi 45, 16124 Genova, Italy" }, { "street": "Corso Vittorio Emanuele II 100", "postalCode": "80121", "city": "Napoli", "countryCode": "IT", "country": "Italy", "text": "Corso Vittorio Emanuele II 100, 80121 Napoli, Italy" }, { "street": "Via Roma 50", "postalCode": "09100", "city": "Cagliari", "countryCode": "IT", "country": "Italy", "text": "Via Roma 50, 09100 Cagliari, Italy" }, { "street": "Piazza della Repubblica 10", "postalCode": "00100", "city": "Roma", "countryCode": "IT", "country": "Italy", "text": "Piazza della Repubblica 10, 00100 Roma, Italy" }, { "street": "Via Dante Alighieri 15", "postalCode": "20121", "city": "Milano", "countryCode": "IT", "country": "Italy", "text": "Via Dante Alighieri 15, 20121 Milano, Italy" }, { "street": "Viale dei Mille 30", "postalCode": "00100", "city": "Roma", "countryCode": "IT", "country": "Italy", "text": "Viale dei Mille 30, 00100 Roma, Italy" }, { "street": "Piazza del Popolo 12", "postalCode": "00187", "city": "Roma", "countryCode": "IT", "country": "Italy", "text": "Piazza del Popolo 12, 00187 Roma, Italy" }, { "street": "Via Nazionale 200", "postalCode": "00184", "city": "Roma", "countryCode": "IT", "country": "Italy", "text": "Via Nazionale 200, 00184 Roma, Italy" }, { "street": "Lungomare Caracciolo 10", "postalCode": "80122", "city": "Napoli", "countryCode": "IT", "country": "Italy", "text": "Lungomare Caracciolo 10, 80122 Napoli, Italy" }, { "street": "Via XX Settembre 50", "postalCode": "16121", "city": "Genova", "countryCode": "IT", "country": "Italy", "text": "Via XX Settembre 50, 16121 Genova, Italy" }, { "street": "Piazza San Carlo 15", "postalCode": "10121", "city": "Torino", "countryCode": "IT", "country": "Italy", "text": "Piazza San Carlo 15, 10121 Torino, Italy" }, { "street": "Via Mazzini 45", "postalCode": "37121", "city": "Verona", "countryCode": "IT", "country": "Italy", "text": "Via Mazzini 45, 37121 Verona, Italy" }, { "street": "Corso Umberto I 100", "postalCode": "98039", "city": "Taormina", "countryCode": "IT", "country": "Italy", "text": "Corso Umberto I 100, 98039 Taormina, Italy" }, { "street": "Via San Gregorio Armeno 10", "postalCode": "80138", "city": "Napoli", "countryCode": "IT", "country": "Italy", "text": "Via San Gregorio Armeno 10, 80138 Napoli, Italy" }, { "street": "Piazza dei Miracoli 1", "postalCode": "56126", "city": "Pisa", "countryCode": "IT", "country": "Italy", "text": "Piazza dei Miracoli 1, 56126 Pisa, Italy" }, { "street": "Via Della Conciliazione 4", "postalCode": "00120", "city": "Città del Vaticano", "countryCode": "IT", "country": "Italy", "text": "Via Della Conciliazione 4, 00120 Città del Vaticano, Italy" }, { "street": "Largo di Torre Argentina 5", "postalCode": "00186", "city": "Roma", "countryCode": "IT", "country": "Italy", "text": "Largo di Torre Argentina 5, 00186 Roma, Italy" }, { "street": "Via Roma, 10", "city": "Milano", "postalCode": "20100", "countryCode": "IT", "country": "Italy", "text": "Via Roma, 10, 20100 Milano, Italy" }, { "street": "Corso Vittorio Emanuele, 25", "city": "Torino", "postalCode": "10100", "countryCode": "IT", "country": "Italy", "text": "Corso Vittorio Emanuele, 25, 10100 Torino, Italy" }, { "street": "Piazza Navona, 15", "city": "Roma", "postalCode": "00100", "countryCode": "IT", "country": "Italy", "text": "Piazza Navona, 15, 00100 Roma, Italy" }, { "street": "Via Garibaldi, 8", "city": "Firenze", "postalCode": "50100", "countryCode": "IT", "country": "Italy", "text": "Via Garibaldi, 8, 50100 Firenze, Italy" }, { "street": "Viale della Libertà, 20", "city": "Napoli", "postalCode": "80100", "countryCode": "IT", "country": "Italy", "text": "Viale della Libertà, 20, 80100 Napoli, Italy" }, { "street": "Lungomare, 50", "city": "Genova", "postalCode": "16100", "countryCode": "IT", "country": "Italy", "text": "Lungomare, 50, 16100 Genova, Italy" }, { "street": "Via Montenapoleone, 3", "city": "Milano", "postalCode": "20121", "countryCode": "IT", "country": "Italy", "text": "Via Montenapoleone, 3, 20121 Milano, Italy" }, { "street": "Via Emilia, 45", "city": "Bologna", "postalCode": "40100", "countryCode": "IT", "country": "Italy", "text": "Via Emilia, 45, 40100 Bologna, Italy" }, { "street": "Via Toledo, 12", "city": "Napoli", "postalCode": "80134", "countryCode": "IT", "country": "Italy", "text": "Via Toledo, 12, 80134 Napoli, Italy" }, { "street": "Via Roma, 10", "postalCode": "87029", "city": "Scalea", "countryCode": "IT", "country": "Italy", "text": "Via Roma, 10,87029 Scalea,Italy" }, { "street": "Via Montevideo, 12", "postalCode": "870291", "city": "Napoli", "countryCode": "IT", "country": "Italy", "text": "Via Montevideo, 12,870291 Napoli,Italy" }];

interface ApiContextType {
  companies: Company[];
  employees: Employee[];
  addresses: Address[];
  getAllCompanies: () => Company[];
  getCompany: (id: string) => Company | undefined;
  createCompany: (company: Company) => Company;
  editCompany: (id: string, updatedCompany: Company) => Company | null;
  deleteCompany: (id: string) => void;
    getEmployee: (id: string) => Employee | undefined;
    getCompanyEmployees: (id: string) => Employee[];
  createEmployee: (employee: Employee) => Employee;
  editEmployee: (id: string, updatedEmployee: Employee) => Employee | null;
  deleteEmployee: (id: string) => void;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const ApiProvider = ({ children }: { children: ReactNode }) => {
  const [companies, setCompanies] = useState<Company[]>(defaultCompanies);
  const [employees, setEmployees] = useState<Employee[]>(defaultEmployees);
  const [addresses, setAddresses] = useState<Address[]>(defaultAddresses);

    const getAllCompanies = () => {
        return companies;
    };

    const getCompany = (id: string) => {
        return companies.find((company: Company) => company.id === id);
    };

    const createCompany = (company: Company) => {
        console.log(company);
        const id = crypto.randomBytes(16).toString('hex');
        company.id = id;
        
        const updatedCompanies = [...companies, company];
        console.log(updatedCompanies);
        
        setCompanies(updatedCompanies);

        console.log(companies);

        if (company.address) {
            const updatedAddresses = [...addresses, company.address];
            setAddresses(updatedAddresses);
        }

        return company;
    };

    const editCompany = (id: string, updatedCompany: Company) => {
        setCompanies((oldCompany) => {
            const temp = oldCompany.slice();
            const index = temp.findIndex((company: Company) => company.id === id);
            if (index >= 0) {
                temp[index] = { ...temp[index], ...updatedCompany };
                return temp;
            }
            return oldCompany;
        });
        return null;
    };

    const deleteCompany = (id: string) => {
        const temp = companies.filter((c) => c.id !== id);
        setCompanies(temp);
    };

    const getCompanyEmployees = (companyId: string) => {
        return employees.filter((e) => e.company === companyId);
    };

    const getEmployee = (id: string) => {
        return employees.find((employee: Employee) => employee.id === id);
    };

    const createEmployee = (employee: Employee) => {
        console.log(employee);
        const id = crypto.randomBytes(16).toString('hex');
        employee.id = id;
        
        const updatedEmployees = [...employees, employee];
        console.log(updatedEmployees);
        
        setEmployees(updatedEmployees);

        console.log(employees);

        if (employee.address) {
            const updatedAddresses = [...addresses, employee.address];
            setAddresses(updatedAddresses);
        }

        return employee;
    };

    const editEmployee = (id: string, updatedEmployee: Employee) => {
        setEmployees((oldEmployees) => {
            const temp = oldEmployees.slice();
            const index = temp.findIndex((employee: Employee) => employee.id === id);
            if (index >= 0) {
                temp[index] = { ...temp[index], ...updatedEmployee };
                return temp;
            }
            return oldEmployees;
        });
        return null;
    };

    const deleteEmployee = (id: string) => {
        const temp = employees.filter((e) => e.id !== id);
        setEmployees(temp);
    };

  return (
    <ApiContext.Provider
      value={{
        companies,
        employees,
        addresses,
        getAllCompanies,
        getCompany,
        getEmployee,
        getCompanyEmployees,
        createCompany,
        editCompany,
        deleteCompany,
        createEmployee,
        editEmployee,
        deleteEmployee
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error("useApi must be used within an ApiProvider");
  }
  return context;
};



