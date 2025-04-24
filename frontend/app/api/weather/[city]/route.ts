import {NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest
) {
  const url = new URL(request.url);
  const city = url.pathname.split('/').pop(); // Extract city from the URL
  console.log(city);
  const res = await fetch(`http://localhost:8000/weather/${city}`);
  const data = await res.json();
  
  return NextResponse.json(data);
}
