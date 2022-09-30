import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import NavBar from '../../components/Shared/NavBar';
import ClassCard from './ClassCard';

const Classes = () => {
  const {
    data: allAddedClass,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ['allClass'],
    async () =>
      await axios.get('http://localhost:5001/api/v1/class').then((res) => {
        return res.data.result;
      })
  );
  if (isLoading) {
    return <p>Loading</p>;
  }
  if (isError) {
    toast.error(isError?.message);
  }
  console.log(allAddedClass);
  return (
    <>
      <NavBar refetch={refetch} />
      {allAddedClass ? (
        <section>
          <div className="flex flex-wrap gap-8 items-center mx-auto mt-[120px] px-4 md:px-10 mb-10">
            {allAddedClass.map((item) => (
              <ClassCard item={item} key={item._id} refetch={refetch} />
            ))}
          </div>
        </section>
      ) : (
        ''
      )}
    </>
  );
};

export default Classes;
