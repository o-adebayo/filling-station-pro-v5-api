import { db } from "@/db/db";
import { generateCompanyCode } from "@/utils/generateCompanyCode";
import { generateSlug } from "@/utils/generateSlug";
import { Request, Response } from "express";

export async function createCompany(req: Request, res: Response) {
  const { name, logo } = req.body;
  const slug = generateSlug(name);
  const companyCode = generateCompanyCode(name);
  try {
    // Check if the company already exists
    const existingCompany = await db.company.findUnique({
      where: {
        slug,
      },
    });
    const existingCompanyCode = await db.company.findUnique({
      where: {
        companyCode,
      },
    });
    if (existingCompany) {
      return res.status(409).json({
        data: null,
        error: "Company with this name already exists",
      });
    }
    if (existingCompanyCode) {
      return res.status(409).json({
        data: null,
        error: "Company with this code already exists",
      });
    }
    const newCompany = await db.company.create({
      data: {
        name,
        slug,
        logo,
        companyCode,
      },
    });
    console.log(
      `Company created successfully: ${newCompany.name} (${newCompany.id})`
    );
    return res.status(201).json({
      data: newCompany,
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
export async function getCompanies(req: Request, res: Response) {
  try {
    const companies = await db.company.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(companies);
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
