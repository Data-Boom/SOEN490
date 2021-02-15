import { NotFound } from "@tsed/exceptions";
import { Connection, getConnection } from "typeorm";
import { Accounts, selectAccountIdFromEmailQuery } from "./entities/Accounts";



export class AdminManagementModel {
    private connection: Connection;
    constructor() {
        this.connection = getConnection();
    }

    async fetchAccountIdFromEmail(userEmail: string) {
        let userRawData = await selectAccountIdFromEmailQuery(this.connection, userEmail)
        if (!userRawData)
            throw new NotFound("No such user exists")
        else
            return userRawData.id
    }

    async fetchAllAdminEmails(): Promise<any[]> {
        let allAdmins = await this.connection.createQueryBuilder(Accounts, 'account')
            .select('account.email', 'email')
            .addSelect('account.firstName', 'firstName')
            .addSelect('account.lastName', 'lastName')
            .where('admin = :admin', { admin: 1 })
            .getRawMany();
        return allAdmins
    }

    private async addAdminPermissionsQuery(id: number) {
        await this.connection.createQueryBuilder()
            .update(Accounts)
            .set({ admin: 1 })
            .where('id = :id', { id: id })
            .execute()
    }

    async addAdminPermissions(userEmail: string) {
        try {
            let userID = await this.fetchAccountIdFromEmail(userEmail)
            await this.addAdminPermissionsQuery(userID)
            return "User successfully given admin permissions"
        } catch (error) {
            if (error instanceof NotFound) {
                throw new NotFound(error.message)
            }
            else {
                throw new Error("Something went wrong when adding admin permissions. Try again later")
            }
        }
    }

    private async removeAdminPermissionsQuery(id: number) {
        await this.connection.createQueryBuilder()
            .update(Accounts)
            .set({ admin: 0 })
            .where('id = :id', { id: id })
            .execute()
    }

    async removeAdminPermissions(userEmail: string) {
        try {
            let userID = await this.fetchAccountIdFromEmail(userEmail)
            await this.removeAdminPermissionsQuery(userID)
            return "Admin permissions successfully revoked"
        } catch (error) {
            if (error instanceof NotFound) {
                throw new NotFound(error.message)
            }
            else {
                throw new Error("Something went wrong when removing admin permissions. Try again later")
            }
        }
    }
}