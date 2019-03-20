let express = require('express');
let router = express.Router();

const News = require('../database/models/news');
const Module = require('../database/models/modules');
const ModuleNews = require('../database/models/module_news');
const Design = require('../database/models/design');
const mainRows = require('../database/models/mainRows');
const rowColumns = require('../database/models/rowColumns');
const columnModules = require('../database/models/columnModules');
const Page = require('../database/models/pages');
const Category = require('../database/models/category');
const subCategory = require('../database/models/subCategory');
const headerDesign = require('../database/models/headerDesign');
const footerDesign = require('../database/models/footerDeisng');
const lives = require('../database/models/lives');
const footerList = require('../database/models/footerLists');
const role = require('../database/models/roles');
const siteUser = require('../database/models/siteUsers');


router.get('/', async function (req, res) {
    for (let i = 0; i < 50; i++) {
        let title = "Title " + (i + 1);
        let description = "#" + (i + 1);
        description += 'Lorem ipsum dolor sit amet, his lobortis abhorreant ne, eum cu mazim tritani. Qui ne nusquam fabellas voluptaria, ut alia simul pertinax vel, qui an quot facilis. Per prodesset efficiendi ea, \n aeterno officiis vis ea, cu eros blandit conceptam his. No qui bonorum reprimique persequeris. In recusabo praesent vis, pri tempor sensibus facilisis ei.\n Dico epicuri an est, at his hinc admodum mnesarchum.';
        let point = Math.floor(Math.random() * 11);

        await News.create({
            title: title,
            content: description,
            point: point,
            status: 2
        });
    }

    lives.create({
        url: 'http://wpc.785F5.zetacdn.net/24785F5/kurdish/kurdishStream.m3u8',
        name: 'test2'
    });
    lives.create({
        url: 'http://wpc.785F5.zetacdn.net/24785F5/azeri/azeriStream.m3u8',
        name: 'ALalam'
    });


    await Category.create({
        englishTitle: 'category test 1',
        title: 'تست 1',
    });
    await Category.create({
        englishTitle: 'category test 2',
        title: 'تست 2',
    });
    await Category.create({
        englishTitle: 'category test 3',
        title: 'تست 3',
    });

    await subCategory.create({
        englishTitle: 'subcategory test 1',
        title: 'ساب 1',
    });
    await subCategory.create({
        englishTitle: 'subcategory test 2',
        title: 'ساب 2',
    });
    await subCategory.create({
        englishTitle: 'subcategory test 3',
        title: 'ساب 3',
    });

    // header and footer design initializing
    await headerDesign.create();
    await footerDesign.create();
    await role.create({
        name: 'admin',
        description: 'admin'
    });
    await role.create({
        name: 'test',
        description: 'just testing here'
    });

    await siteUser.create({
        username: 'admin',
        name: 'Saman Ahmadian Rad',
        password: '$2a$10$ewVGTArHJPEQ.kfhp1vhL.6sebExQTha3g9i6gCh7S.ip611nP/j6',
        siteRoleId: 1
    });


    for (let i = 0; i < 3; i++) {
        footerList.create({
            title: 'title'
        });
    }

    await Page.create({
        name: 'main',
        type: 0
    });
    await Page.create({
        name: 'details',
        type: 1
    });

    await Module.create({
        name: 'Comments',
        type: 1
    });
    await Module.create({
        name: 'Tags',
        type: 2
    });
    await Module.create({
        name: 'Related Articles',
        type: 3
    });

    let top = await Module.create({
        name: 'Top 10 News',
    });
    let trending = await Module.create({
        name: 'Trending News',
    });

    await Design.create({
        pageId: 2,
        sidebar: false,
        sidebar_size: 1,
        direction: false
    });

    for (let i = 0; i < 10; i++) {
        await ModuleNews.create({
            moduleId: top.id,
            newsId: i + 1,
            status: 0
        });
    }

    for (let i = 0; i < 10; i++) {
        await ModuleNews.create({
            moduleId: trending.id,
            newsId: i + 1,
            status: 0
        });
    }

    res.send('done');
});

/* GET home page. */
router.get('/news', function (req, res, next) {
    for (let i = 0; i < 50; i++) {
        let title = "Title " + (i + 1);
        let description = "#" + (i + 1);
        description += 'Lorem ipsum dolor sit amet, his lobortis abhorreant ne, eum cu mazim tritani. Qui ne nusquam fabellas voluptaria, ut alia simul pertinax vel, qui an quot facilis. Per prodesset efficiendi ea, \n aeterno officiis vis ea, cu eros blandit conceptam his. No qui bonorum reprimique persequeris. In recusabo praesent vis, pri tempor sensibus facilisis ei.\n Dico epicuri an est, at his hinc admodum mnesarchum.';
        let point = Math.floor(Math.random() * 11);

        News.create({
            title: title,
            description: description,
            point: point
        });
    }

    res.send("done");
});

router.get('/modules', function (req, res, next) {
    Module.create({
        name: 'comments',
        type: true
    });
    Module.create({
        name: 'Related Articles',
        type: true
    });
    Module.create({
        name: 'Comments',
    });
    Module.create({
        name: 'Top 10 News',
    });
    Module.create({
        name: 'Trending News',
    });

    res.send('done');
});

router.get('/moduleNews', function (req, res, next) {

    for (let i = 0; i < 30; i++) {
        ModuleNews.create({
            moduleId: 1,
            newsId: i + 1,
            status: 0
        });
    }
    res.send('done');
});

router.get('/design', async function (req, res, next) {
    await mainRows.create({
        pageId: 1,
        title: '',
        order: 2,
        fluid: 1,
        type: 0,
    });

    await mainRows.create({
        pageId: 1,
        title: "Editor's Choice",
        order: 3,
        fluid: 0,
        type: 0
    });

    await mainRows.create({
        pageId: 1,
        title: "",
        order: 1,
        fluid: 0,
        type: 1,
        height: 1450,
        width: 350,
        right: 10,
        top: 380
    });
    await mainRows.create({
        pageId: 1,
        title: "MODULE TITLE | CATEGORY 1",
        order: 4,
        fluid: 0,
        type: 0
    });
    await rowColumns.create({
        size: 12,
        module_type: 0,
        column_type: 0,
        mainRowId: 1
    });
    await rowColumns.create({
        size: 10,
        module_type: 0,
        column_type: 1,
        mainRowId: 2
    });
    await rowColumns.create({
        size: 2,
        module_type: 0,
        column_type: 0,
        mainRowId: 2
    });
    await rowColumns.create({
        size: 4,
        module_type: 0,
        column_type: 0,
        mainRowId: 3
    });
    await rowColumns.create({
        size: 4,
        module_type: 0,
        column_type: 0,
        mainRowId: 4
    });
    await rowColumns.create({
        size: 8,
        module_type: 0,
        column_type: 2,
        mainRowId: 4
    });
    await columnModules.create({
        module_type: 4,
        show_title: 0,
        rowColumnId: 1,
        moduleId: 4
    });
    await columnModules.create({
        module_type: 3,
        show_title: 0,
        rowColumnId: 2,
        moduleId: 4
    });
    await columnModules.create({
        module_type: 3,
        show_title: 0,
        rowColumnId: 2,
        moduleId: 4
    });
    await columnModules.create({
        module_type: 3,
        show_title: 0,
        rowColumnId: 2,
        moduleId: 4
    });
    await columnModules.create({
        module_type: 3,
        show_title: 0,
        rowColumnId: 2,
        moduleId: 4
    });
    await columnModules.create({
        module_type: 3,
        show_title: 0,
        rowColumnId: 2,
        moduleId: 4
    });
    await columnModules.create({
        module_type: 3,
        show_title: 0,
        rowColumnId: 2,
        moduleId: 4
    });
    await columnModules.create({
        module_type: 0,
        show_title: 1,
        rowColumnId: 4,
        moduleId: 4
    });
    await columnModules.create({
        module_type: 0,
        show_title: 1,
        rowColumnId: 4,
        moduleId: 4
    });
    await columnModules.create({
        module_type: 0,
        show_title: 1,
        rowColumnId: 4,
        moduleId: 4
    });
    await columnModules.create({
        module_type: 0,
        show_title: 1,
        rowColumnId: 4,
        moduleId: 4
    });
    await columnModules.create({
        module_type: 4,
        show_title: 0,
        rowColumnId: 6,
        moduleId: 4
    });
    await columnModules.create({
        module_type: 4,
        show_title: 0,
        rowColumnId: 6,
        moduleId: 4
    });
    await columnModules.create({
        module_type: 4,
        show_title: 0,
        rowColumnId: 6,
        moduleId: 4
    });
    await columnModules.create({
        module_type: 4,
        show_title: 0,
        rowColumnId: 6,
        moduleId: 4
    });
    await columnModules.create({
        module_type: 4,
        show_title: 0,
        rowColumnId: 6,
        moduleId: 4
    });
    await columnModules.create({
        module_type: 4,
        show_title: 0,
        rowColumnId: 6,
        moduleId: 4
    });
    await columnModules.create({
        module_type: 4,
        show_title: 0,
        rowColumnId: 6,
        moduleId: 4
    });
    await columnModules.create({
        module_type: 1,
        show_title: 0,
        rowColumnId: 5,
        moduleId: 5
    });

    res.send('done')
});

module.exports = router;
