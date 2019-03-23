const Module = require('../database/models/modules');
const MainRows = require('../database/models/mainRows');
const RowColumns = require('../database/models/rowColumns');
const columnModules = require('../database/models/columnModules');

module.exports = {
    getRows(req, res) {
        MainRows.findAll({
            include: [
                {
                    model: RowColumns, include: [
                        {
                            model: columnModules, required: false, include: [
                                {model: Module, required: false}
                            ]
                        }]
                }],
            order: [
                ['order'],
                [RowColumns, 'id', 'asc'],
                [{model: RowColumns}, {model: columnModules}, 'id', 'asc'],
            ],
        }).then(data => {
            res.send({
                mainRows: data
            })
        }).catch(err => {
                console.log(err);
                res.status(500).send({
                    error: err
                });
            }
        )
    },
    addRow(req, res) {
        let columnNumber = req.body.columnNumber;
        let sizes = req.body.size;
        let order = req.body.order;
        let title = req.body.title;
        let type = req.body.type;
        let height = req.body.height;
        let width = req.body.width;
        let top = req.body.top;
        let right = req.body.right;
        let pageId = req.body.pageId;
        if (type == 0) {
            MainRows.create({
                pageId: pageId,
                order: order,
                title: title,
                type: type
            }).then(row => {
                for (let i = 0; i < columnNumber; i++) {
                    RowColumns.create({
                        mainRowId: row.id,
                        size: sizes[i],
                    }).then(data => {
                        if (i == columnNumber - 1) {
                            res.send('done');
                        }
                    })
                }

            }).catch(err => {
                console.log(err);
                res.status(500).send({
                    error: err
                });
            });
        } else {
            MainRows.create({
                pageId: pageId,
                order: order,
                title: title,
                type: type,
                height: height,
                width: width,
                top: top,
                right: right
            }).then(row => {
                RowColumns.create({
                    mainRowId: row.id,
                    size: 4,
                }).then(data => {
                    res.send({
                        row: row
                    });
                })
            }).catch(err => {
                console.log(err);
                res.status(500).send({
                    error: err
                });
            });
        }


    },
    getMainRowsMaxOrder(req, res) {
        let page = req.query.page;
        MainRows.max('order', {where: {type: 0}}).then(max => {
            res.send({
                max: max
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        });
    },
    async setColumnModule(req, res) {
        let column_id = req.body.column_id;
        let module_id = req.body.module_id;
        let module_type = req.body.module_type;
        let default_option = req.body.default;
        let defaultType = req.body.defaultType;
        let module = await Module.findByPk(module_id);
        columnModules.create({
            rowColumnId: column_id,
            moduleId: module_id,
            module_type: module_type,
            default: default_option,
            defaultType: defaultType
        }).then(data => {
            columnModules.findByPk(data.id, {include: [Module]})
                .then(result => {
                    res.send({
                        columnModule: result
                    })
                })
        }).catch(err => {
            console.log(err);
            res.send({
                error: err
            });
        })

    },
    deleteRow(req, res) {
        let row_id = req.query.row_id;
        Promise.all([
            MainRows.destroy({where: {id: row_id}}),
            RowColumns.findAll({where: {mainRowId: row_id}}).then(columns => {
                for (let i = 0; i < columns.length; i++) {
                    columnModules.destroy({where: {rowColumnId: columns[i].id}});
                    columnModules.destroy({where: {rowColumnId: null}});
                    columns[i].destroy()
                }
            }),
            RowColumns.destroy({where: {mainRowId: null}})
        ]).then(() => {
            res.send('done')
        }).catch(er => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        });

    },
    deleteModule(req, res) {
        let columnModuleId = req.query.columnModuleId;
        columnModules.destroy({
            where: {
                id: columnModuleId
            }
        }).then(data => {
            res.send({data: data})
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    },
    updateOrder(req, res) {
        let id = req.body.id;
        let order = req.body.order;
        MainRows.findByPk(id).then(mainRow => {
            mainRow.order = order;
            mainRow.save().then(data => {
                res.send({
                    mainRow: data
                })
            }).catch(err => {
                console.log(err);
                res.status(500).send({
                    error: err
                });
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    },
    updateFluid(req, res) {
        let fluid = req.body.fluid;
        let id = req.body.id;
        MainRows.findByPk(id).then(row => {
            row.fluid = fluid;
            row.save().then(data => {
                res.send({
                    mainRow: data
                })
            }).catch(err => {
                console.log(err);
                res.send.status(500).send({
                    error: err
                })
            })
        }).catch(err => {
            console.log(err);
            res.send.status(500).send({
                error: err
            })
        })
    },
    updateTitle(req, res) {
        let title = req.body.title;
        let id = req.body.id;
        MainRows.findByPk(id).then(row => {
            row.title = title;
            row.save().then(data => {
                res.send({
                    mainRow: data
                })
            }).catch(err => {
                console.log(err);
                res.send.status(500).send({
                    error: err
                })
            })
        }).catch(err => {
            console.log(err);
            res.send.status(500).send({
                error: err
            })
        })
    },
    updateColumnType(req, res) {
        let column_id = req.body.column_id;
        let column_type = req.body.column_type;

        RowColumns.findByPk(column_id).then(column => {

            column.column_type = column_type;
            column.save(data => {
                res.send({
                    column: data,
                });
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    },
    updateVertical(req, res) {
        let {row_id, width, height, top, right, title} = req.body;
        MainRows.findByPk(row_id).then(row => {
            row.title = title
            row.width = width;
            row.height = height;
            row.top = top;
            row.right = right;
            row.save().then(data => {
                res.send({
                    row: data
                });
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    },
};
