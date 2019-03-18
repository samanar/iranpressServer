let express = require('express');
let router = express.Router();
let multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
        cb(null, 'Image' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
});


const newsController = require('../controllers/news');
const moduleController = require('../controllers/module');
const moduleNewsController = require('../controllers/moduleNews');
const designController = require('../controllers/design');
const pageModuleController = require('../controllers/pageModules');
const mainRowsController = require('../controllers/mainRows');
const mainController = require('../controllers/main');
const columnModuleController = require('../controllers/columnModules');
const userController = require('../controllers/users');
const commentController = require('../controllers/comments');
const tagController = require('../controllers/tags');
const pageController = require('../controllers/pages');
const categoryController = require('../controllers/category');
const headerDesignController = require('../controllers/headerDesign');
const footerDesignController = require('../controllers/footerDesign');
const liveController = require('../controllers/lives');
const roleController = require('../controllers/roles');

//root
router.get('/', mainController.getMain);

//news
router.get('/news', newsController.getNews);
router.get('/news/details', newsController.getNewsDetails);

//modules
router.get('/modules', moduleController.getModules);
router.get('/module', moduleController.getModule);
router.post('/module/update', moduleController.updateModule);
router.post('/modules/add', moduleController.addModule);

//module news
router.get('/moduleNews', moduleNewsController.getModuleNews);
router.post('/moduleNews/deactivate', moduleNewsController.deactivateModuleNews);
router.post('/moduleNews/activate', moduleNewsController.activateModuleNews);
router.post('/moduleNews/add', moduleNewsController.addModuleNews);
router.get('/moduleNews/actives', moduleNewsController.getActiveModules);

//design
router.get('/design', designController.getDesign);
router.post('/design', designController.updateDesign);
router.post('/design/page', designController.getPageModules);
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
router.post('/mainRows/updateVertical', mainRowsController.updateVertical);

//columnModules
router.post('/columnModules/showTitle', columnModuleController.changeShowTitle);

//users
router.post('/users/add', userController.addUser);
router.post('/users/login', userController.loginUser);
router.get('/users/logout', userController.logoutUser);
router.post('/users/check_login', userController.checkLogin);


//comments
router.post('/comments/news', commentController.getNewsComments);
router.get('/comments', commentController.getComments);
router.post('/comments/add', commentController.addComment);
router.post('/comments/status', commentController.changeStatus);

//tags
router.get('/tags', tagController.getTags);

//pages
router.get('/pages', pageController.getPages);
router.post('/pages', pageController.addPage);
router.post('/page', pageController.getPage);
router.post('/page/delete', pageController.deletePage);
router.post('/page/type', pageController.changeType);

// categories

router.get('/categories', categoryController.getAll);
router.post('/categories/module', categoryController.getModuleData);

// menus

router.get('/header', headerDesignController.getHeader);
router.post('/header', headerDesignController.updateHeader);
router.post('/header/image', upload.single('image'), headerDesignController.addPhoto);
router.post('/header/image/select', headerDesignController.selectImage);
router.get('/footer', footerDesignController.getFooter);
router.post('/footer', footerDesignController.updateFooter);
router.get('/footer/data', footerDesignController.getListData);
router.post('/footer/item', footerDesignController.addItem);
router.post('/footer/item/delete', footerDesignController.deleteItem);
router.post('/footer/item/edit', footerDesignController.editItemText);
router.post('/footer/title', footerDesignController.changeTitle);


//lives

router.get('/lives', liveController.getLives);
router.post('/lives', liveController.addLive);
router.post('/lives/delete', liveController.deleteLive);

//roles

router.get('/roles', roleController.getRole);
router.post('/roles', roleController.addRole);
router.post('/roles/update', roleController.updateRole);


module.exports = router;
