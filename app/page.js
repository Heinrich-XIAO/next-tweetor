import Image from "next/image";
import FlitBox from "../components/flitForm";
import Flit from "../components/flit";
import { sql } from "@vercel/postgres";

export default async function Home() {
  async function getFlits() {
    'use server'
    const { rows } = await sql`SELECT * FROM flits WHERE profane_flit='no'`;
    return rows
  }

  const flits = await getFlits();
  return (
    <main className=" pt-9 w-full">
      <FlitBox/>
    {flits.slice(0).reverse().map((flit) => {
      return (<Flit 
        key={flit.id}
        content={flit.content}
        timestamp={flit.timestamp}
        user={flit.username}
      />)
    })}
    </main>
  );
};
