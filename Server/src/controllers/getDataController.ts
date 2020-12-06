import { retrieveData } from '../services/getDataService';


export const createRequestForData = async (req, res) => {
    try {
        const arrayOfData = await retrieveData(req);
        return res.status(200).send(arrayOfData);
    } catch (err) {
        res.status(500).send(err);
    }
}
