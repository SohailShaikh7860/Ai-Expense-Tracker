import {describe, test, jest} from "@jest/globals";

const mockCreateExpense = jest.fn();
const mockGetExpense = jest.fn();

jest.unstable_mockModule("../controllers/expense.controllers.js", () => ({
  createExpense: mockCreateExpense,
  getExpense: mockGetExpense,
}));

jest.unstable_mockModule("../middleware/auth.js", () => ({
  authToken: jest.fn((req, res, next) => next()),
}));

describe("Expense Routes", () => {
    let request, response;
    beforeEach(() => {})
        request = {
            headers: {},
            query: {},
            body: {},
        };
        response = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };
        jest.clearAllMocks();

    describe("POST /expense/create-expense", () => {
        test("should successfully create an expense with valid data", async () => {
            request.user = {id: "user123"};
            request.body = {
                amount: 1500,
                category: "Fuel",
                date: "2024-01-15",
                description: "Fuel for truck"
            };
            mockCreateExpense.mockImplementation((req, res) => {
                res.status(201).json({
                    success: true,
                    message: "Expense created successfully",
                });
            });

            const {createExpense} = await import("../controllers/expense.controllers.js");
            await createExpense(request, response);
            expect(mockCreateExpense).toHaveBeenCalledWith(request, response);
            expect(response.status).toHaveBeenCalledWith(201);
            expect(response.json).toHaveBeenCalledWith({success: true, message: "Expense created successfully"});
            expect(mockCreateExpense).toHaveBeenCalledTimes(1);
        });
    });

    describe("GET /expense/get-expense", () => {
        test("should successfully retrieve expense data", async () => {
            request.user = {id: "user123"};
            mockGetExpense.mockImplementation((req, res) => {
                res.status(200).json({
                    success: true,
                    message: "Expense fetched successfully",
                });
            });
            const {getExpense} = await import("../controllers/expense.controllers.js");
            await getExpense(request, response);
            expect(mockGetExpense).toHaveBeenCalledWith(request, response);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({success: true, message: "Expense fetched successfully"});
            expect(mockGetExpense).toHaveBeenCalledTimes(1);
        });
    });
    });
