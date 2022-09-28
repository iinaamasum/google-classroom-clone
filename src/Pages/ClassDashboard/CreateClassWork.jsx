import { Button, Card, Textarea, Typography } from '@material-tailwind/react';
import React from 'react';
import { FiLink2, FiUpload } from 'react-icons/fi';

const CreateClassWork = ({ createWork, setCreateWork }) => {
  return (
    <section>
      <Card
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        }}
        className="p-4"
      >
        <div className="">
          <Typography variant="h5" className="mt-2 mb-3">
            Announcement Details
          </Typography>
          <div className="">
            <Textarea
              name=""
              color="gray"
              variant="standard"
              style={{
                borderRadius: '0px',
                borderBottom: '3px solid rgb(57 73 171)',
              }}
              className="bg-gray-50 w-full focus:border-0 focus:outline-none"
              label="Write down the announcement"
            />
          </div>
        </div>
        <div className="my-2 flex items-center justify-between">
          <div className="flex items-center gap-3 text-indigo-600 font-bold">
            <FiUpload
              size={40}
              className="p-[6px] hover:bg-[#dddeee] rounded-full cursor-pointer border-[1px] border-gray-400"
            />
            <FiLink2
              size={40}
              className="p-[6px] hover:bg-[#dddeee] rounded-full cursor-pointer border-[1px] border-gray-400"
            />
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setCreateWork(!createWork)}
              className="h-[30px] min-h-6 px-4 capitalize text-[15px] inline-flex items-center justify-center text-red-500"
              variant="text"
            >
              Cancel
            </Button>
            <Button
              className="h-[30px] min-h-6 px-5 capitalize text-[15px] inline-flex items-center justify-center"
              variant="filled"
              color="indigo"
            >
              Post
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default CreateClassWork;
