import { db } from "@/db/db";
import { AttendantCreateProps, TypedRequestBody } from "@/types/types";
import { convertDateToIso } from "@/utils/convertDateToIso";
import { Request, Response } from "express";
import { createUser, createUserService } from "./users";
import { UserRole } from "@prisma/client";

export async function createAttendant(req: TypedRequestBody<AttendantCreateProps>, res: Response) {
  const data = req.body;
  //console.log(data);
  
  const { email, staffNo, dob, hireDate } = data;
  data.dob = convertDateToIso(dob);
  data.hireDate = convertDateToIso(hireDate);
  
  try {
    // Check if the attendant already exists
    const [existingEmail, existingStaffNo] = await Promise.all([
      db.attendant.findUnique({ where: {email }}),
      db.attendant.findUnique({ where: { staffNo } }),
    ]);
    // const existingEmail = await db.attendant.findUnique({
    //   where: {
    //     email,
    //   },
    // });
    // const existingStaffNo = await db.attendant.findUnique({
    //   where: {
    //     staffNo,
    //   },
    // });
    if (existingEmail) {
      return res.status(409).json({
        data: null,
        error: "Attendant with this email already exists",
      });
    }
    if (existingStaffNo) {
      return res.status(409).json({
        data: null,
        error: "Attendant with this staff number already exists",
      });
    }
    // first lets create the attendant as a User with the CreateUserService controller function
    const userData = {
      email: data.email,
      password: data.password,
      role: "ATTENDANT" as UserRole,
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
    const newAttendant = await db.attendant.create({
      data
    });
    console.log(
      `Attendant created successfully: ${newAttendant.firstName} ${newAttendant.lastName} (${newAttendant.id})`
    );
    return res.status(201).json({
      data: newAttendant,
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


export async function getAttendants(req: Request, res: Response) {
  try {
    const attendants = await db.attendant.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(attendants);
  } catch (error) {
    console.log(error);
  }
}


export async function getAttendantsByCompanyId(req: Request, res: Response) {
  const {companyId} = req.params;
  try {
    const attendants = await db.attendant.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        companyId
      },
    });
    return res.status(200).json(attendants);
  } catch (error) {
    console.log(error);
  }
}

export async function getBriefAttendants(req: Request, res: Response) {
  const {companyId} = req.params;
  try {
    const attendants = await db.attendant.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        companyId
      },
      select: {
        id: true,
        name: true,
      }
    });
    return res.status(200).json(attendants);
  } catch (error) {
    console.log(error);
  }
}


export async function getNextAttendantSeq(req: Request, res: Response) {
  const {companyId} = req.params;
  try {
    const lastAttendant = await db.attendant.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        companyId
      },
    });
    // CC/FT/SW/2024/0001
    const stringSeq = lastAttendant?.staffNo.split("/")[4];
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
