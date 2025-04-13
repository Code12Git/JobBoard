const router = require('express').Router();
const { applyController } = require('../controllers');
const { authenticator,verifyData } = require('../middleware');
const { applySchema } = require('../validation');

router.post('/:jobId',authenticator.verifyToken,verifyData(applySchema), applyController.create);
router.delete('/:id', authenticator.verifyTokenAndEmployerOrAdmin,applyController.deleteApplication);
router.get('/:id', authenticator.verifyTokenAndEmployerOrAdmin,applyController.getApplication);
router.get('/job/:id', authenticator.verifyTokenAndEmployerOrAdmin,applyController.getAllApplications);

module.exports = router;