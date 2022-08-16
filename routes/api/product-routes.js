const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// Route to get all products
router.get('/', async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [{
        model: Category,
        attributes: ['id', 'category_name']
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name']
      }]
    });
    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Route to get single product by id value
router.get('/:id', async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{
        model: Category,
        attributes: ['id', 'category_name']
      },
      {
        model: Tag,
        attributes: ['id', 'tag_name']
      }]
    });
    if (!productData) {
      res.status(404).json({ message: 'Sorry, no product was found with that ID.'});
      return;
    }
    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Route to create new product
router.post('/', (req, res) => {
  Product.create({
    product_name: req.body.product_name,
    price: req.body.price,
    stock: req.body.stock,
    category_id: req.body.category_id,
    tagIds: req.body.tag_id
  }).then((product) => {
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(product);
    }).then((productTagIds) => {
        res.status(200).json(productTagIds);
      }).catch((error) => {
          res.status(400).json(error);
        });
});

// Route to update product by id value
router.put('/:id', (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((product) => {
      return ProductTag.findAll({ where: { product_id: req.params.id } });
    }).then((productTags) => {
        const productTagIds = productTags.map(({ tag_id }) => tag_id);
        const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });
        const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
        return Promise.all([
          ProductTag.destroy({ where: { id: productTagsToRemove } }),
          ProductTag.bulkCreate(newProductTags),
        ]);
      }).then((updatedProductTags) => {
          res.json(updatedProductTags);
        }).catch((error) => {
            res.status(400).json(error);
          });
});

// Route to delete product by id value
router.delete('/:id', (req, res) => {
  try {
    const productData = Product.destroy({
      where: { id: req.params.id }
    });
    if (!productData) {
      res.status(400).json({ message: 'Sorry, no product was found with that ID.'});
      return;
    }
    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;