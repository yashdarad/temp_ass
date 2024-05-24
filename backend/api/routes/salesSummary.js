// backend/api/routes/salesSummary.js

const express = require('express');
const router = express.Router();
const Product = require('../models/product');

router.get('/', async (req, res) => {
  try {
    const selectedMonth = req.query.month;
    const startDate = new Date(`${selectedMonth}-01T00:00:00.000Z`);
    const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1));

    const salesSummary = await Product.aggregate([
      {
        $match: {
          dateOfSale: {
            $gte: startDate,
            $lt: endDate
          }
        }
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: 1 },
          totalSoldItems: { $sum: { $cond: { if: '$sold', then: 1, else: 0 } } },
          totalUnsoldItems: { $sum: { $cond: { if: '$sold', then: 0, else: 1 } } }
        }
      },
      {
        $project: {
          _id: 0,
          totalSales: 1,
          totalSoldItems: 1,
          totalUnsoldItems: 1
        }
      }
    ]);

    if (salesSummary.length === 0) {
      return res.status(404).json({ message: 'No data found for the selected month' });
    }

    res.status(200).json(salesSummary[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
