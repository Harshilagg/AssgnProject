// // src/components/Dashboard.js
// import React, { useEffect, useState } from 'react';
// import { getTotalCount, getAverageIntensity, getCountBySector, getCountByRegion } from '../services/api';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
// import { Grid, Card, CardContent, Typography, Box, Paper } from '@mui/material';

// const Dashboard = () => {
//     const [totalCount, setTotalCount] = useState(0);
//     const [averageIntensity, setAverageIntensity] = useState(0);
//     const [countBySector, setCountBySector] = useState([]);
//     const [countByRegion, setCountByRegion] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             const totalCountData = await getTotalCount();
//             setTotalCount(totalCountData.total_count);

//             const averageIntensityData = await getAverageIntensity();
//             setAverageIntensity(averageIntensityData.average_intensity);

//             const countBySectorData = await getCountBySector();
//             setCountBySector(countBySectorData);

//             const countByRegionData = await getCountByRegion();
//             setCountByRegion(countByRegionData);
//         };

//         fetchData();
//     }, []);

//     const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB'];

//     const totalRegionCount = countByRegion.reduce((sum, region) => sum + region.count, 0);
//     const regionDataWithPercentages = countByRegion.map((region, index) => ({
//         ...region,
//         percentage: ((region.count / totalRegionCount) * 100).toFixed(2),
//         color: COLORS[index % COLORS.length],
//     }));

//     return (
//         <Box sx={{ flexGrow: 1, p: 3 }}>
//             <Typography variant="h4" gutterBottom>
//                 Blackcoffer Dashboard
//             </Typography>

//             <Grid container spacing={3}>
//                 {/* Total Documents Card */}
//                 <Grid item xs={12} md={6} lg={4}>
//                     <Card sx={{ bgcolor: '#0088FE', color: '#fff' }}>
//                         <CardContent>
//                             <Typography variant="h6">Total Documents</Typography>
//                             <Typography variant="h3">{totalCount}</Typography>
//                         </CardContent>
//                     </Card>
//                 </Grid>

//                 {/* Average Intensity Card */}
//                 <Grid item xs={12} md={6} lg={4}>
//                     <Card sx={{ bgcolor: '#00C49F', color: '#fff' }}>
//                         <CardContent>
//                             <Typography variant="h6">Average Intensity</Typography>
//                             <Typography variant="h3">{averageIntensity.toFixed(2)}</Typography>
//                         </CardContent>
//                     </Card>
//                 </Grid>

//                 {/* Count by Sector Bar Chart */}
//                 <Grid item xs={12} md={12} lg={12}>
//                     <Paper sx={{ p: 2 }}>
//                         <Typography variant="h6">Count by Sector</Typography>
//                         <ResponsiveContainer width="100%" height={300}>
//                             <BarChart data={countBySector}>
//                                 <CartesianGrid strokeDasharray="3 3" />
//                                 <XAxis dataKey="_id" />
//                                 <YAxis />
//                                 <Tooltip />
//                                 <Legend />
//                                 <Bar dataKey="count" fill="#FF8042" />
//                             </BarChart>
//                         </ResponsiveContainer>
//                     </Paper>
//                 </Grid>

//                 {/* Count by Region Pie Chart */}
//                 <Grid item xs={12} md={12} lg={12}>
//                     <Paper sx={{ p: 2 }}>
//                         <Typography variant="h6">Count by Region</Typography>
//                         <ResponsiveContainer width="100%" height={400}>
//                             <PieChart>
//                                 <Pie
//                                     data={regionDataWithPercentages}
//                                     cx="50%"
//                                     cy="50%"
//                                     outerRadius={120}
//                                     fill="#8884d8"
//                                     dataKey="count"
//                                 >
//                                     {regionDataWithPercentages.map((entry, index) => (
//                                         <Cell key={`cell-${index}`} fill={entry.color} />
//                                     ))}
//                                 </Pie>
//                                 <Tooltip />
//                                 <Legend verticalAlign="bottom" height={36} />
//                             </PieChart>
//                         </ResponsiveContainer>

//                         <Box mt={3}>
//                             <Typography variant="h6">Region Breakdown</Typography>
//                             <ul style={{ paddingLeft: 0 }}>
//                                 {regionDataWithPercentages.map((region, index) => (
//                                     <li key={index} style={{ color: region.color, listStyleType: 'none', marginBottom: '10px' }}>
//                                         {region._id}: {region.count} ({region.percentage}%)
//                                     </li>
//                                 ))}
//                             </ul>
//                         </Box>
//                     </Paper>
//                 </Grid>
//             </Grid>
//         </Box>
//     );
// };

// export default Dashboard;

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
          </FormControl>
        </Grid>
        {/* Repeat for PEST, Source, SWOT, Country, City filters */}
        {/* Example for PEST */}
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
        {/* Add similar filters for Source, SWOT, Country, City */}
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

        {/* Country Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Country Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.country}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {data.country.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Topics Pie Chart */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: 20 }}>
            <Typography variant="h6">Topics Distribution</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.topics}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#82ca9d"
                >
                  {data.topics.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Region Pie Chart */}
       

                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: 20 }}>
                        <Typography variant="h6">Region Distribution</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie>
                                    data={data.region}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    fill="#FF8042"
                                    dataKey="count"
                                
                                    {data.region.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>

                {/* City Pie Chart */}
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: 20 }}>
                        <Typography variant="h6">City Distribution</Typography>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={data.city}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={120}
                                    fill="#d0ed57"
                                    dataKey="count"
                                >
                                    {data.city.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default Dashboard;
 