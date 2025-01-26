import { db } from "@/db/db";
import { ContactProps, StateCreateProps, StationCreateProps, TypedRequestBody } from "@/types/types";
import { generateSlug } from "@/utils/generateSlug";
import { Request, Response } from "express";

export async function createState(req: TypedRequestBody<StateCreateProps>, res: Response) {
  const data = req.body;
  const slug = generateSlug(data.name);
  data.slug = slug;
  
  try {
    // Check if the state already exists
    const existingState = await db.state.findUnique({
      where: {
        slug,
      },
    });
    if (existingState) {
      return res.status(409).json({
        data: null,
        error: "State already exists",
      });
    }
    const newState = await db.state.create({
      data
    });
    console.log(
      `State created successfully: ${newState.name} (${newState.id})`
    );
    return res.status(201).json({
      data: newState,
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

export async function getStates(req: Request, res: Response) {
  try {
    const states = await db.state.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        stations: {
          include: {
            _count: {
              select: { 
                //users: true,
                attendants: true,
                managers: true,
              }
            }
          }
        },
        _count: {
          select: { 
            //users: true, 
            attendants: true,
            managers: true,
          }
        }
      },
    });
    return res.status(200).json(states);
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Failed to fetch states"});
  }
}

export async function getBriefStates(req: Request, res: Response) {
  try {
    const states = await db.state.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true
      },
    });
    return res.status(200).json(states);
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Failed to fetch states"});
  }
}

export async function createStation(req: TypedRequestBody<StationCreateProps>, res: Response) {
  const data = req.body;
  const slug = generateSlug(data.name);
  data.slug = slug;
  
  try {
    // Check if the station already exists
    const existingStation = await db.station.findUnique({
      where: {
        slug,
      },
    });
    if (existingStation) {
      return res.status(409).json({
        data: null,
        error: "Filling Station already exists",
      });
    }

    // Convert string numbers to integers
    // const processedData = {
    //   ...data,
    //   slug,
    //   pmsDippingTanks: +data.pmsDippingTanks,
    //   pmsPumps: +data.pmsPumps,
    //   agoDippingTanks: +data.agoDippingTanks,
    //   agoPumps: +data.agoPumps,
    //   dpkDippingTanks: +data.dpkDippingTanks,
    //   dpkPumps: +data.dpkPumps,
    // };

    const newStation = await db.station.create({
      //data: processedData
      data
    });
    console.log(
      `Filling Station created successfully: ${newStation.name} (${newStation.id})`
    );
    return res.status(201).json({
      data: newStation,
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

export async function getStations(req: Request, res: Response) {
  try {
    const stations = await db.station.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(stations);
  } catch (error) {
    console.log(error);
  }
}

export async function getBriefStations(req: Request, res: Response) {
  try {
    const stations = await db.station.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
      },
    });
    return res.status(200).json(stations);
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
