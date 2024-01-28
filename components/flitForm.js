import Image from "next/image";
import { cookies } from "next/headers";
import { sql } from "@vercel/postgres";

export default function FlitForm() {
  async function handleFlit(formData) {
    'use server'
    
    const content = formData.get('content');
    console.log(content);
    
    const { rows: usernames } = await sql`SELECT username FROM users WHERE id=${cookies().get('auth').value}` 
    
    console.log(usernames)
    await sql`INSERT INTO flits (content, profane_flit, username) VALUES (${content}, ${"no"}, ${usernames[0].username})`
  }
  return (
    <form className="w-full px-24" action={handleFlit}>
      <textarea name="content" autoComplete="off" id="field" role="textbox" aria-multiline="true" aria-labelledby="txtboxMultilineLabel" aria-required="true" className="flit-content-input w-full resize-none text-xl h-60 bg-neutral-700 outline-0" placeholder="Type your flit here..."></textarea>
      <button className="border rounded text-xs w-10 h-10 mt-2">meme</button>
      <br/>
      <button type="submit" className="bg-sky-400 text-black py-2 px-7 rounded mt-4 mb-4">FLIT</button>
    </form>
  );
}
