// server/api/cashIn.js

// TODO: Import necessary modules and utilities
// import { db } from '../utils/db'
// import { validateCashInData } from '../utils/validators'

/* export default defineEventHandler(async (event) => {
  const method = event.method;
  const id = event.context.params?.id;

// GET /api/cash-in
 if (method === "GET" && !id) {
    // TODO: Implement logic to retrieve all cash-in entries
    return await db.getAllCashIn()
  }

// GET /api/cash-in/:id
 if (method === "GET" && id) {
    // TODO: Implement logic to retrieve a specific cash-in entry
    return await db.getCashInById(id)
  }

// POST /api/cash-in
if (method === "POST") {
    const body = await readBody(event);
    // TODO: Implement validation
     if (!validateCashInData(body)) {
       throw createError({
         statusCode: 400,
         statusMessage: 'Invalid cash-in data'
       })
     }
    // TODO: Implement logic to create a new cash-in entry
    return await db.createCashIn(body)
  }

// PUT /api/cash-in/:id
if (method === "PUT" && id) {
    const body = await readBody(event);
    // TODO: Implement validation
    // TODO: Implement logic to update a cash-in entry
    // return await db.updateCashIn(id, body)
  }

// DELETE /api/cash-in/:id
if (method === "DELETE" && id) {
    // TODO: Implement logic to delete a cash-in entry
    // await db.deleteCashIn(id)
    // return { message: 'Cash-in entry deleted successfully' }
  }

throw createError({
  statusCode: 405,
  statusMessage: "Method Not Allowed",
});
}); */
