const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Route to get all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then(tagData => {
      res.json(tagData);
    }).catch(error => {
        res.status(500).json(error);
      });
});

// Route to get single tab by id value
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then(tagData => {
      if (!tagData) {
        res.status(404).json({ message: 'Sorry, no tag was found with that id.'});
        return;
      }
      res.json(tagData);
    }).catch(error => {
        res.status(500).json(error);
      });
});

// Route to create new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  }).then(tagData => {
      res.json(tagData);
    }).catch(error => {
        res.status(500).json(error);
      });
});

// Route to update tag by id value
router.put('/:id', (req, res) => {
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(tagData => {
      if (!tagData[0]) {
        res.status(404).json({ message: 'Sorry, no tag was found with that id.'});
        return;
      }
      res.json(tagData);
    }).catch(error => {
        res.status(500).json(error);
      });
});

// Route to delete tag by id value
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  }).then(tagData => {
      if (!tagData) {
        res.status(400).json({ message: 'Sorry, no tag was found with that id.'});
        return;
      }
      res.json(tagData);
    }).catch(error => {
        res.status(500).json(error);
      });
});

module.exports = router;