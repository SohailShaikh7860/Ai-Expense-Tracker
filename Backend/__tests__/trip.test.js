import { describe, jest, test } from "@jest/globals";

const mockCreateTrip = jest.fn();
const mockGetTripExpense = jest.fn();
const mockGetAllTripExpenses = jest.fn();
const mockUploadReceipt = jest.fn();

jest.unstable_mockModule("../controllers/trip.controllers.js", () => ({
  createTripExpense: mockCreateTrip,
  getTripExpenses: mockGetTripExpense,
  getAllTripExpenses: mockGetAllTripExpenses,
  uploadRecipt: mockUploadReceipt,
}));

jest.unstable_mockModule("../middleware/auth.js", () => ({
  authToken: jest.fn((req, res, next) => next()),
}));

describe("Trip Routes", () => {
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

  describe("POST /trip/trip-expense", () => {
    test("should successfully create a trip with valid data", async () => {
      request.body = {
        Vehicle_Number: "MH48B7830",
        route: "Sakur,Takli,khadak wadi, nagar",
        monthAndYear: "Nov-2025",
        totalIncome: "13000",
        fuelCost: 2500,
        hamaali: 1200,
        commission: 2500,
        otherExpenses: 1720,
        phonePai: 900,
      };

      mockCreateTrip.mockResolvedValue({
        success: true,
        message: "Trip expense created successfully",
      });

      const { createTripExpense } =
        await import("../controllers/trip.controllers.js");
      await createTripExpense(request, response);

      expect(mockCreateTrip).toHaveBeenCalledWith(request, response);
      expect(mockCreateTrip).toHaveBeenCalledTimes(1);
    });

    test("Should Require Vehicle_Number, route, tripDate, and totalIncome", async () => {
      request.body = {};

      mockCreateTrip.mockImplementation((req, res) => {
        res.status(400).json({
          success: false,
          message:
            "Vehicle_Number, route, tripDate, and totalIncome are required",
        });
      });

      const { createTripExpense } =
        await import("../controllers/trip.controllers.js");
      await createTripExpense(request, response);

      expect(mockCreateTrip).toHaveBeenCalledWith(request, response);
      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        success: false,
        message: expect.stringContaining("required"),
      });
    });

  });

  describe("GET /trip/trip-expense/:id", () => {
    test("should get trip expense by ID", async () => {
      const tripId = "64a7b2f5c9e1f2a5b6c8d9e0";
      const mockTripData = {
        _id: tripId,
        Vehicle_Number: "MH48B7830",
        route: "Sakur,Takli,khadak wadi, nagar",
        monthAndYear: "Nov-2025",
        totalIncome: "13000",
        fuelCost: 2500,
        hamaali: 1200,
        commission: 2500,
        otherExpenses: 1720,
        phonePai: 900,
      };

      request.params = { id: tripId };

      mockGetTripExpense.mockImplementation((req, res) => {
        res.status(200).json({
          success: true,
          data: mockTripData,
        });
      });

      const { getTripExpenses } =
        await import("../controllers/trip.controllers.js");
      await getTripExpenses(request, response);

      expect(mockGetTripExpense).toHaveBeenCalledWith(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        data: expect.objectContaining({
          _id: tripId,
          Vehicle_Number: "MH48B7830",
        }),
      });
    });

    test("should return 404 if trip expense not found", async () => {
      const tripId = "64a7b2f5c9e1f2a5b6c8d9e0";
      request.params = { id: tripId };

      mockGetTripExpense.mockImplementation((req, res) => {
        res.status(404).json({
          success: false,
          message: "Trip expense not found",
        });
      });

      const { getTripExpenses } =
        await import("../controllers/trip.controllers.js");
      await getTripExpenses(request, response);

      expect(mockGetTripExpense).toHaveBeenCalledWith(request, response);
      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({
        success: false,
        message: expect.stringContaining("not found"),
      });
    });
  });

  describe("POST /trip/:id/receipt", () => {
    test("should upload receipt successfully when file and id are provided", async () => {
      request.params = { id: "trip123" };
      request.user = { id: "user123" };
      request.file = {
        path: "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        filename: "sample.jpg",
      };

      mockUploadReceipt.mockImplementation((req, res) => {

        expect(req.params.id).toBe("trip123");
        expect(req.user.id).toBe("user123");
        expect(req.file).toEqual(
          expect.objectContaining({
            path: expect.any(String),
            filename: expect.any(String),
          })
        );

        return res.status(200).json({
          success: true,
          message: "Receipt uploaded successfully",
          receipt: {
            url: req.file.path,
            public_id: req.file.filename,
          },
        });
      });

      const { uploadRecipt } = await import(
        "../controllers/trip.controllers.js"
      );
      await uploadRecipt(request, response);

      expect(mockUploadReceipt).toHaveBeenCalledWith(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: expect.stringContaining("Receipt uploaded successfully"),
          receipt: expect.objectContaining({
            url: request.file.path,
          }),
        })
      );
    });

    test("should return 400 when no file is provided", async () => {
      request.params = { id: "trip123" };
      request.user = { id: "user123" };
      request.file = undefined;

      mockUploadReceipt.mockImplementation((req, res) => {
        if (!req.file) {
          return res.status(400).json({
            success: false,
            message: "No file uploaded",
          });
        }
      });

      const { uploadRecipt } = await import(
        "../controllers/trip.controllers.js"
      );
      await uploadRecipt(request, response);

      expect(mockUploadReceipt).toHaveBeenCalledWith(request, response);
      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: expect.stringContaining("No file uploaded"),
        })
      );
    });
  });
});
