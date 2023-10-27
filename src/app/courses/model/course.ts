import { Lesson } from "./lesson";

export interface Course {
  // * string -> tipo | String -> objeto *
  _id: string;
  name: string;
  category: string;
  lessons?: Lesson[];
}
