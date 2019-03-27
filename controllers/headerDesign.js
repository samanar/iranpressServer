const headerDesign = require('../database/models/headerDesign');
const headerImages = require('../database/models/headerImages');
const Page = require('../database/models/pages');
const path = require('path');


module.exports = {
    async getHeaderWithPages(req, res) {
        let selectedPages = [];
        let pagesString = '';
        let pages = [];
        let [header, image] = await Promise.all([
            headerDesign.findOne({
                where: {id: 1},
            }),
            headerImages.findOne({where: {selected: true}})
        ]);

        pagesString = header.pagesString;

        if (pagesString && pagesString.length)
            selectedPages = pagesString.split('-');
        for (let i = 0; i < selectedPages.length; i++) {
            selectedPages[i] = parseInt(selectedPages[i]);
            if (selectedPages[i] !== 0 && i < header.menuItems)
                pages[i] = await Page.findByPk(selectedPages[i]);
            if (i === selectedPages.length - 1) {
                res.send({
                    selectedPages: selectedPages,
                    pages: pages,
                    header: header,
                    image: image
                })
            }
        }
    },
    async getHeader(req, res) {
        try {
            let [header, images] = await Promise.all([
                headerDesign.findOne({where: {id: 1}}),
                headerImages.findAll()
            ]);
            res.send({
                headerDesign: header,
                images: images
            })
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: e
            });
        }
    }
    ,
    updateHeader(req, res) {
        let {type, menuItems, backgroundColor, textColor, pagesString} = req.body;
        headerDesign.findOne({
            where: {id: 1}
        }).then(data => {
            data.type = type;
            data.menuItems = menuItems;
            data.backgroundColor = backgroundColor;
            data.textColor = textColor;
            data.pagesString = pagesString;
            data.save()
                .then(design => {
                    res.send({
                        headerDesign: design
                    })
                }).catch(err => {
                console.log(err);
                res.status(500).send({
                    error: err
                })
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            })
        })
    }
    ,
    addPhoto(req, res) {
        let file = req.file;
        headerImages.create({
            name: file.filename
        }).then(data => {
            res.send({
                image: data
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    }
    ,
    selectImage(req, res) {
        let imageId = req.body.imageId;
        let images = [];
        headerImages.findAll()
            .then(async images => {
                for (let i = 0; i < images.length; i++) {
                    images[i].selected = images[i].id === imageId;
                    await images[i].save();
                    if (i === images.length - 1) {
                        let images = await headerImages.findAll();
                        res.send({
                            images: images
                        })
                    }
                }
            }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            })
        })
    }
}
;