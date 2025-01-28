import { db } from "@/db/db";
import { ManagerCreateProps, TypedRequestBody } from "@/types/types";
import { convertDateToIso } from "@/utils/convertDateToIso";
import { UserRole } from "@prisma/client";
import { Request, Response } from "express";
import { createUserService } from "./users";

export async function createManager(req: TypedRequestBody<ManagerCreateProps>, res: Response) {
  const data = req.body;
  //console.log(data);
  
  const { email, staffNo, dob, hireDate } = data;
  data.dob = convertDateToIso(dob);
  data.hireDate = convertDateToIso(hireDate);
  
  try {
    // Check if the manager already exists
    const [existingEmail, existingStaffNo] = await Promise.all([
      db.manager.findUnique({ where: {email }}),
      db.manager.findUnique({ where: { staffNo } }),
    ]);
    // const existingEmail = await db.manager.findUnique({
    //   where: {
    //     email,
    //   },
    // });
    // const existingStaffNo = await db.manager.findUnique({
    //   where: {
    //     staffNo,
    //   },
    // });
    if (existingEmail) {
      return res.status(409).json({
        data: null,
        error: "Manager with this email already exists",
      });
    }
    if (existingStaffNo) {
      return res.status(409).json({
        data: null,
        error: "Manager with this staff number already exists",
      });
    }
     // first lets create the attendant as a User with the CreateUserService controller function
     const userData = {
      email: data.email,
      password: data.password,
      role: "MANAGER" as UserRole,
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
    const newManager = await db.manager.create({
      data
    });
    console.log(
      `Manager created successfully: ${newManager.firstName} ${newManager.lastName} (${newManager.id})`
    );
    return res.status(201).json({
      data: newManager,
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


export async function getManagers(req: Request, res: Response) {
  try {
    const managers = await db.manager.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(managers);
  } catch (error) {
    console.log(error);
  }
}

export async function getManagersByCompanyId(req: Request, res: Response) {
  const {companyId} = req.params;
  try {
    const managers = await db.manager.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        companyId
      },
    });
    return res.status(200).json(managers);
  } catch (error) {
    console.log(error);
  }
}

export async function getBriefManagers(req: Request, res: Response) {
  const {companyId} = req.params;
  try {
    const managers = await db.manager.findMany({
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
    return res.status(200).json(managers);
  } catch (error) {
    console.log(error);
  }
}


export async function getNextManagerSeq(req: Request, res: Response) {
  const {companyId} = req.params;
  try {
    const lastManager = await db.manager.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        companyId
      },
    });
    // CC/FT/SW/2024/0001
    const stringSeq = lastManager?.staffNo.split("/")[4];
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
