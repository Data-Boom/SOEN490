export { }
// import { IGraphDatasetState, newGraphDatasetState } from '../../../Models/Graph/IGraphDatasetModel'
// import React, { useState } from 'react'

// import { DatasetList } from '../DatasetList.tsx/DatasetList'
// import { ExportDatasetsButton } from './ExportDatasetsButton'
// import { Grid } from '@material-ui/core'
// import { IDatasetModel } from '../../../Models/Datasets/IDatasetModel'
// import { IGraphStateModel } from '../../../Models/Graph/IGraphStateModel'
// import { SearchViewModal } from '../../Search/SearchViewModal'
// import { toDatasetRows } from '../GraphFunctions'

// //todo either refactor or delete this file
// interface IProps {
//   datasetStates: IGraphDatasetState[],
//   onDatasetsStateChange: (datasetStates: IGraphDatasetState[], completeDatasets: IDatasetModel[]) => void,
// }

// export const GraphStateControl = (props: IProps) => {
//   const { datasetStates, onDatasetsStateChange } = { ...props }
//   const [completeDatasets, setCompleteDatasets] = useState<IDatasetModel[]>([])

//   const onHideDatasetSwitch = (datasetId: number) => {
//     const graphDatasetsCopy = [...graphState.datasets]
//     const indexToHide = graphState.datasets.findIndex(dataset => dataset.id == datasetId)
//     graphDatasetsCopy[indexToHide].isHidden = !graphDatasetsCopy[indexToHide].isHidden
//     onGraphStateChange({ ...graphState, datasets: graphDatasetsCopy }, completeDatasets)
//   }

//   const handleDatasetRemoved = (datasetId: number) => {
//     const filteredDatasets = completeDatasets.filter(dataset => dataset.id !== datasetId)
//     handleCompleteDatasetsUpdated(filteredDatasets)
//   }

//   const handleDatasetsAdded = (selectedDatasets: IDatasetModel[]) => {
//     const notYetSelectedDatasets: IDatasetModel[] = selectedDatasets.filter(selectedDataset => !isInStateAlready(selectedDataset))

//     const mergedDatasets: IDatasetModel[] = [...completeDatasets]
//     notYetSelectedDatasets.forEach(dataset => {
//       mergedDatasets.push(dataset)
//     })

//     handleCompleteDatasetsUpdated(mergedDatasets)
//   }

//   const handleCompleteDatasetsUpdated = (datasets: IDatasetModel[]) => {
//     setCompleteDatasets(datasets)
//     const newGraphState = getUpdatedGraphState(datasets)
//     onGraphStateChange(newGraphState, datasets)
//   }

//   const getUpdatedGraphState = (datasets: IDatasetModel[]): IGraphStateModel => {
//     const graphDatasetStates = []
//     //todo ensure all new datasets are in the state
//     datasets.forEach(dataset => {
//       const graphDatasetIndex = graphState.datasets.findIndex(datasetState => datasetState.id == dataset.id)
//       if (graphDatasetIndex == -1) {
//         graphDatasetStates.push({ ...newGraphDatasetState, id: dataset.id })
//       }
//       else {
//         graphDatasetStates.push({ ...graphState.datasets[graphDatasetIndex], id: dataset.id })
//       }
//     })
//     return { ...graphState, datasets: graphDatasetStates }
//   }

//   const isInStateAlready = (dataset: IDatasetModel) => {
//     return completeDatasets.findIndex(existingDataset => existingDataset.id === dataset.id) != -1
//   }

//   return (
//     <>
//       <Grid container spacing={3}>
//         <Grid item>
//           <SearchViewModal onDatasetsSelected={handleDatasetsAdded} />
//         </Grid>
//         {completeDatasets && completeDatasets[0] ?
//           <Grid item>
//             <ExportDatasetsButton datasets={completeDatasets} />
//           </Grid> : null
//         }
//       </Grid>
//       <DatasetList
//         datasets={toDatasetRows(completeDatasets, graphState.datasets)}
//         onRemoveDatasetClick={handleDatasetRemoved}
//         onHideDatasetSwitch={onHideDatasetSwitch}
//       />
//     </>
//   )
// }