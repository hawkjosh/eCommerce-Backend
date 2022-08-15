const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// Route to get all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then(catData => {
      res.json(catData);
    }).catch(error => {
        res.status(500).json(error);
      });
});

// Route to get single category by id value
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  }).then(catData => {
      if (!catData) {
        res.status(404).json({ message: 'Sorry, no category was found with that ID.'});
        return;
      }
      res.json(catData);
    }).catch(error => {
        res.status(500).json(error);
      });
});

// Route to create a new category
router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  }).then(catData => {
      res.json(catData);
    }).catch(error => {
        res.status(500).json(error);
      });
});

// Route to update category by id value
router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(catData => {
      if (!catData[0]) {
        res.status(404).json({ message: 'Sorry, no category was found with that ID.'});
        return;
      }
      res.json(catData);
    }).catch(err => {
        res.status(500).json(err);
      });
});

// Route to delete category by id value
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(catData => {
      if (!catData) {
        res.status(404).json({ message: 'Sorry, no category was found with that ID.'});
        return;
      }
      res.json(catData);
    }).catch(error => {
        res.status(500).json(error);
      });
});

module.exports = router;