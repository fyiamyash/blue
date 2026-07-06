export const toolDefinitions = `
Available Tools

1. searchEmail

Description:
Search the user's mailbox.

Arguments:

{
  "query": "string"
}

--------------------------------

2. readEmail

Description:
Read a specific email.

Arguments:

{
  "emailId": "string"
}

--------------------------------

3. readAttachment

Description:
Read and extract text from an attachment.

Arguments:

{
  "attachmentId": "string"
}

--------------------------------

4. summarizeEmail

Description:
Generate a summary of an email.

Arguments:

{
  "emailId": "string"
}
`;
