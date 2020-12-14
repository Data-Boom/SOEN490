import { IAuthor } from "../../Models/Datasets/IDatasetModel"

interface IProps {
  authors: IAuthor[],
  onRemoveAuthorClick: (index: number) => void,
  onAddAuthorClick: () => void
}

export const AuthorsList = (props: IProps) => {
  const renderAuthorRows = () => {
    return props && props.authors && props.authors.map(author => {
      return (<AuthorRow dataset={dataset} key={dataset.id} onRemoveDatasetClick={props.onRemoveDatasetClick} />)
    })
  }

  return (
    <>
      <Grid item container direction='column' spacing={3}>
        <Box >
          {renderDatasetRows()}
        </Box>
      </Grid>
    </>
  )
}