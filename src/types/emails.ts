import { User } from "better-auth";

type Status = "Recieved" | "Decieved" | "Deleted";

export type Email = {
  id: string; //some string associated with email.
  user: User;
  status: Status;
  sent_date: string;
};
