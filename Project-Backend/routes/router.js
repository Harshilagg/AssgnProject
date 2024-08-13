const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the schema
const dataSchema = new mongoose.Schema({
    end_year: String,
    intensity: Number,
    sector: String,
    topic: String,
    insight: String,
    url: String,
    region: String,
    start_year: String,
    impact: String,
    added: String,
    published: String,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
});

// Create the model for the blackcofferdata collection
const DataModel = mongoose.model('blackcofferdata', dataSchema, 'blackcofferdata');

// 1. Total Count of Documents
router.get('/total-count', async (req, res) => {
    try {
        const count = await DataModel.countDocuments();
        res.json({ total_count: count });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 2. Average Intensity
router.get('/average-intensity', async (req, res) => {
    try {
        const result = await DataModel.aggregate([
            { $group: { _id: null, averageIntensity: { $avg: "$intensity" } } }
        ]);
        res.json({ average_intensity: result[0]?.averageIntensity || 0 });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. Count by Sector
router.get('/count-by-sector', async (req, res) => {
    try {
        const result = await DataModel.aggregate([
            { $group: { _id: "$sector", count: { $sum: 1 } } }
        ]);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. Count by Region
router.get('/count-by-region', async (req, res) => {
    try {
        const result = await DataModel.aggregate([
            { $group: { _id: "$region", count: { $sum: 1 } } }
        ]);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 5. Documents by Country
router.get('/documents-by-country/:country', async (req, res) => {
    try {
        const country = req.params.country;
        const data = await DataModel.find({ country: country });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.get('/metrics/intensity', async (req, res) => {
    try {
        const data = await DataModel.aggregate([
            {
                $group: {
                    _id: "$intensity",
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get metrics for Likelihood
router.get('/metrics/likelihood', async (req, res) => {
    try {
        const data = await DataModel.aggregate([
            {
                $group: {
                    _id: "$likelihood",
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get metrics for Relevance
router.get('/metrics/relevance', async (req, res) => {
    try {
        const data = await DataModel.aggregate([
            {
                $group: {
                    _id: "$relevance",
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get metrics for Year
router.get('/metrics/year', async (req, res) => {
    try {
        const data = await DataModel.aggregate([
            {
                $group: {
                    _id: "$year",
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get metrics for Country
router.get('/metrics/country', async (req, res) => {
    try {
        const data = await DataModel.aggregate([
            {
                $group: {
                    _id: "$country",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } } // Sort by count in descending order
        ]);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get metrics for Topics
router.get('/metrics/topics', async (req, res) => {
    try {
        const data = await DataModel.aggregate([
            {
                $group: {
                    _id: "$topic",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } } // Sort by count in descending order
        ]);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get metrics for Region
router.get('/metrics/region', async (req, res) => {
    try {
        const data = await DataModel.aggregate([
            {
                $group: {
                    _id: "$region",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } } // Sort by count in descending order
        ]);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get metrics for City
router.get('/metrics/city', async (req, res) => {
    try {
        const data = await DataModel.aggregate([
            {
                $group: {
                    _id: "$city",
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } } // Sort by count in descending order
        ]);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/metrics/:metric', async (req, res) => {
    const { metric } = req.params;
    const { endYear, topic, sector, region, pest, source, swot, country, city } = req.query;

    try {
        // Construct the match stage based on filters
        const matchStage = {};

        if (endYear) matchStage.end_year = endYear;
        if (topic) matchStage.topic = topic;
        if (sector) matchStage.sector = sector;
        if (region) matchStage.region = region;
        if (pest) matchStage.pestle = pest;
        if (source) matchStage.source = source;
        if (swot) matchStage.swot = swot;
        if (country) matchStage.country = country;
        if (city) matchStage.city = city;

        // If no filters, return metrics for the whole data
        const pipeline = [
            { $match: matchStage }, // Apply the filters if any
            {
                $group: {
                    _id: `$${metric}`,
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ];

        const data = await DataModel.aggregate(pipeline);
        res.json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;