import { getGmailClient } from "../gmail/client";
export async function searchEmail() {
  console.log(`this search email tool funciton is called`);
  const gmail = await getGmailClient();
}
