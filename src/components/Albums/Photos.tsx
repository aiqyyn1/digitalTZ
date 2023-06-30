import React, { useEffect, useState, useRef } from 'react';
import { AlbumsProvider } from './Context';
import { photosApi } from '../../api/api';
import { PhotoType } from '../../types/types';

const Photos = () => {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPhotos();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [isModalOpen]);

  const fetchPhotos = async () => {
    try {
      const response = await photosApi.get('/');
      setPhotos(response.data);
    } catch (error) {
      setError(error as Error);
    }
  };

  const openModal = (photo: PhotoType) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPhoto(null);
    setIsModalOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(event.target as Node) &&
      !(event.target instanceof HTMLImageElement)
    ) {
      closeModal();
    }
  };

  if (error?.message) {
    return (
      <span className='text-red-500'>Here's the error: {error.message}</span>
    );
  }

  return (
    <div className='container mx-auto'>
      <div className='grid grid-cols-4 gap-4'>
        {photos.map((photo) => (
          <div
            key={photo.id}
            className='p-4 border border-gray-300 cursor-pointer'
            onClick={() => openModal(photo)}>
            <img src={photo.thumbnailUrl} alt='' className='max-w-full' />
            <div className='mt-2 text-lg font-bold'>{photo.title}</div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50'>
          <div className='relative' ref={modalRef}>
            <span
              className='absolute top-2 right-2 text-gray-400 cursor-pointer'
              onClick={closeModal}>
              X
            </span>
            <img src={selectedPhoto?.url} alt='' className='max-w-full' />
          </div>
        </div>
      )}
    </div>
  );
};

export default Photos;
