import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from '@material-tailwind/react';
import axios from 'axios';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AddClassModal = ({ handleOpen, open }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const sendDoc = {
        ...data,
        email: 'iinaamasum@gmail.com',
      };
      const result = await axios.post(
        'http://localhost:5001/api/v1/class',
        sendDoc
      );
      if (result?.data?.status === 'success') {
        toast.success(
          `${result.data?.result?.classTitle.toUpperCase()} is created`
        );
      } else {
        toast.error(
          'Class is not created. Please check your internet connection'
        );
      }
    } catch (error) {
      toast.error(error?.message);
    }
    handleOpen();
  };
  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="min-w-[350px] sm:min-w-[450px]"
      >
        <DialogHeader className="w-full flex items-center justify-center text-3xl mt-5">
          Create Class
        </DialogHeader>
        <DialogBody className="pb-2">
          <form
            id="create-new-class"
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:w-[90%] mx-auto px-4"
          >
            {/* Class name input section  */}
            <div className="relative">
              <Input
                label="Class Title"
                size="lg"
                className="bg-secondaryWhite"
                {...register('classTitle', {
                  required: {
                    value: true,
                    message: '⚠ Please provide your class title.',
                  },
                })}
              />
              <label className="text-xs flex absolute top-[44px] left-[3px]">
                {errors.classTitle?.type === 'required' && (
                  <span className="label-text-alt text-red-600">
                    {errors.classTitle.message}
                  </span>
                )}
              </label>
            </div>
            {/* Section input section  */}
            <div className="mt-[24px] relative">
              <Input
                label="Section"
                size="lg"
                type="text"
                className="bg-secondaryWhite"
                {...register('section', {
                  required: {
                    value: true,
                    message: '⚠ Section is required',
                  },
                })}
              />
              <label className="text-xs flex absolute top-[44px] left-[3px]">
                {errors.section?.type === 'required' && (
                  <span className="label-text-alt text-red-600">
                    {errors.section.message}
                  </span>
                )}
              </label>
            </div>
            {/* Subject input section  */}
            <div className="mt-[24px] relative">
              <Input
                label="Subject"
                size="lg"
                type="text"
                className="bg-secondaryWhite"
                {...register('subject', {
                  required: {
                    value: true,
                    message: '⚠ Roll number is required',
                  },
                })}
              />
              <label className="text-xs flex absolute top-[44px] left-[3px]">
                {errors.subject?.type === 'required' && (
                  <span className="label-text-alt text-red-600">
                    {errors.subject.message}
                  </span>
                )}
              </label>
            </div>
            {/* Room number input section  */}
            <div className="mt-[24px] relative">
              <Input
                label="Room Number"
                size="lg"
                className="bg-secondaryWhite"
                {...register('roomNumber', {
                  required: {
                    value: true,
                    message: '⚠ Room number is required',
                  },
                })}
              />
              <label className="text-xs flex absolute top-[44px] left-[3px]">
                {errors.roomNumber?.type === 'required' && (
                  <span className="label-text-alt text-red-600">
                    {errors.roomNumber.message}
                  </span>
                )}
              </label>
            </div>
          </form>
        </DialogBody>
        <DialogFooter className="justify-center w-full md:w-[90%] mx-auto px-4 mb-4">
          <div className="grid grid-cols-2 gap-x-4 w-full px-4">
            <Button
              variant="red"
              color="red"
              onClick={handleOpen}
              className="h-[45px] min-h-16 flex items-center justify-center"
            >
              <span>Cancel</span>
            </Button>
            <Button
              form="create-new-class"
              type="submit"
              color="blue"
              className="h-[45px] min-h-16 flex items-center justify-center"
            >
              <span>Create Class</span>
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AddClassModal;
