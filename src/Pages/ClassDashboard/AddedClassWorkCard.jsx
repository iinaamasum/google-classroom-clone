import { Card, Typography } from '@material-tailwind/react';
import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { MdBook } from 'react-icons/md';
import { Link } from 'react-router-dom';

const AddedClassWorkCard = ({ item }) => {
  const { workTitle, createdAt } = item;
  return (
    <section>
      <Link to="/class-details/added-class-work-details">
        <Card
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
          }}
          className="w-full flex flex-row items-center gap-4 p-4 cursor-pointer rounded-md"
        >
          <MdBook
            color="white"
            size={40}
            className="p-[10px] bg-indigo-500 rounded-full cursor-pointer"
          />
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col">
              <Typography variant="h6">{workTitle}</Typography>
              <Typography variant="paragraph" className="text-xs">
                {createdAt.slice(0, 10)}
              </Typography>
            </div>
            <FiTrash2
              color="red"
              size={40}
              className="p-[10px] hover:bg-[#dddeee] rounded-full cursor-pointer"
            />
          </div>
        </Card>
      </Link>
    </section>
  );
};

export default AddedClassWorkCard;
