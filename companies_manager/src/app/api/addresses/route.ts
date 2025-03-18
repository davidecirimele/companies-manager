import { NextRequest, NextResponse } from 'next/server';
import fsPromises from 'fs/promises';
import path from 'path';

const addressesFilePath = path.join(process.cwd(), 'public/mocks/addresses.json');

export async function GET() {
  try {
    const res = await fsPromises.readFile(addressesFilePath,'utf8');
    const json = JSON.parse(res);
    return NextResponse.json(json);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'error', error: 'No addresses found' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function PATCH(req: NextRequest) {
    const res = await fsPromises.readFile(addressesFilePath, 'utf8');
    
    const jsonArray = JSON.parse(res);

    const { street, postalCode, city, countryCode, country, text } = await req.json();

    const addressIndex = jsonArray.findIndex((address: Address) => address.text === text);

    if (addressIndex < 0) {
        return new NextResponse(
            JSON.stringify({ message: 'error', error: 'address not found' }),
            { status: 404, headers: { 'Content-Type': 'application/json' } }
          );
    }
    
    let desiredAddress = jsonArray[addressIndex];

    desiredAddress.street = street ?? desiredAddress.street;
    desiredAddress.postalCode = postalCode ?? desiredAddress.postalCode;
    desiredAddress.city = city ?? desiredAddress.city;
    desiredAddress.countryCode = countryCode ?? desiredAddress.countryCode;
    desiredAddress.country = country ?? desiredAddress.country;
    desiredAddress.text = text ?? desiredAddress.text;

    jsonArray[addressIndex] = desiredAddress;
    
    const updatedData = JSON.stringify(jsonArray);

    await fsPromises.writeFile(addressesFilePath, updatedData);

    return new NextResponse(
        JSON.stringify({ message: 'address patched successfully'}),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
}