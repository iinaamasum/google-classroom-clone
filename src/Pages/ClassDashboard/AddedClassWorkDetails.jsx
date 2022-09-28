import { Button, Typography } from '@material-tailwind/react';
import React from 'react';
import { AiOutlineDownload, AiOutlineEye } from 'react-icons/ai';
import { MdBook } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/Shared/NavBar';

const AddedClassWorkDetails = () => {
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <section className="max-w-[800px] mx-auto px-4 mt-[110px]">
        <div className="border-b-[2px] border-indigo-500">
          <div className="flex items-center gap-4">
            <MdBook
              color="white"
              size={40}
              className="p-[10px] bg-indigo-500 rounded-full cursor-pointer"
            />
            <Typography variant="h4">Work Title</Typography>
          </div>
          <Typography
            variant="paragraph"
            className="leading-5 mt-4 mb-2 text-gray-700"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dolor
            magnam, aspernatur deserunt explicabo iusto ipsum totam eveniet
            voluptate. Voluptas non ipsa magnam alias perferendis sit labore
            velit, dolores recusandae!
          </Typography>
        </div>
        <div className="border-b-[2px] border-indigo-500">
          <div className="w-[300px] h-20 my-4 border-[1px] border-opacity-50 border-gray-400 rounded-md flex items-center justify-center cursor-pointer">
            <Typography variant="paragraph">Attachment Name</Typography>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6 my-4">
            <div className="inline-flex items-center gap-1 text-gray-600">
              <AiOutlineEye size={25} /> 3
            </div>
            <div className="inline-flex items-center gap-1 text-gray-600">
              <AiOutlineDownload size={20} /> 1
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate(-1)}
              className="h-[30px] min-h-6 px-5 capitalize text-[15px] inline-flex items-center justify-center"
              variant="filled"
              color="indigo"
            >
              Go Back
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddedClassWorkDetails;
