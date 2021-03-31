import { IUserAccountModel } from "../../Models/Authentication/IUserAccountModel"

export type PermissionLevel = number | 'anyone'

export const userCanView = (user: IUserAccountModel, permissionLevel: PermissionLevel) => {
  return permissionLevel == 'anyone' || user && user.account_permissions >= permissionLevel
}

export interface ProtectedRouteModel {
  route: string,
  permission: PermissionLevel
}

interface Routes {
  graphRoute: ProtectedRouteModel,
  newGraphRoute: ProtectedRouteModel,
  homeRoute: ProtectedRouteModel,
  searchRoute: ProtectedRouteModel,
  newDatasetRoute: ProtectedRouteModel,
  datasetRoute: ProtectedRouteModel,
  aboutRoute: ProtectedRouteModel,
  profileRoute: ProtectedRouteModel,
  adminReviewRoute: ProtectedRouteModel,
  userReviewRoute: ProtectedRouteModel,
  loginRoute: ProtectedRouteModel,
  signUpRoute: ProtectedRouteModel,
  forgotPasswordRoute: ProtectedRouteModel,
  cellSizeAnalysisRoute: ProtectedRouteModel,
  resetPasswordRoute: ProtectedRouteModel
}

export const routes: Routes = {
  graphRoute: { route: '/graph/:graphStateId?', permission: 'anyone' },
  newGraphRoute: { route: '/graph/', permission: 'anyone' },
  homeRoute: { route: '/', permission: 'anyone' },
  searchRoute: { route: '/search', permission: 'anyone' },
  newDatasetRoute: { route: '/addDataset', permission: 0 },
  datasetRoute: { route: '/dataset/:datasetID?', permission: 'anyone' },
  aboutRoute: { route: '/about', permission: 'anyone' },
  profileRoute: { route: '/profile', permission: 0 },
  adminReviewRoute: { route: '/adminReview', permission: 1 },
  userReviewRoute: { route: '/userReview', permission: 0 },
  loginRoute: { route: '/log-in', permission: 'anyone' },
  signUpRoute: { route: '/sign-up', permission: 'anyone' },
  forgotPasswordRoute: { route: '/api/v1/forgotPassword', permission: 'anyone' },
  cellSizeAnalysisRoute: { route: '/cellSizeAnalysis', permission: 'anyone' },
  resetPasswordRoute: { route: '/api/v1/resetPassword/:resetToken?', permission: 'anyone' }
}