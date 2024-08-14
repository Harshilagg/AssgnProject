// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { fetchMetricData } from '../services/api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

const renderPieChart = (data, title) => (
    <ResponsiveContainer width="100%" height={500}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="count"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );

const Dashboard = () => {
  const [data, setData] = useState({
    intensity: [],
    likelihood: [],
    relevance: [],
    year: [],
    country: [],
    topics: [],
    region: [],
    city: [],
  });
  const [filters, setFilters] = useState({
    endYear: '',
    topic: '',
    sector: '',
    region: '',
    pest: '',
    source: '',
    swot: '',
    country: '',
    city: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [intensity, likelihood, relevance, year, country, topics, region, city] = await Promise.all([
          fetchMetricData('intensity', filters),
          fetchMetricData('likelihood', filters),
          fetchMetricData('relevance', filters),
          fetchMetricData('year', filters),
          fetchMetricData('country', filters),
          fetchMetricData('topics', filters),
          fetchMetricData('region', filters),
          fetchMetricData('city', filters),
        ]);
        console.log('Data fetched:', { intensity, likelihood, relevance, year, country, topics, region, city }); // Debugging

        setData({
          intensity,
          likelihood,
          relevance,
          year,
          country,
          topics,
          region,
          city,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filters]);

  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value,
    });
    
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Metrics Dashboard
      </Typography>

      {/* Filters */}
      <Grid container spacing={3} mb={2}>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>End Year</InputLabel>
            <Select
              name="endYear"
              value={filters.endYear}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="2020">2020</MenuItem>
              <MenuItem value="2021">2021</MenuItem>
              {/* Add more years as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Topics</InputLabel>
            <Select
              name="topic"
              value={filters.topic}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="gas">Gas</MenuItem>
              <MenuItem value="renewable">Renewable</MenuItem>
              {/* Add more topics as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Sector</InputLabel>
            <Select
              name="sector"
              value={filters.sector}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Energy">Energy</MenuItem>
              <MenuItem value="Technology">Technology</MenuItem>
              {/* Add more sectors as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Region</InputLabel>
            <Select
              name="region"
              value={filters.region}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Northern America">Northern America</MenuItem>
              <MenuItem value="Europe">Europe</MenuItem>
              {/* Add more regions as needed */}
            </Select>
             {/* Render your charts */}
            <renderPieChart data={data.region} title="Region Distribution" />
    
            {/* Add more charts */}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>PEST</InputLabel>
            <Select
              name="pest"
              value={filters.pest}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Politics">Politics</MenuItem>
              <MenuItem value="Economics">Economics</MenuItem>
              <MenuItem value="Social">Social</MenuItem>
              <MenuItem value="Technology">Technology</MenuItem>
              {/* Add more PEST as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Source</InputLabel>
            <Select
              name="source"
              value={filters.source}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="EIA">EIA</MenuItem>
              <MenuItem value="IEA">IEA</MenuItem>
              {/* Add more sources as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>SWOT</InputLabel>
            <Select
              name="swot"
              value={filters.swot}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Strength">Strength</MenuItem>
              <MenuItem value="Weakness">Weakness</MenuItem>
              <MenuItem value="Opportunity">Opportunity</MenuItem>
              <MenuItem value="Threat">Threat</MenuItem>
              {/* Add more SWOT as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>Country</InputLabel>
            <Select
              name="country"
              value={filters.country}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="United States of America">United States of America</MenuItem>
              <MenuItem value="Canada">Canada</MenuItem>
              {/* Add more countries as needed */}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth>
            <InputLabel>City</InputLabel>
            <Select
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="New York">New York</MenuItem>
              <MenuItem value="Toronto">Toronto</MenuItem>
              {/* Add more cities as needed */}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        {/* Intensity Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Intensity Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.intensity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Likelihood Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Likelihood Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.likelihood}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Relevance Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Relevance Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.relevance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Year Bar Chart */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Year Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.year}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#FFBB28" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        </Grid>
      {/* Pie Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 10 }}>
            <Typography variant="h6">Country Distribution</Typography>
            {renderPieChart(data.country, 'Country')}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 10 }}>
            <Typography variant="h6">Topics Distribution</Typography>
            {renderPieChart(data.topics, 'Topics')}
          </Paper>
        </Grid>

        {/* Region Pie Chart */}
        <Grid item xs={12} md={6}>
  <Paper style={{ padding: 20 }}>
    <Typography variant="h6">Region Distribution</Typography>
    {data.region && data.region.length > 0 ? (
      renderPieChart(data.region, 'Region')
    ) : (
      <Typography>No Data Available</Typography>
    )}
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.region}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#FF6347"
                >
                  {data.region.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* City Pie Chart */}
        <Grid item xs={12} md={6}>
  <Paper style={{ padding: 20 }}>
    <Typography variant="h6">City Distribution</Typography>
    {data.city && data.city.length > 0 ? (
      renderPieChart(data.city, 'Region')
    ) : (
      <Typography>No Data Available</Typography>
    )}
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.city}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#DAA520"
                >
                  {data.city.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
