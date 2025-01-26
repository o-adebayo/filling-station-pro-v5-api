import { db } from "@/db/db";
import { DriverCreateProps, TypedRequestBody, UserCreateProps } from "@/types/types";
import { convertDateToIso } from "@/utils/convertDateToIso";
import { UserRole } from "@prisma/client";
import { Request, Response } from "express";
import { createUserService } from "./users";

export async function createDriver(req: TypedRequestBody<DriverCreateProps>, res: Response) {
  const data = req.body;
  //console.log(data);
  
  const { email, staffNo, dob, hireDate, licenseExpiry } = data;
  data.dob = convertDateToIso(dob);
  data.hireDate = convertDateToIso(hireDate);
  data.licenseExpiry = convertDateToIso(licenseExpiry);
  
  try {
    // Check if the user already exists
    // Check if the user already exists
    const [existingEmail, existingStaffNo] = await Promise.all([
      db.driver.findUnique({ where: { email } }),
      db.driver.findUnique({ where: { staffNo} }),
    ]);
    // const existingEmail = await db.driver.findUnique({
    //   where: {
    //     email,
    //   },
    // });
    // const existingStaffNo = await db.driver.findUnique({
    //   where: {
    //     staffNo,
    //   },
    // });
    if (existingEmail) {
      return res.status(409).json({
        data: null,
        error: "Driver with this email already exists",
      });
    }
    if (existingStaffNo) {
      return res.status(409).json({
        data: null,
        error: "Driver with this staff number already exists",
      });
    }
     // first lets create the attendant as a User with the CreateUserService controller function
     const userData = {
      email: data.email,
      password: data.password,
      role: "DRIVER" as UserRole,
      name: data.name,
      phone: data.phone,
      image: data.imageUrl,
      companyId: data.companyId,
      companyName: data.companyName,
    }
    const user = await createUserService(userData);

    // Noe get the ID from the newly created user profile and use it
    // as the userId in the Attendant table as we create new attendants
    data.userId = user.id;
    const newDriver = await db.driver.create({
      data
    });
    console.log(
      `Driver created successfully: ${newDriver.firstName} ${newDriver.lastName} (${newDriver.id})`
    );
    return res.status(201).json({
      data: newDriver,
      error: null,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      error: "Something went wrong",
    });
  }
}


export async function getDrivers(req: Request, res: Response) {
  try {
    const drivers = await db.driver.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(drivers);
  } catch (error) {
    console.log(error);
  }
}

export async function getBriefDrivers(req: Request, res: Response) {
  try {
    const drivers = await db.driver.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select:{
        id: true,
        name: true,
      }
    });
    return res.status(200).json(drivers);
  } catch (error) {
    console.log(error);
  }
}


export async function getNextDriverSeq(req: Request, res: Response) {
  try {
    const lastDriver = await db.driver.findFirst({
      orderBy: {
        createdAt: "desc",
      },
    });
    // CC/FT/DR/2024/0001
    const stringSeq = lastDriver?.staffNo.split("/")[4];
    const lastSeq =  stringSeq ? parseInt(stringSeq) : 0;
    const nextSeq = lastSeq + 1;
    return res.status(200).json(nextSeq);
  } catch (error) {
    console.log(error);
  }
}


// export async function getCustomerById(req: Request, res: Response) {
//   const { id } = req.params;
//   try {
//     const customer = await db.customer.findUnique({
//       where: {
//         id,
//       },
//     });
//     return res.status(200).json(customer);
//   } catch (error) {
//     console.log(error);
//   }
// }
