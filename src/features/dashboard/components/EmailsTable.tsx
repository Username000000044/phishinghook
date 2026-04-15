// User
// Sent Date
// Status: True, False, "In Progress"

import { User } from "better-auth";

type Status = "Recieved" | "Opened" | "Deleted";

type Email = {
  id: string; //some string associated with email.
  user: User;
  status: Status;
  sent_date: Date;
};

export const EmailsTable = () => {
  return <></>;
};
