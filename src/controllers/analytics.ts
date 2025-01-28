import { db } from "@/db/db";
import { ContactProps, TypedRequestBody } from "@/types/types";
import { Request, Response } from "express";


// I can also just get a count of all users by removing the role condition
// this is to ensure I can display 4 cards on the dashboard
// I also need to add a query to get total sales once sales report have been added
export async function getAnalyticsByCompanyId(req: Request, res: Response) {
  try {
    const {companyId} = req.params;
    const attendants = await db.user.count({
      where: {
        companyId,
        role: "ATTENDANT"
      },
    });
    const managers = await db.user.count({
      where: {
        companyId,
        role: "MANAGER"
      },
    });
    const drivers = await db.user.count({
      where: {
        companyId,
        role: "DRIVER"
      },
    });
    const stations = await db.station.count({
      where: {
        companyId,
      },
    });
    const result = [
      {
      title: "Attendants",
      count: attendants
      },
      {
        title: "Managers",
        count: managers
      },
      {
        title: "Drivers",
        count: drivers
      },
      {
        title: "Stations",
        count: stations
      }
  ];
    return res.status(200).json(result);
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
