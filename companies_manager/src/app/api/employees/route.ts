import { NextRequest, NextResponse } from 'next/server';
import fsPromises from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const employeesFilePath = path.join(process.cwd(), 'public/mocks/employees.json');

export async function GET() {
  try {
    const res = await fsPromises.readFile(employeesFilePath,'utf8');
    const json = JSON.parse(res);
    return NextResponse.json(json);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'error', error: 'No employees found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function DELETE(req: NextRequest) {
    try {
        const res = await fsPromises.readFile(employeesFilePath, 'utf8');
        const jsonArray = JSON.parse(res);

        const { id } = await req.json();

        const EmployeeIndex = jsonArray.findIndex((employee: Employee) => employee.id === id);

        if (EmployeeIndex < 0) {
            return new NextResponse(
                JSON.stringify({ message: 'error', error: 'Employee not found' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
              );
        }

        let desiredEmployee = jsonArray[EmployeeIndex];

        //IMPLEMENTARE ELIMINAZIONE
        
        
    } catch (error) {
        
    }
}

export async function POST(req: NextRequest) {
    try {
        const res = await fsPromises.readFile(employeesFilePath, 'utf8');
    
        const jsonArray = JSON.parse(res);

        const { name, surname, email, phone, role, company, address } = await req.json();

        const id = crypto.randomBytes(16).toString('hex');
    
        jsonArray.push({ id, name, surname, email, phone, role, company, address });

        const updatedData = JSON.stringify(jsonArray);

        await fsPromises.writeFile(employeesFilePath, updatedData);

        return new NextResponse(
            JSON.stringify({ message: 'Employee created successfully' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Server Error', error: 'Error reading file or parsing data' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const res = await fsPromises.readFile(employeesFilePath, 'utf8');
    
        const jsonArray = JSON.parse(res);

        const { id, name, surname, email, phone, role, company, address } = await req.json();

        const EmployeeIndex = jsonArray.findIndex((employee: Employee) => employee.id === id);

        if (EmployeeIndex < 0) {
            return new NextResponse(
                JSON.stringify({ message: 'error', error: 'Employee not found' }),
                { status: 404, headers: { 'Content-Type': 'application/json' } }
            );
        }
    
        let desiredEmployee = jsonArray[EmployeeIndex];

        desiredEmployee.name = name ?? desiredEmployee.name;
        desiredEmployee.surname = surname ?? desiredEmployee.surname;
        desiredEmployee.email = email ?? desiredEmployee.email;
        desiredEmployee.phone = phone ?? desiredEmployee.phone;
        desiredEmployee.role = role ?? desiredEmployee.role;
        desiredEmployee.company = company ?? desiredEmployee.company;
        desiredEmployee.address = address ?? desiredEmployee.addres;

        jsonArray[EmployeeIndex] = desiredEmployee;
    
        const updatedData = JSON.stringify(jsonArray);

        await fsPromises.writeFile(employeesFilePath, updatedData);

        return new NextResponse(
            JSON.stringify({ message: 'Employee patched successfully' }),
            { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ message: 'Server Error', error: 'Error reading file or parsing data' }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}

