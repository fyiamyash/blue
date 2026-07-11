import { getGmailClient } from "../gmail/client";

export async function readEmail(args: any) {
  const gmail = await getGmailClient();
  console.log("arrgss------->> in side the tool", args);
  const emailId = args.emailId;
  const { data } = await gmail.users.messages.get({
    userId: "me",
    id: emailId,
    format: "full",
  });

  const headers = Object.fromEntries(
    (data.payload?.headers ?? []).map((h) => [h.name, h.value]),
  );

  const emailBody =
    data.payload?.body?.data || data.payload?.parts?.[0]?.body?.data;
  const body = emailBody
    ? Buffer.from(emailBody, "base64").toString("utf-8")
    : data.snippet;

  return {
    subject: headers.Subject ?? "(no subject)",
    from: headers.From,
    Date: headers.Date,
    body: body,
  };
}

export function readAttachment() {
  console.log(`this read attachment tool funciton is called`);
}
