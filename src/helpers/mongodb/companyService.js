import clientPromise from './connect';
import { ObjectId } from 'mongodb';

// Get all companies with pagination
export async function getAllCompanies(page = 1, limit = 20) {
  const client = await clientPromise;
  const db = client.db();

  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const totalCompanies = await db.collection('Companies').countDocuments();
  const companies = await db
    .collection('Companies')
    .find({})
    .skip(skip)
    .limit(limitNumber)
    .toArray();

  return { companies, totalCompanies };
}

// Create a new company
export async function createCompany(companyData) {
  const client = await clientPromise;
  const db = client.db();
  const result = await db.collection('Companies').insertOne(companyData);
  return result.ops?.[0] || result;
}

// Get a company by its ID
export async function getCompanyByID(id) {
  const client = await clientPromise;
  const db = client.db();
  const company = await db
    .collection('Companies')
    .findOne({ _id: new ObjectId(id) });
  return company;
}

// Update a company by its ID
export async function updateCompanyByID(id, updateData) {
  const client = await clientPromise;
  const db = client.db();
  const result = await db
    .collection('Companies')
    .updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
  return result.modifiedCount > 0;
}

// Delete a company by its ID
export async function deleteCompanyByID(id) {
  const client = await clientPromise;
  const db = client.db();
  const result = await db
    .collection('Companies')
    .deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}
