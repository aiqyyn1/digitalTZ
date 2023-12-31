import React, { useContext } from 'react';
import { MyContext } from './Context';
import { post } from '../../api/api';

const DeleteModal = () => {
  const { showModal, setShowModal, Id, setPosts, handleDeletePost } =
    useContext(MyContext);

  return (
    <>
      <div className='justify-center   items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
        <div className='relative  my-6 mx-auto w-[300px]'>
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            <div className='flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t'>
              <h3 className='text-3xl font-semibold'>Delete Title</h3>
              <button
                className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                onClick={() => setShowModal(false)}>
                <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                  ×
                </span>
              </button>
            </div>

            <div className='relative p-6 flex-auto '>
              <p className='my-4 text-slate-500 text-lg leading-relaxed'>
                Are you sure delete ?
              </p>
            </div>

            <div className='flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b'>
              <button
                className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={() => setShowModal(false)}>
                NO
              </button>
              <button
                className='bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={() => handleDeletePost(Id)}>
                YES
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
