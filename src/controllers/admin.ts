import { db } from "@/db/db";
import { ContactProps, TypedRequestBody } from "@/types/types";
import { generateSlug } from "@/utils/generateSlug";
import { Request, Response } from "express";

export async function createContact(req: TypedRequestBody<ContactProps>, res: Response) {
  const data = req.body;
  const { email, company } = data;
  
  try {
    // Check if the contact already exists
    const existingEmail = await db.contact.findUnique({
      where: {
        email,
      },
    });
    const existingCompany = await db.contact.findUnique({
      where: {
        company,
      },
    });
    if (existingEmail || existingCompany) {
      return res.status(409).json({
        data: null,
        error: "We have already received a request from this email or company",
      });
    }
    const newContact = await db.contact.create({
      data
    });
    console.log(
      `Contact created successfully: ${newContact.company} (${newContact.id})`
    );
    return res.status(201).json({
      data: newContact,
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
export async function getContacts(req: Request, res: Response) {
  try {
    const contacts = await db.contact.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json(contacts);
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
