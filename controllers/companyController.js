const Company  = require('../models/companyModel');
console.log(Company);

const createCompany = async (req, res) => {
  try {
    const companyData = req.body;
    const newCompany = await Company.create(companyData);
    res.status(201).json(newCompany);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create company.' });
  }
};

const getAllCompanies = async (req, res) => {
  try {
    console.log(Company);
    const companies = await Company.findAll();
    res.status(200).json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch companies.' });
  }
};

const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found.' });
    }
    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch company.' });
  }
};

const updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found.' });
    }
    await company.update(updatedData);
    res.status(200).json(company);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update company.' });
  }
};

const deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findByPk(id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found.' });
    }
    await company.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete company.' });
  }
};


module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
