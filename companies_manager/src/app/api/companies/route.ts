import { NextRequest, NextResponse } from 'next/server';
import fsPromises from 'fs/promises';
import path from 'path';

const companiesFilePath = path.join(process.cwd(), 'public/mocks/companies.json');

export async function GET() {
  try {
    const res = await fsPromises.readFile(companiesFilePath,'utf8');
    const json = JSON.parse(res);
    return NextResponse.json(json);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'error', error: 'No companies found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function PATCH(req: NextRequest) {
    const res = await fsPromises.readFile(companiesFilePath, 'utf8');
    
    const jsonArray = JSON.parse(res);

    const { id, name, email, phone, employees, address } = await req.json();

    const companyIndex = jsonArray.findIndex((company: Company) => company.id === id);

    if (companyIndex < 0) {
        return new NextResponse(
            JSON.stringify({ message: 'error', error: 'Company not found' }),
            { status: 404, headers: { 'Content-Type': 'application/json' } }
          );
    }
    
    let desiredCompany = jsonArray[companyIndex];

    desiredCompany.name = name ?? desiredCompany.name;
    desiredCompany.email = email ?? desiredCompany.email;
    desiredCompany.phone = phone ?? desiredCompany.phone;
    desiredCompany.employees = employees ?? desiredCompany.employees;
    desiredCompany.address = address ?? desiredCompany.address;

    jsonArray[companyIndex] = desiredCompany;
    
    const updatedData = JSON.stringify(jsonArray);

    await fsPromises.writeFile(companiesFilePath, updatedData);

    return new NextResponse(
        JSON.stringify({ message: 'Company patched successfully'}),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
}