import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from '@material-tailwind/react';
import axios from 'axios';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import LoadingComponent from '../../components/Shared/LoadingComponent';
import auth from '../../firebase.init';

const JoinClassModal = ({ joinClassModalOpen, handleJoinClassModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [user, userLoading] = useAuthState(auth);

  const onSubmit = async (data) => {
    try {
      const classData = await axios
        .get(`http://localhost:5001/api/v1/class/${data.classCode}`)
        .then((res) => res.data);
      if (classData.status === 'failed') {
        toast.error(classData.message);
      }
      let isCopy = false;
      classData.result.usersSubscribe.forEach((subUser) => {
        if (subUser === user.email) {
          toast.error('Already Subscribe to the account.');
          isCopy = true;
          return;
        }
      });
      if (isCopy) {
        return;
      }
      const newData = {
        ...classData.result,
        usersSubscribe: [...classData.result.usersSubscribe, user.email],
      };

      const updatedClassData = await axios
        .patch(`http://localhost:5001/api/v1/class/${newData._id}`, newData)
        .then((res) => res.data);

      if (updatedClassData.status === 'failed') {
        toast.error("Can't join the class.");
        return;
      }
      console.log(updatedClassData);
      if (updatedClassData.result.modifiedCount > 0) {
        toast.success('Joined the class successfully.');
        console.log(newData._id);
        navigate(`/class-details/${newData._id}`);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (userLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <Dialog
        className="min-w-[350px] sm:min-w-[450px]"
        open={joinClassModalOpen}
        handler={handleJoinClassModalOpen}
      >
        <DialogHeader className="w-full flex items-center justify-center text-3xl mt-5">
          Join Class
        </DialogHeader>
        <DialogBody className="pb-2">
          <form
            id="create-new-class"
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:w-[90%] mx-auto px-4"
          >
            {/* class code input section  */}
            <div className="relative">
              <Input
                label="Class Code"
                size="lg"
                type="text"
                className="bg-secondaryWhite"
                {...register('classCode', {
                  required: {
                    value: true,
                    message: '⚠ Class Code is required',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9]{24}$/,
                    message: 'Given code must have 24 chars.',
                  },
                })}
              />
              <label className="text-xs flex absolute top-[44px] left-[3px]">
                {errors.classCode?.type === 'required' && (
                  <span className="label-text-alt text-red-600">
                    {errors.classCode.message}
                  </span>
                )}
                {errors.classCode?.type === 'pattern' && (
                  <span className="label-text-alt text-red-600">
                    {errors.classCode.message}
                  </span>
                )}
              </label>
            </div>
            {/* user email section  */}
            <div className="mt-2 text-center">
              <p>Joining As - {user.email}</p>
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="justify-center w-full md:w-[90%] mx-auto px-4 mb-4">
          <div className="grid grid-cols-2 gap-x-4 w-full px-4">
            <Button
              variant="gradient"
              color="red"
              onClick={handleJoinClassModalOpen}
              className="h-[42px] min-h-16 flex items-center justify-center"
            >
              <span>Cancel</span>
            </Button>
            <Button
              form="create-new-class"
              type="submit"
              color="blue"
              className="h-[42px] min-h-16 flex items-center justify-center"
            >
              <span>Join Class</span>
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default JoinClassModal;
