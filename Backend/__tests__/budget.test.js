import {describe, test, jest} from "@jest/globals";

const mockCreateBudget = jest.fn();
const mockGetBudget = jest.fn();

jest.unstable_mockModule("../controllers/budget.controllers.js", () => ({
  createBudget: mockCreateBudget,
  getBudget: mockGetBudget,
}));

jest.unstable_mockModule("../middleware/auth.js", () => ({
  authToken: jest.fn((req, res, next) => next()),
}));

describe("Budget Routes", () => {
    let request, response;
    beforeEach(() => {
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
    });

    describe("POST /budget/create-budget", () => {
        test("should successfully create a budget with valid data", async () => {
            request.user = {id: "user123"};
            request.body = {
                category: "Fuel",
                limit: 5000,
                startDate: "2024-01-01",
                endDate: "2024-01-31"
            };
              mockCreateBudget.mockImplementation((req, res) => {
                res.status(201).json({
                    success: true,
                    message: "Budget created successfully",
                }); 
            });

            const {createBudget} = await import("../controllers/budget.controllers.js");
            await createBudget(request, response);
            expect(mockCreateBudget).toHaveBeenCalledWith(request, response);
            expect(response.status).toHaveBeenCalledWith(201);
            expect(response.json).toHaveBeenCalledWith({success: true, message: "Budget created successfully"});
            expect(mockCreateBudget).toHaveBeenCalledTimes(1);
            });
        })

    describe("GET /budget/get-budget", () => {
        test("should successfully retrieve budget data", async () => {
            request.user = {id: "user123"};
            mockGetBudget.mockImplementation((req, res) => {
                res.status(200).json({
                    success: true,
                    budget: {
                        category: "Fuel",
                        limit: 5000,
                        startDate: "2024-01-01",
                        endDate: "2024-01-31"
                    }
                });
            });
            const {getBudget} = await import("../controllers/budget.controllers.js");
            await getBudget(request, response);
            expect(mockGetBudget).toHaveBeenCalledWith(request, response);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({
                success: true,
                budget: {
                    category: "Fuel",
                    limit: 5000,
                    startDate: "2024-01-01",
                    endDate: "2024-01-31"
                }
            });
            expect(mockGetBudget).toHaveBeenCalledTimes(1);
        })
    })
    });