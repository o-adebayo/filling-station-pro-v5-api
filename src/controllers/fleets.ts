import { db } from "@/db/db";
import {FleetCreateProps, TypedRequestBody } from "@/types/types";
import { convertDateToIso } from "@/utils/convertDateToIso";
import { Request, Response } from "express";

export async function createFleet(req: TypedRequestBody<FleetCreateProps>, res: Response) {
  const data = req.body;
  //console.log(data);
  
  const { registrationNo, plateNo, insuranceExpiry, nextMaintenance, lastMaintenance } = data;
  data.insuranceExpiry = convertDateToIso(insuranceExpiry);
  // first check if the dates exist since they are option
  if (nextMaintenance) {
    data.nextMaintenance = convertDateToIso(nextMaintenance);
  }
  if (lastMaintenance) {
    data.lastMaintenance = convertDateToIso(lastMaintenance);
  }
  
  try {
    // Check if the user already exists
    const [existingRegistrationNo, existingPlateNo] = await Promise.all([
      db.fleet.findUnique({ where: { registrationNo }}),
      db.fleet.findUnique({ where: { plateNo } }),
    ]);
    // const existingRegistrationNo = await db.fleet.findUnique({
    //   where: {
    //     registrationNo,
    //   },
    // });
    // const existingPlateNo = await db.fleet.findUnique({
    //   where: {
    //     plateNo,
    //   },
    // });
    if (existingRegistrationNo) {
      return res.status(409).json({
        data: null,
        error: "Fleet with this registration number already exists",
      });
    }
    if (existingPlateNo) {
      return res.status(409).json({
        data: null,
        error: "Fleet with this plate number already exists",
      });
    }
    const newFleet = await db.fleet.create({
      data
    });
    console.log(
      `Fleet created successfully: ${newFleet.registrationNo} ${newFleet.plateNo} (${newFleet.id})`
    );
    return res.status(201).json({
      data: newFleet,
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


export async function getFleets(req: Request, res: Response) {
  try {
    const fleets = await db.fleet.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(fleets);
  } catch (error) {
    console.log(error);
  }
}

export async function getBriefFleets(req: Request, res: Response) {
  try {
    const fleets = await db.fleet.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        plateNo: true,
      }
    });
    return res.status(200).json(fleets);
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
