import React from 'react';
import ClassCard from './ClassCard';

const Classes = () => {
  return (
    <section>
      <div className="flex flex-wrap gap-7 items-center mx-auto mt-[90px] px-4 md:px-10">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <ClassCard />
        ))}
      </div>
    </section>
  );
};

export default Classes;
