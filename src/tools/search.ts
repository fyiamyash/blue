import { getGmailClient } from "../gmail/client";
export async function searchEmail(args: {}) {
  console.log(`this search email tool funciton is called`);
  const gmail = await getGmailClient();
  console.log(args, "hello");
  return "one email from ayush";
}
