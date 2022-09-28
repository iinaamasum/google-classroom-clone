import React from 'react';
import NavBar from '../../components/Shared/NavBar';
import ClassCard from './ClassCard';

const Classes = () => {
  return (
    <>
      <NavBar />
      <section>
        <div className="flex flex-wrap gap-8 items-center mx-auto mt-[120px] px-4 md:px-10 mb-10">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <ClassCard />
          ))}
        </div>
      </section>
    </>
  );
};

export default Classes;
