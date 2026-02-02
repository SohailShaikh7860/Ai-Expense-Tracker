import express from "express";
import { authToken } from "../middleware/auth.js";
import { generateAllSimpleReports, generateAllTransportReports } from "../controllers/AiReportController.js";
import { transport } from "../config/nodeMailer.js";

const router = express.Router();

// Middleware to verify cron secret key
const verifyCronSecret = (req, res, next) => {
    const cronSecret = req.headers['x-cron-secret'] || req.query.secret;
    
    if (cronSecret !== process.env.CRON_SECRET) {
        return res.status(403).json({ 
            success: false, 
            message: 'Unauthorized: Invalid cron secret' 
        });
    }
    next();
};

router.post('/cron/simple-reports', verifyCronSecret, async (req, res) => {
    try {
        console.log('📧 Cron triggered: Generating simple expense reports...');
        
        res.json({ 
            success: true, 
            message: 'Simple reports generation started'
        });
        
        generateAllSimpleReports()
            .then(result => {
                console.log(`✅ Simple reports completed: ${result.success} sent, ${result.failed} failed`);
            })
            .catch(error => {
                console.error('❌ Simple reports error:', error.message);
            });
            
    } catch (error) {
        console.error('Cron error:', error);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
});

router.post('/cron/transport-reports', verifyCronSecret, async (req, res) => {
    try {
        console.log('🚛 Cron triggered: Generating transport reports...');
        
        res.json({ 
            success: true, 
            message: 'Transport reports generation started'
        });
        
        generateAllTransportReports()
            .then(result => {
                console.log(`✅ Transport reports completed: ${result.success} sent, ${result.failed} failed`);
            })
            .catch(error => {
                console.error('❌ Transport reports error:', error.message);
            });
            
    } catch (error) {
        console.error('Cron error:', error);
        if (!res.headersSent) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
});

router.get('/test-smtp', async (req, res) => {
    try {
        await transport.verify();
        res.json({ success: true, message: 'SMTP connection verified!' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Protected admin routes
router.use(authToken);

router.post('/generate-all-simple', generateAllSimpleReports);

router.post('/test-transport', generateAllTransportReports);

export default router;
