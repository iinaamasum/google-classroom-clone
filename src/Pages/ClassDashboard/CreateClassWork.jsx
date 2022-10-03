import {
  Button,
  Card,
  Input,
  Textarea,
  Tooltip,
  Typography,
} from '@material-tailwind/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FiUpload } from 'react-icons/fi';
import { MdCancel } from 'react-icons/md';
import LoadingComponent from '../../components/Shared/LoadingComponent';
import auth from '../../firebase.init';

const CreateClassWork = ({
  createWork,
  setCreateWork,
  classId,
  refetchClassWork,
}) => {
  const [workFile, setWorkFile] = useState(null);
  const { handleSubmit, register } = useForm();
  const [user, userLoading] = useAuthState(auth);

  if (userLoading) {
    return <LoadingComponent />;
  }

  const onSubmit = async (data) => {
    if (data.workTitle === '') {
      toast.error('Work Title not provided.');
      return;
    }
    if (data.workDetails === '') {
      toast.error('Work details should be filled.');
      return;
    }
    let path = '',
      filename = '';
    if (workFile) {
      let classWorkResponse;
      try {
        const formData = new FormData();
        formData.append('workFile', workFile);
        classWorkResponse = await axios
          .post('http://localhost:5001/api/v1/class-work/file-upload', formData)
          .then((res) => res.data);
        console.log('first', classWorkResponse);
      } catch (error) {
        toast.error(error.message);
        return;
      }
      if (!classWorkResponse) return;
      path = classWorkResponse.file.path;
      filename = classWorkResponse.file.filename;
    }

    console.log(path, filename);

    try {
      const postingWorkData = {
        ...data,
        workFileName: filename,
        path,
        classId,
        userEmail: user.email,
      };
      console.log(postingWorkData);
      const uploadClassWorkWithFile = await axios
        .post('http://localhost:5001/api/v1/class-work', postingWorkData)
        .then((res) => res.data);
      console.log(uploadClassWorkWithFile);
    } catch (error) {
      toast.error(error.message);
    }
    refetchClassWork();
    setCreateWork(!createWork);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0].size > 10000000) {
      toast.error(
        'File is too long to save into the server. Please a select a file less than 10MB.'
      );
      return;
    }
    setWorkFile(e.target.files[0]);
  };
  return (
    <section>
      <Card
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        }}
        className="p-4"
      >
        <Typography variant="h5" className="mt-2 mb-3">
          Announcement or class work creation form
        </Typography>
        <form
          id="create-work-form"
          onSubmit={handleSubmit(onSubmit)}
          className=""
        >
          <div className="">
            <div className="relative">
              <label htmlFor="">Title</label>
              <Input
                variant="standard"
                className="bg-gray-50 w-full focus:border-0 focus:outline-none focus:ring-0 px-3"
                placeholder="Announcement title"
                name="workTitle"
                {...register('workTitle')}
              />
            </div>
            <div className="my-3 relative">
              <label htmlFor="">Details</label>
              <Textarea
                color="blue"
                variant="standard"
                className="bg-gray-50 w-full focus:border-0 focus:outline-none"
                placeholder="Write down the announcement body"
                {...register('workDetails')}
              />
            </div>
          </div>
        </form>
        {workFile && (
          <div className="flex gap-x-5 items-center border-[1px] justify-center py-5 bg-gray-50 rounded-lg">
            <Tooltip content="Uploaded File Name">
              <p className="text-xl">{workFile.name}</p>
            </Tooltip>
            <Tooltip content="Cancel selection">
              <p>
                <MdCancel
                  size={25}
                  color="red"
                  className="cursor-pointer"
                  onClick={() => setWorkFile(null)}
                />
              </p>
            </Tooltip>
          </div>
        )}

        <div className="mt-5 mb-2 flex items-center justify-between">
          <div className="flex items-center gap-3 text-indigo-600 font-bold">
            <input
              className="hidden"
              onChange={(e) => handleFileChange(e)}
              type="file"
              name="workFile"
              id="class-work-file"
            />
            <Tooltip content="Click to upload file">
              <label htmlFor="class-work-file">
                <FiUpload
                  size={40}
                  className="p-[6px] hover:bg-[#dddeee] rounded-full cursor-pointer border-[1px] border-gray-400"
                />
              </label>
            </Tooltip>

            {/* <FiLink2
              size={40}
              className="p-[6px] hover:bg-[#dddeee] rounded-full cursor-pointer border-[1px] border-gray-400"
            /> */}
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
              type="submit"
              form="create-work-form"
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
