import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BsFolderFill, BsTrash2 } from 'react-icons/bs';
import { GrLineChart } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import banner from '../../assets/Honors.jpg';

const ClassCard = ({ item, refetch }) => {
  const { classTitle, imgURL, _id } = item;
  const deleteClassHandler = async (e, classId) => {
    e.preventDefault();
    try {
      const deletedConfirmation = await axios.delete(
        `http://localhost:5001/api/v1/class/${classId}`
      );
      console.log(deletedConfirmation?.data);
      if (deletedConfirmation?.data?.result?.deletedCount > 0) {
        toast.success('Class deleted successfully.');
      } else {
        toast.error('error' + deletedConfirmation?.data.result?.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    refetch();
  };
  return (
    <Link to="/class-details">
      <Card className="w-[310px] shadow rounded-md hover__effect">
        <div
          style={{
            backgroundImage: `url(${imgURL || banner})`,
          }}
          className="h-[120px] w-full rounded-t-md bg-cover bg-center bg-no-repeat flex justify-between items-center px-5 text-white"
        >
          <Typography variant="h4" className="capitalize">
            {classTitle}
          </Typography>

          <BsTrash2
            onClick={(e) => deleteClassHandler(e, _id)}
            size={40}
            className="p-[10px] hover:bg-gray-600 rounded-full cursor-pointer"
          />
        </div>

        <CardBody className="text-center py-[70px]"></CardBody>
        <CardFooter divider className="flex items-center justify-end py-2">
          <Typography variant="small" color="gray" className="flex gap-x-5">
            <span className="p-[8px] hover:bg-[#dddeee] rounded-full cursor-pointer">
              <GrLineChart size={22} />
            </span>
            <span className="p-[8px] hover:bg-[#dddeee] rounded-full cursor-pointer">
              <BsFolderFill size={22} />
            </span>
          </Typography>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ClassCard;
