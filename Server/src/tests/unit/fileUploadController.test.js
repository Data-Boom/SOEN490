const fileUploadController = require("../../controllers/fileUploadController");
const dataUploadModel = require("../../models/DataUploadModel");

dataUploadModel.insertReferenceType = jest.fn();

//check if there is createRequest function
describe("fileUploadController.createRequest function", ()=>{
it("should have createRequest function",()=>{
    expect(typeof fileUploadController.createRequest).toBe("function");
})

it("should have callFileUploadService function",()=>{
    expect(typeof fileUploadController.callFileUploadService).toBe("function");
})

it("should call createRequest function",()=>{
    
    fileUploadController.createRequest();
    expect(dataUploadModel.insertReferenceType).toBeCalled();
})



});

