import { createConnection } from 'typeorm';
import { Dimension } from './models/entities/Dimension';
import { Units } from './models/entities/Units';

export const connectDB = async (config: any) => {
  await createConnection(config).then(async connection => {
    console.log("Connection was made.")

    let unit = new Units();
    unit.conversionFormula = "conversion";
    unit.name = "some name";

    await Units.save([unit]);

    console.log("Must have added the unit");

    let dimension = new Dimension();
    dimension.name = "Temperatuer";
    dimension.units = [unit];

    await Dimension.save([dimension]);

    console.log("Must have added the dimension");

    //Methods for Entity Manager: https://github.com/typeorm/typeorm/blob/master/docs/entity-manager-api.md
    // This is using connection.manager.{methodName}

    /** 
     * Order of element creation matters immensely. If it is done out of order, elements will not be
     * properly created, given how various foreign keys are set up. 
     * Authors, Publicationtype, and Publisher must be created before Publications
     * Composition must be created before the linked Material 
     * Datasetdatatype, Publications, Category, Subcategory, and Composition must be created before Dataset
     * Dataset, Representations, and Units must be created before Datapoints
     */

  })
};