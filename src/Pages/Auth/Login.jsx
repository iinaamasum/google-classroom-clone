import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  Typography,
} from '@material-tailwind/react';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  return (
    <section className="flex justify-center mt-32 container px-4 md:px-0 mx-auto">
      <Card
        style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
        className="w-full sm:w-[600px] mx-auto px-0 sm:px-10"
      >
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h2" className="text-center my-5">
            Log<span className="text-orange-600">in</span>
          </Typography>
          <Input label="Email" size="lg" />
          <Input label="Password" size="lg" />
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            color="indigo"
            fullWidth
            className="capitalize text-xl h-10 min-h-10 inline-flex items-center justify-center"
          >
            Login Now
          </Button>
          <div className="flex justify-between items-center my-3 w-[90%] mx-auto">
            <div className="border-b-2 border-black w-full"></div>
            <p className="mx-auto text-center text-slate-400 font-semibold px-2">
              OR
            </p>
            <div className="border-b-2 border-black w-full"></div>
          </div>
          <div className="">
            <div className="sm:flex justify-between text-center">
              <Button
                // onClick={() => {
                //   signInWithGoogle();
                // }}
                variant="outlined"
                color="indigo"
                className="w-full inline-flex justify-center items-center text-xl h-10 min-h-10 capitalize"
              >
                <FcGoogle size={20} className="mr-3" />
                Google
              </Button>
            </div>
          </div>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don't have an account?
            <Typography
              as="a"
              href="#signup"
              variant="small"
              color="blue"
              className="ml-1 font-bold"
            >
              Register Now
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </section>
  );
};

export default Login;
