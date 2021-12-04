const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  Tag.findAll({
    include: [{ model: Product, through: ProductTag }]
  })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: [{ model: Product, through: ProductTag }]
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No Tag found with this id' });
        return
      }
      res.json(dbData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbData => res.json(dbData))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbData => {
      if (!dbData) {
        res.status(404).json({ message: 'No Tag found with this id' });
        return
      }
      res.json(dbData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
});

module.exports = router;
