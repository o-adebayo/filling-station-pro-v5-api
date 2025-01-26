import { Driver, FleetDocument, FleetStatus, FuelType, Gender, MaintenanceLog, MaintenanceType, StaffType, UserRole } from '@prisma/client';
import {Request, Response} from 'express';

export interface TypedRequestBody<T> extends Request {
    body: T;
}

// Company CreateProps
export type CompanyCreateProps = {
  name: string;
  logo?: string;
  slug: string;
  companyCode: string;
};


// Contact CreateProps
export type ContactProps = {
    fullName: string;
    email: string;
    phone: string;
    company: string;
    country: string;
    fillingStations: number;
    users: number;
    role: string;
    media: string;
    message: string;
  };

// User CreateProps
export type UserCreateProps = {
  email:    string;  
  password: string;
  role:     UserRole;
  name:     string;
  phone?:    string;
  image?:    string;

  // Company-related fields
  companyId?:   string;
  companyName?: string;
}

// User login props
export type UserLoginProps = {
  email: string;
  password: string;
}

// Manager CreateProps
export type ManagerCreateProps = {
  companyId: string;
  companyName: string;
  userId: string;
  name: string;
  firstName: string;
  lastName: string;
  gender: Gender; // Changed from string to Gender enum
  dob: string;
  staffType?: StaffType; // Changed from string to StaffType enum
  stateId: string;
  stateName?: string;
  stationId: string;
  stationName?: string;
  phone: string;
  nationality: string;
  religion: string;
  email: string;
  password: string;
  staffNo: string;
  hireDate: string;
  address: string;
  imageUrl: string;
  status: string;
}


// Attendant CreateProps
export type AttendantCreateProps = {
  companyId: string;
  companyName: string;
  userId: string;
  name: string;
  firstName: string;
  lastName: string;
  gender: Gender; // Changed from string to Gender enum
  dob: string;
  staffType?: StaffType; // Changed from string to StaffType enum
  stateId: string;
  stateName?: string;
  stationId: string;
  stationName?: string;
  phone: string;
  nationality: string;
  religion: string;
  email: string;
  password: string;
  staffNo: string;
  hireDate: string;
  address: string;
  imageUrl: string;
  status: string;
}

// Driver CreateProps
export type DriverCreateProps = {
  companyId: string;
  companyName: string;
  userId: string;
  name: string;
  firstName: string;
  lastName: string;
  gender: Gender; // Changed from string to Gender enum
  dob: string;
  staffType: StaffType; // Changed from string to StaffType enum
  phone: string;
  nationality: string;
  religion: string;
  email: string;
  password: string;
  staffNo: string;
  hireDate: string;
  address: string;
  imageUrl: string;
  status: string;
  // Driving License fields
  licenseNumber: string;
  licenseExpiry: string;
  licenseClass: string;
  // Optional fleet relationship
  fleetId?: string;
  fleetPlateNo?: string;
}

  // State CreateProps
  export type StateCreateProps = {
    companyId: string;
    name: string;
    slug: string;
  }

  // Station CreateProps
  export type StationCreateProps = {
    companyId: string;
    name: string;
    slug: string;
    stateId: string;
    status: string;
    // PMS Properties
    pms?: boolean;
    pmsDippingTanks: number;
    pmsPumps: number;
    // AGO Properties
    ago?: boolean;
    agoDippingTanks: number;
    agoPumps: number;
    // DPK Properties
    dpk?: boolean;
    dpkDippingTanks: number;
    dpkPumps: number;
}

// Fleet CreateProps
export type FleetCreateProps = {
  companyId: string;
  fleetType: string;
  registrationNo: string;
  plateNo: string;
  model: string;
  capacity?: number;        // Optional float value
  manufactureYear: string;
  status: FleetStatus;
  imageUrl: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  fuelType: FuelType;
  insuranceExpiry: string;
  //documents?: FleetDocument[];
  //maintenanceLog: MaintenanceLog[];
  driverId?: string;       // Optional driver relationship
  driverName?: string;
  //driver?: Driver;
}


// MaintenanceLog CreateProps
export type MaintenanceLogCreateProps = {
  companyId: string;
  fleetId: string;
  fleetPlateNo: string;
  type: MaintenanceType;
  date: string;
  cost: number;
  description: string;
  technician?: string;
  location?: string;
  parts?: string;
  nextService?: string;
  imageUrl: string;
}


// FleetDocument CreateProps
// export type FleetDocumentCreateProps = {
//   fleetId: string;
//   type: DocumentType;
//   documentUrl: string;
// };

// Attendance CreateProps
// export type AttendanceCreateProps = {
//   managerId?: string;
//   attendantId?: string;
//   driverId?: string;
//   driverName?: string;
//   checkIn?: Date;
//   checkOut?: Date;
//   status: AttendanceStatus;
//   note?: string;
// };

// Leave CreateProps
// export type LeaveCreateProps = {
//   managerId?: string;
//   attendantId?: string;
//   driverId?: string;
//   driverName?: string;
//   type: LeaveType;
//   startDate: Date;
//   endDate: Date;
//   duration: number;
//   status?: LeaveStatus;
//   reason: string;
//   approvedBy?: string;
//   approvedAt?: Date;
//   comments?: string;
//   documents?: string;
// };

