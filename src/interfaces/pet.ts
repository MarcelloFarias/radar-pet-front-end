import { User } from "./user";

export interface Pet {
  _id: string;
  name: string;
  address: string;
  description: string;
  lastSeen: Date;
  status: string;
  image: string;
  author: User;
}
