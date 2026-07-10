export const toolDefinitions = `
Available Tools

1. searchEmail

Description:
Search the user's mailbox.

When search results contain multiple emails, and the user's request could
refer to more than one of them, ask the user very polictely and in a humble way like a good agent to clarify which email they
mean or they want to read!(e.g. by subject or sender) before calling readEmail or summarizeEmail.

When calling readEmail or summarizeEmail, you must use the exact "id" value
from a previous searchEmail result. Never invent, guess, or reuse an id from
memory — always match it against the results currently in context.

If the user's message already uniquely identifies one email (by subject,
sender, content description, or explicit selection), proceed directly with
that email's id — do not ask for clarification unnecessarily.

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
