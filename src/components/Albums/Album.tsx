import React, { useEffect, useState } from 'react';
import Select from '../Post/Select';
import { albumsApi } from '../../api/api';

const Album = () => {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    fetchAlbums();
  }, []);
  const fetchAlbums = async () => {
    const response = await albumsApi.get('/');
    console.log(response.data);
  };
  return (
    <div>
      <Select></Select>
    </div>
  );
};

export default Album;
