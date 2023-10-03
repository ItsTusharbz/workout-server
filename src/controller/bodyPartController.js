const HttpError = require("../model/httpError");
const { exportData } = require("../utils/util");
const { con } = require("../utils/db");
const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient();

const getBodyPartList = async (req, res, next) => {
  const bodyParts = await client.bodyParts.findMany();
  res.send(exportData(bodyParts));
};


exports.getBodyPartList = getBodyPartList;
