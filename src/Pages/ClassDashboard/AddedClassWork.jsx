import { Card, Typography } from '@material-tailwind/react';
import React from 'react';
import { MdBook } from 'react-icons/md';

const AddedClassWork = () => {
  return (
    <section>
      <Card
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
        }}
        className="w-full flex flex-row items-center gap-4 p-4 cursor-pointer rounded-md"
      >
        <MdBook
          size={40}
          className="p-[10px] hover:bg-[#dddeee] rounded-full cursor-pointer"
        />
        <Typography variant="paragraph">Topic Name</Typography>
      </Card>
    </section>
  );
};

export default AddedClassWork;
