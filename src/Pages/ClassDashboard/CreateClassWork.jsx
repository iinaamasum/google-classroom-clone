import {
  Button,
  Card,
  Input,
  Textarea,
  Typography,
} from '@material-tailwind/react';
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
            Announcement or class work creation form
          </Typography>
          <div className="">
            <div className="">
              <label htmlFor="">Title</label>
              <Input
                variant="standard"
                className="bg-gray-50 w-full focus:border-0 focus:outline-none focus:ring-0 px-3"
                placeholder="Announcement title"
              />
            </div>
            <div className="my-3">
              <label htmlFor="">Details</label>
              <Textarea
                name=""
                color="blue"
                variant="standard"
                className="bg-gray-50 w-full focus:border-0 focus:outline-none"
                placeholder="Write down the announcement body"
              />
            </div>
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
