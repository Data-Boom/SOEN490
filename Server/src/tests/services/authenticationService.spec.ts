import { createConnection, getConnectionManager, getConnection } from 'typeorm';
import { AuthenticationService } from '../../services/authenticationService'


describe('Authentication tests', () => {
    let mockRequest;
    let mockResponse;
    let next;
    let authenticationService: AuthenticationService;

    beforeEach(async () => {

        try {
            await createConnection();
        } catch (error) {
            // If AlreadyHasActiveConnectionError occurs, return already existent connection
            if (error.name === "AlreadyHasActiveConnectionError") {
                return getConnectionManager().get();
            }
        }
        jest.setTimeout(60000)
        authenticationService = new AuthenticationService();
        mockRequest = {};
        mockResponse = {
            status: jest.fn(() => mockResponse),
            json: jest.fn()
        }
        next = {};
    });

    afterEach(async () => {
        await getConnection().close();
    });

    test('Test hashing function', async () => {
        let regexp: RegExp = /$argon2i$v/;
        let userPassword: string = "123";
        let passwordHash: string = await authenticationService.hashPassword(userPassword)
        expect(regexp.test(passwordHash));
    });

    test('Test Load User Details Function', async () => {
        const expectedResponse = {
            "account_email": "j@kj.com",
            "account_firstName": "Ace",
            "account_lastName": "FireFist",
            "account_orcID": "123456789876543",
            "account_organizationName": "Mugiwara",
            "account_permissions": 1
        }
        let userEmail: string = "j@kj.com";
        let res: any = await authenticationService.loadUserDetails(userEmail);
        expect(res.statusCode).toBe(200);
        expect(res.message).toStrictEqual(JSON.stringify(expectedResponse));
    });

})