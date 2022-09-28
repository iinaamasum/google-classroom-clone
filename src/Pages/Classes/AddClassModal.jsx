import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from '@material-tailwind/react';

import { useForm } from 'react-hook-form';

const AddClassModal = ({ handleOpen, open }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {};
  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="min-w-[350px] sm:min-w-[450px]"
      >
        <DialogHeader className="w-full flex items-center justify-center text-3xl">
          Create Class
        </DialogHeader>
        <DialogBody className="pb-2">
          <form
            id="register-student"
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
                type="number"
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
        <DialogFooter className="justify-center w-full md:w-[90%] mx-auto px-4">
          <div className="grid grid-cols-2 gap-x-4 w-full px-4">
            <Button
              variant="red"
              color="red"
              onClick={handleOpen}
              className="h-[40px] min-h-16 flex items-center justify-center"
            >
              <span>Cancel</span>
            </Button>
            <Button
              form="register-student"
              type="submit"
              color="blue"
              onClick={handleOpen}
              className="h-[40px] min-h-16 flex items-center justify-center"
            >
              <span>Create Now</span>
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default AddClassModal;