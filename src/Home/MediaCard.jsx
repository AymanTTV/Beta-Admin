import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ImagesFolder from './ImagesFolder';

export default function MediaCard({ imageUrl, handleImageDelete }) {
  return (
    <Card sx={{ maxWidth: 345, margin: '20px auto', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
      {imageUrl && (
        <CardMedia sx={{ height: 140 }} image={imageUrl} title='House Image' />
      )}
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          House Images
        </Typography>
        <Typography variant='body2' color='text.secondary'>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={handleImageDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
