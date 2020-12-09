import { retrieveData } from '../services/getDataService';


export const createRequestForData = async (req, res) => {
    try {
        const retrieveDataObject = new retrieveData();
        let arrayOfData = await retrieveDataObject.getArrayOfDatasets(req)
        return res.status(200).send(arrayOfData);
    } catch (err) {
        res.status(500).send(err);
    }
}
