export interface FormState {
  name: string;
  email: string;
  password: string;
  confirm: string;
}
 
export type Mode = "signin" | "signup";
