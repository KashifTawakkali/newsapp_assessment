import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography, Grid, CircularProgress, Card, CardContent, CardMedia, Pagination } from '@mui/material';

const Newsapp = () => {
    const [search, setSearch] = useState('india');
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Fetch news data from your backend API
    const getData = async () => {
        setLoading(true); // Set loading state to true when fetching data
        try {
            const response = await fetch(`http://localhost:3000/api/news?search=${search}`);
            const jsonData = await response.json();

            console.log('API Response:', jsonData); // Check the response structure in the console

            if (response.ok) {
                setNewsData(jsonData || []); // Directly use the fetched data
            } else {
                console.error('Error fetching data:', jsonData.message);
            }
        } catch (error) {
            console.error('Network error:', error);
        } finally {
            setLoading(false); // Set loading to false once data is fetched
        }
    };

    useEffect(() => {
        getData();
    }, [search]); // Re-run when search term changes

    const handleInput = (e) => {
        setSearch(e.target.value);
    };

    const handleSearch = () => {
        getData();
    };

    const handleCategoryClick = (category) => {
        setSearch(category);
    };

    // Pagination Logic
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // Calculate the current items to display based on the page
    const currentItems = newsData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div>
            <nav>
                <Grid container justifyContent="space-between" alignItems="center" sx={{ padding: '20px' }}>
                    <Typography variant="h4" component="h1">Trendy News</Typography>
                    <Grid item>
                        <Grid container spacing={2}>
                            <Grid item><Button variant="text" sx={{ fontWeight: 600 }}>All News</Button></Grid>
                            <Grid item><Button variant="text" sx={{ fontWeight: 600 }}>Trending</Button></Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center" sx={{ marginBottom: '20px' }}>
                    <Grid item xs={12} sm={6} md={4}>
                        <TextField
                            fullWidth
                            label="Search News"
                            variant="outlined"
                            value={search}
                            onChange={handleInput}
                        />
                    </Grid>
                    <Grid item sx={{ marginLeft: '10px' }}>
                        <Button variant="contained" onClick={handleSearch}>Search</Button>
                    </Grid>
                </Grid>
            </nav>
            <Typography variant="h5" align="center" sx={{ marginBottom: '20px' }}>Stay Updated with TrendyNews</Typography>
            
            {/* Button Category Section */}
            <Grid container justifyContent="center" spacing={2} sx={{ marginBottom: '20px' }}>
                <Grid item><Button variant="outlined" onClick={() => handleCategoryClick('sports')} sx={buttonStyle}>Sports</Button></Grid>
                <Grid item><Button variant="outlined" onClick={() => handleCategoryClick('politics')} sx={buttonStyle}>Politics</Button></Grid>
                <Grid item><Button variant="outlined" onClick={() => handleCategoryClick('entertainment')} sx={buttonStyle}>Entertainment</Button></Grid>
                <Grid item><Button variant="outlined" onClick={() => handleCategoryClick('health')} sx={buttonStyle}>Health</Button></Grid>
                <Grid item><Button variant="outlined" onClick={() => handleCategoryClick('fitness')} sx={buttonStyle}>Fitness</Button></Grid>
            </Grid>

            {/* News Cards Section */}
            <div>
                {loading ? (
                    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '50vh' }}>
                        <CircularProgress size={60} />
                    </Grid>
                ) : currentItems.length > 0 ? (
                    <Grid container spacing={2}>
                        {currentItems.map((curItem, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Card sx={{ maxWidth: '100%' }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={curItem.image}
                                        alt={curItem.title}
                                        loading="lazy"
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="h2" gutterBottom>
                                            {curItem.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {curItem.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <Typography variant="body1" align="center">No news found</Typography>
                )}
            </div>

            {/* Pagination */}
            <Grid container justifyContent="center" sx={{ marginTop: '20px' }}>
                <Pagination
                    count={Math.ceil(newsData.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Grid>
        </div>
    );
};

// Reusable button style for consistency
const buttonStyle = {
    borderColor: '#D5006C',
    color: '#D5006C',
    '&:hover': {
        borderColor: '#D5006C',
        backgroundColor: '#D5006C',
        color: 'white',
    }
};

export default Newsapp;
