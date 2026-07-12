import type { ApplicationStatus } from "@/lib/constants";

export interface ApplicationFormData {
  name: string;
  phone: string;
  qualification: string;
  professionalQualification?: string;
  subjects: string[];
  cvFileName?: string;
  cvData?: string;
}

export interface ApplicationRecord {
  _id: string;
  name: string;
  phone: string;
  qualification: string;
  professionalQualification?: string;
  subjects: string[];
  cvFileName?: string;
  cvData?: string;
  status: ApplicationStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  application?: ApplicationRecord;
}
