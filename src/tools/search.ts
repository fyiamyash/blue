import { getGmailClient } from "../gmail/client";
export async function searchEmail(args: any) {
  const gmail = await getGmailClient();
  const { data } = await gmail.users.messages.list({
    userId: "me",
    q: args.query,
    maxResults: 20,
  });
  if (!data.messages?.length) {
    return "No emails found matching that query.";
  }
  const emails = await Promise.all(
    data.messages!.map(async (msg) => {
      const { data: fullContent } = await gmail.users.messages.get({
        userId: "me",
        id: msg.id!,
        format: "metadata",
        metadataHeaders: ["Subject", "From", "Date"],
      });

      const headers = Object.fromEntries(
        (fullContent.payload?.headers ?? []).map((h) => [h.name, h.value]),
      );

      return {
        id: msg.id,
        subject: headers.Subject ?? "(no subject)",
        from: headers.From,
        date: headers.Date,
        snippet: fullContent.snippet,
        isUnread: fullContent.labelIds?.includes("UNREAD") ?? false,
      };
    }),
  );

  return emails;
}
