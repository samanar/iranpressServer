let express = require('express');
let router = express.Router();

const newsController = require('../controllers/news');
const moduleController = require('../controllers/module');
const moduleNewsController = require('../controllers/moduleNews');
const designController = require('../controllers/design');
const pageModuleController = require('../controllers/pageModules');
const mainRowsController = require('../controllers/mainRows');
const mainController = require('../controllers/main');
const columnModuleController = require('../controllers/columnModules');

//root
router.get('/', mainController.getMain);

//news
router.get('/news', newsController.getNews);
router.get('/news/details', newsController.getNewsDetails);

//modules
router.get('/modules', moduleController.getModules);
router.get('/module', moduleController.getModule);
router.post('/module/update', moduleController.updateModule);

//module news
router.get('/moduleNews', moduleNewsController.getModuleNews);
router.post('/moduleNews/deactivate', moduleNewsController.deactivateModuleNews);
router.post('/moduleNews/activate', moduleNewsController.activateModuleNews);
router.post('/moduleNews/add', moduleNewsController.addModuleNews);
router.get('/moduleNews/actives', moduleNewsController.getActiveModules);

//design
router.get('/design', designController.getDesign);
router.post('/design', designController.updateDesign);
router.get('/design/getOrders', designController.getOrders);

//pageModule
router.get('/pageModule', pageModuleController.getPageModue);
router.post('/pageModule', pageModuleController.addPageModule);
router.post('/pageModule/order', pageModuleController.updatePageModuleOrder);
router.post('/pageModule/delete', pageModuleController.deletePageModule);
router.get('/pageModule/max', pageModuleController.getPageModuleMaxOrder);


//main rows
router.get('/mainRows', mainRowsController.getRows);
router.post('/mainRows', mainRowsController.addRow);
router.get('/mainRows/max', mainRowsController.getMainRowsMaxOrder);
router.post('/mainRows/setModule', mainRowsController.setColumnModule);
router.get('/mainRows/delete', mainRowsController.deleteRow);
router.get('/mainRows/deleteModule', mainRowsController.deleteModule);
router.post('/mainRows/order', mainRowsController.updateOrder);
router.post('/mainRows/updateFluid', mainRowsController.updateFluid);
router.post('/mainRows/updateTitle', mainRowsController.updateTitle);
router.post('/mainRows/updateColumnType', mainRowsController.updateColumnType);

//columnModules

router.post('/columnModules/showTitle', columnModuleController.changeShowTitle);
module.exports = router;
