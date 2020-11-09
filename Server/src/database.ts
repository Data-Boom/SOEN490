import { createConnection, getManager } from 'typeorm';
import { getRepository } from "typeorm";
import { Authors } from './models/entities/Authors';
import { Publications } from './models/entities/Publications';
import { Publisher } from './models/entities/Publisher';
import { Publicationtype } from './models/entities/Publicationtype';
import { Composition } from './models/entities/Composition';
import { Datasetdatatype } from './models/entities/Datasetdatatype';
import { Dataset } from './models/entities/Dataset';
import { Category } from './models/entities/Category';
import { Subcategory } from './models/entities/Subcategory';
import { Datapoints } from './models/entities/Datapoints';
import { Units } from './models/entities/Units';
import { Material } from './models/entities/Material';
import { Datapointcomments } from './models/entities/Datapointcomments';
import { Representations } from './models/entities/Representations';

export const connectDB = async () => {
  await createConnection().then(async connection => {
    console.log("Connection was made.")

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