const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ["id","product_name", 'price', 'stock', 'category_id' ]
    }
  }).then(data => {
    if(!data) {
      res.status(404).send("no categories found")
      return
    }
    res.json(data)
  }).catch(err =>{
    console.log(err)
    res.send(err)
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model:Product,
      attributes:  ["id","product_name", 'price', 'stock', 'category_id' ]
    }
  }).then(data => {
    if(!data){res.send("Categories with that Id does not exist")
  return true}
    res.json(data)
  })
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name : req.body.category_name
  }).then(data=> res.json(data))
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.json(data)
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  }).then(data => {
    res.json(data)
  })
});

module.exports = router;
