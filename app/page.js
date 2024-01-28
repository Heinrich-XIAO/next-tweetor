import Image from "next/image";
import FlitBox from "../components/flitForm";
import Flit from "../components/flit";
import { sql } from "@vercel/postgres";
import { cookies } from 'next/headers';

export default async function Home() {
  async function getFlits() {
    'use server'
    const { rows } = await sql`SELECT * FROM flits WHERE profane_flit='no'`;
    return rows
  }
  async function getUsername() {
    'use server'
    const auth = cookies().get('auth');
    if (auth === undefined) {
      return undefined;
    }
    const { rows } = await sql`SELECT username FROM users WHERE id = ${auth.value}`;
    console.log(rows[0].username);
    return rows[0].username;
  }

  const flits = await getFlits();
  const username = await getUsername();
  const isLoggedIn = username !== undefined;

  return (
    <main className=" pt-9 w-full">
      {isLoggedIn ? <FlitBox/> : null}
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
