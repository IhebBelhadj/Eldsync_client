import { SafeUrl } from "@angular/platform-browser";


export interface User {
    id: number;
    email: string;
    firstName: string;
    lasteName: string;
    gender: Gender;
    cin: string;
    intro: string;
    hometown: string;
    currentCity: string;
    workplace: string;
    profilePhoto: string;
    coverPhoto: string;
    role: Role;
    followerCount: number;
    followingCount: number;
    enabled: boolean;
    accountVerified: boolean;
    emailVerified: boolean;
    birthDate: string;
    joinDate: string;
    dateLastModified: string;
    status:Status;
    phone: string;
    password:string;
    username: string;
    bannerData: string | null;
    bannerUrl?: SafeUrl;
    imgUrl: string ;
}
export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export enum Status {
    ONLINE = 'ONLINE',
    OFFLINE = 'OFFLINE'
}
export enum Role {
    ADMIN = "ADMIN",
    ELDER = "ELDER",
    NURSE = "NURSE",
    DOCTOR = "DOCTOR"
  }