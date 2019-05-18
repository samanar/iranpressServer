let express = require("express");
let router = express.Router();
let multer = require("multer");
const path = require("path");

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

module.exports = router;
