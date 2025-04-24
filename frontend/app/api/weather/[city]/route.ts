import {NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest, {params}
) {
  const  city = (await params).city; 
  console.log(city)
  const res = await fetch(`http://localhost:8000/weather/${city}`);
  const data = await res.json();
  
  return NextResponse.json(data);
}
