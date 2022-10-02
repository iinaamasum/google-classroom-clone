import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from '@material-tailwind/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/Shared/NavBar';
import auth from '../../firebase.init';

const ProfileInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const onSubmit = async (data) => {};

  return (
    <>
      <NavBar />
      <section className="flex justify-center mt-32 container px-4 md:px-0 mx-auto">
        <Card
          style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
          className="w-full sm:w-[600px] mx-auto px-0 sm:px-10"
        >
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h2" className="text-center my-5">
              <span className="text-orange-600">Profile</span> Info
            </Typography>
            <form
              id="register-form"
              onSubmit={handleSubmit(onSubmit)}
              className=""
            >
              {/* Name section  */}
              <div className="relative">
                <Input
                  label="Full Name"
                  size="lg"
                  className="bg-secondaryWhite"
                  {...register('userName', {
                    required: {
                      value: true,
                      message: '⚠ Please enter your name.',
                    },
                  })}
                />
                <label className="text-xs flex absolute top-[44px] left-[3px]">
                  {errors.userName?.type === 'required' && (
                    <span className="label-text-alt text-red-600">
                      {errors.userName.message}
                    </span>
                  )}
                </label>
              </div>
              {/* contact number section  */}
              <div className="mt-[24px] relative">
                <Input
                  label="Contact Number"
                  size="lg"
                  className="bg-secondaryWhite"
                  {...register('contactNumber', {
                    required: {
                      value: true,
                      message: '⚠ Contact Number is required.',
                    },
                  })}
                />
                <label className="text-xs flex absolute top-[44px] left-[3px]">
                  {errors.contactNumber?.type === 'required' && (
                    <span className="label-text-alt text-red-600">
                      {errors.contactNumber.message}
                    </span>
                  )}
                </label>
              </div>
              {/* user email section  */}
              <div className="mt-2 text-center">
                <p>Joining As - {user.email}</p>
              </div>
            </form>
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              form="register-form"
              type="submit"
              variant="gradient"
              color="indigo"
              fullWidth
              className="capitalize text-xl h-10 min-h-10 inline-flex items-center justify-center"
            >
              Submit Info
            </Button>
          </CardFooter>
        </Card>
      </section>
    </>
  );
};

export default ProfileInfo;
