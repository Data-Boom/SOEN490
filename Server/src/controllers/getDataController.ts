const getDataService = require('../services/getDataService');


const createRequestForData = async (req, res) => {
    try {
        const arrayOfData = await getDataService.retrieveData();
        return res.status(200).send(arrayOfData);
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    createRequestForData
}