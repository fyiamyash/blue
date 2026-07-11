import mammoth from "mammoth";
import { getGmailClient } from "../gmail/client";
import { PDFParse } from "pdf-parse";
import * as XLSX from "xlsx";
export function findAttachments(
  payload: any,
): { filename: string; mimeType: string; attachmentId: string }[] {
  const result: any[] = [];
  function checkNested(pay: any) {
    if (pay.body.attachmentId) {
      result.push({
        filename: pay.filename,
        mimeType: pay.mimeType,
        attachmentId: pay.body.attachmentId,
      });

      if (pay.parts) pay.parts.forEach(checkNested);
    }
  }
  checkNested(payload);
  return result;
}

enum supported_mime_types {
  PDF = "application/pdf",
  DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  XLSX = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
}

export async function readEmail(args: { emailId: string }) {
  const gmail = await getGmailClient();
  // console.log("arrgss------->> in side the tool", args);

  const { data } = await gmail.users.messages.get({
    userId: "me",
    id: args.emailId,
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

  const attachedFile = findAttachments(data.payload);

  return {
    subject: headers.Subject ?? "(no subject)",
    from: headers.From,
    Date: headers.Date,
    body: body,
    attachedFile: attachedFile,
  };
}

export async function readAttachment(args: {
  emailId: string;
  fileName?: string;
  attachmentId: string;
  mime_Type: supported_mime_types;
}) {
  const gmail = await getGmailClient();
  // here when you call the gmail api for the atchmnt it will give the json obj -> {size:123, data:asdasdadsaf}
  const { data } = await gmail.users.messages.attachments.get({
    userId: "me",
    messageId: args.emailId,
    id: args.attachmentId,
  });
  let text: string;
  const buffer = Buffer.from(data.data!, "base64");

  if (args.mime_Type === supported_mime_types.PDF) {
    const parse = new PDFParse({ data: buffer });
    return (text = (await parse.getText()).text);
  } else if (args.mime_Type === supported_mime_types.DOCX) {
    const parse = await mammoth.extractRawText({ buffer: buffer });
    return (text = parse.value);
    return;
  } else if (args.mime_Type === supported_mime_types.XLSX) {
    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetsAsText = workbook.SheetNames.map((sheetName) => {
      const sheet = workbook.Sheets[sheetName];
      const csv = XLSX.utils.sheet_to_csv(sheet!);
      return `[Sheet: ${sheetName}]\n${csv}`;
    });
    return sheetsAsText.join("\n\n");
    return;
  } else {
    return "Unsupported_mime_Type";
  }
}
