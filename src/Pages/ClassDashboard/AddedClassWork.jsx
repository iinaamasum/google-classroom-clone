import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import LoadingComponent from '../../components/Shared/LoadingComponent';
import AddedClassWorkCard from './AddedClassWorkCard';

const AddedClassWork = ({ classId }) => {
  console.log(classId);
  const {
    data: allClassWork,
    isLoading,
    isError,
  } = useQuery(
    ['allClassWork'],
    async () =>
      await axios
        .get(`http://localhost:5001/api/v1/class-work?classId=${classId}`)
        .then((res) => res.data),
    {
      retry: false,
    }
  );

  if (isLoading) {
    return <LoadingComponent />;
  }
  if (isError) {
    toast.error(isError.message);
  }
  console.log(allClassWork);

  return (
    <div className="my-5 grid grid-cols-1 gap-5">
      {allClassWork?.status === 'success' &&
        allClassWork.result.map((item) => (
          <AddedClassWorkCard key={item._id} item={item} />
        ))}
    </div>
  );
};

export default AddedClassWork;
