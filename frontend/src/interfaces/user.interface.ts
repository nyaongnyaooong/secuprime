export interface User {
  guest_code: number;
  guest_name: string;
  guest_birth: string;
  guest_hp: string;
  guest_addr: string;
  guest_mail: string;
}

export interface UserModify {
  guest_code?: number;
  guest_name?: string;
  guest_birth?: string;
  guest_hp?: string;
  guest_addr?: string;
  guest_mail?: string;
}