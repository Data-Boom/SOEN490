import { Accounts } from './entities/Accounts'
import { IFetchUserDetail } from '../genericInterfaces/AuthenticationInterfaces';
import { ISignUpInformation } from '../genericInterfaces/AuthenticationInterfaces'
import { getConnection } from 'typeorm';

/**
 * This model contains all methods required for obtaining data from the Accounts
 * table inside the database
 */
export class AuthenticationModel {

  /**
   * Method responsible for completing signup process. Extracting user information
   * and sets the entity values
   * @param signUpInfo - User Information from Frontend Request
   */
  static async insertSignUpInformation(signUpInfo: ISignUpInformation) {

    let connection = getConnection();

    let signUpInformation = new Accounts();
    signUpInformation.id;
    signUpInformation.email = signUpInfo.email;
    signUpInformation.password = signUpInfo.password;
    signUpInformation.firstName = signUpInfo.firstName;
    signUpInformation.lastName = signUpInfo.lastName;
    signUpInformation.orcID = signUpInfo.orcID
    //signUpInformation.dateOfBirth = signUpInfo.dateOfBirth;
    signUpInformation.organizationName = signUpInfo.organizationName;
    signUpInformation.admin = signUpInfo.isAdmin;
    await connection.manager.save(signUpInformation);
  }

  /**
   * Method to verify Email exists. Returns true or undefined
   * @param email - User Email
   */
  static async verifyIfEmailExists(email: string): Promise<boolean> {

    let connection = getConnection();
    let userEmail = await connection.getRepository(Accounts)
      .createQueryBuilder('accounts')
      .where('accounts.email = :email', { email: email })
      .getOne();

    return userEmail !== undefined;
  }

  /**
   * Method to update a user's password by its resetToken
   * @param resetToken - User's reset token
   */
  static async resetPasswordByToken(resetToken: string, passwordHash: string): Promise<boolean> {
    let connection = getConnection();

    await connection.manager
      .createQueryBuilder(Accounts, 'accounts')
      .update('accounts')
      .set({ password: passwordHash })
      .where('accounts.resetToken = :resetToken', { resetToken: resetToken })
      .execute();

    return true
  }

  /*
   * Method to verify if the user with the token exists.
   * @param email - User's email
   * @param token - User's token from URL
   */
  static async verifyResetToken(email: string, token: string): Promise<boolean> {
    let connection = getConnection();
    let userEmail = await connection
      .createQueryBuilder(Accounts, 'account')
      .select('account.email', 'account_email')
      .where('account.resetToken = :resetToken', { resetToken: token })
      .getOne()

    return userEmail.email === email;
  }

  /**
   * Method used to verify Password of corresponding input email
   * @param email - User Email
   */
  static async getPasswordHash(email: string): Promise<any> {

    let connection = getConnection();
    let userInfo = await connection.manager
      .createQueryBuilder(Accounts, 'account')
      .select('account.email', 'account_email')
      .addSelect('account.password', 'account_password')
      .where('account.email = :email', { email: email })
      .getRawMany();

    return userInfo[0].account_password;
  }

  /**
   * Method is used to verify Admin Status of the user - used for 
   * new data approval API
   * @param email - User Email
   */
  static async isAdminStatus(email: string): Promise<boolean> {

    let adminStatus: any;
    let connection = getConnection();
    adminStatus = await connection.manager
      .createQueryBuilder(Accounts, 'account')
      .select('account.admin', 'account_admin')
      .where('account.email = :email', { email: email })
      .getRawOne();
    console.log(adminStatus.account_admin);
    return adminStatus.account_admin;
  }

  /**
   * Parameters that are will be used to build user JWT Token
   * @param email - User Email
   */
  static async obtainJWTParams(email: string): Promise<any> {

    let connection = getConnection();
    let jwtParams: JSON[];
    jwtParams = await connection.manager
      .createQueryBuilder(Accounts, 'account')
      .select('account.id', 'account_id')
      .addSelect('account.email', 'account_email')
      .addSelect('account.firstName', 'account_firstName')
      .addSelect('account.admin', 'account_admin')
      .where('account.email = :email', { email: email })
      .getRawMany();
    return jwtParams[0];
  }

  /**
   * This will fetch email, firstname, lastname, organization and dob.
   * @param email - User Email
   */
  static async fetchUserDetails(userEmail: string): Promise<IFetchUserDetail> {

    let connection = getConnection();
    let userInfo = await connection.manager
      .createQueryBuilder(Accounts, 'account')
      .select('account.email', 'account_email')
      .addSelect('account.firstName', 'account_firstName')
      .addSelect('account.lastName', 'account_lastName')
      .addSelect('account.organizationName', 'account_organizationName')
      //.addSelect('account.dateOfBirth', 'account_dateOfBirth')
      .addSelect('account.orcID', 'account_orcID')
      .addSelect('account.admin', 'account_permissions')
      .where('account.email = :email', { email: userEmail })
      .getRawMany();
    return userInfo[0];
  }

  /**
   * This will change user's resetToken attribute
   * @param email - User's email
   * @param token - User's resetToken
   */
  static async resetPassword(email: string, token: string) {

    let connection = getConnection();

    await connection.manager
      .createQueryBuilder(Accounts, 'accounts')
      .update('accounts')
      .set({ resetToken: token })
      .where('accounts.email = :email', { email: email })
      .execute()

    return true;
  }

  static async deleteAccounts(email: string) {

    let connection = getConnection();
  }
  //for password
  static async updateUserPasswordDetail(email: string, passwordHash: string): Promise<boolean> {

    let connection = getConnection();

    await connection.manager
      .createQueryBuilder(Accounts, 'accounts')
      .update('accounts')
      .set({ password: passwordHash })
      .where('accounts.email = :emailRef', { emailRef: email })
      .execute()

    return true
  }
  //for organization Name
  static async updateUserOrganizationDetail(email: string, organizationName: string): Promise<boolean> {

    let connection = getConnection();

    await connection.manager
      .createQueryBuilder(Accounts, 'accounts')
      .update('accounts')
      .set({ organizationName: organizationName })
      .where('accounts.email = :emailRef', { emailRef: email })
      .execute()

    return true
  }
}