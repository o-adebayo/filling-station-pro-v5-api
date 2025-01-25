import { db } from "@/db/db";
import { MaintenanceLogCreateProps, TypedRequestBody } from "@/types/types";
import { convertDateToIso } from "@/utils/convertDateToIso";
import { Request, Response } from "express";

export async function createMaintenance(req: TypedRequestBody<MaintenanceLogCreateProps>, res: Response) {
  const data = req.body;
  //console.log(data);
  
  const { date, nextService } = data;
  if (nextService) {
    data.nextService = convertDateToIso(nextService);
  }
  data.date = convertDateToIso(date);
  
  try {
    // Check if the user already exists
    // const existingEmail = await db.driver.findUnique({
    //   where: {
    //     email,
    //   },
    // });
    // if (existingEmail) {
    //   return res.status(409).json({
    //     data: null,
    //     error: "Driver with this email already exists",
    //   });
    // }
    const newMaintenanceLog = await db.maintenanceLog.create({
      data
    });
    console.log(
      `Maintenance created successfully: ${newMaintenanceLog.id}`
    );
    return res.status(201).json({
      data: newMaintenanceLog,
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


export async function getMaintenances(req: Request, res: Response) {
  try {
    const maintenanceLogs = await db.maintenanceLog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(maintenanceLogs);
  } catch (error) {
    console.log(error);
  }
}

export async function getBriefMaintenances(req: Request, res: Response) {
  try {
    const drivers = await db.maintenanceLog.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select:{
        id: true,
        fleetId: true,
      }
    });
    return res.status(200).json(drivers);
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
