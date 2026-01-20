import {describe, expect, jest, test} from "@jest/globals";

const mockCreateOrder = jest.fn();
const mockVerifyPayment = jest.fn();

jest.unstable_mockModule("../controllers/razorPay.controllers.js", () => ({
  createOrder: mockCreateOrder,
  verifyPayment: mockVerifyPayment,
}));

jest.unstable_mockModule("../middleware/auth.js", () => ({
  authToken: jest.fn((req, res, next) => next()),
}));

describe("Razorpay Routes", () => {
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

    describe("POST /razorpay/create-order", () => {
        test("should successfully create an order with valid data", async () => {
            request.user = {id: "user123"};
            request.body = {
                supportName: "John Doe",
                supportMsg: "Keep up the good work!"
            };
            mockCreateOrder.mockImplementation((req, res) => {
                res.status(201).json({
                    success: true,
                    message: "Order created successfully",
                });
            });

            const {createOrder} = await import("../controllers/razorPay.controllers.js");
            await createOrder(request, response);

            expect(mockCreateOrder).toHaveBeenCalledWith(request, response);
            expect(response.status).toHaveBeenCalledWith(201);
            expect(response.json).toHaveBeenCalledWith({success: true, message: "Order created successfully"});
            expect(mockCreateOrder).toHaveBeenCalledTimes(1);
        })
    })
      
    describe("POST /razorpay/verify-payment", () => {
        test("should successfully verify payment with valid data", async () => {
            request.body = {
                razorpay_order_id: "order_123",
                razorpay_payment_id: "payment_123", 
            }

            mockVerifyPayment.mockImplementation((req, res) => {
                res.status(200).json({
                    success: true,
                    message: "Payment verified successfully",
                });
            });
            const {verifyPayment} = await import("../controllers/razorPay.controllers.js");
            await verifyPayment(request, response);
            expect(mockVerifyPayment).toHaveBeenCalledWith(request, response);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({success: true, message: "Payment verified successfully"});
            expect(mockVerifyPayment).toHaveBeenCalledTimes(1);
        })
    })
})