let express = require('express');
let router = express.Router();

const News = require('../database/models/news');
const Module = require('../database/models/modules');
const ModuleNews = require('../database/models/module_news');
const Design = require('../database/models/design');
const pageModule = require('../database/models/pageModules');

router.get('/', function (req, res) {
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

    Module.create({
        name: 'Comments',
        type: 1
    });
    Module.create({
        name: 'Tags',
        type: 2
    });
    Module.create({
        name: 'Related Articles',
        type: 3
    });

    Module.create({
        name: 'Top 10 News',
    });
    Module.create({
        name: 'Trending News',
    });

    for (let i = 0; i < 10; i++) {
        ModuleNews.create({
            module_id: 4,
            news_id: i + 1,
            status: 0
        });
    }

    for (let i = 0; i < 10; i++) {
        ModuleNews.create({
            module_id: 5,
            news_id: i + 1,
            status: 0
        });
    }
    Design.create({
        type: 0,
        sidebar: false,
        sidebar_size: 1,
        direction: false
    });

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
            module_id: 1,
            news_id: i + 1,
            status: 0
        });
    }
    res.send('done');
});

module.exports = router;
