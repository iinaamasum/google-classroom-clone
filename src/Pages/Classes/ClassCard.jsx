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
import swal from 'sweetalert';
import banner from '../../assets/Honors.jpg';

const ClassCard = ({ item, refetch }) => {
  const { classTitle, imgURL, _id } = item;
  const deleteClassHandler = async (e, classId, classTitle) => {
    e.preventDefault();
    swal({
      title: 'Are you sure?',
      text: `Once deleted, you will not be able to recover this "${classTitle.toUpperCase()}"!`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const deletedConfirmation = await axios.delete(
            `http://localhost:5001/api/v1/class/${classId}`
          );
          console.log(deletedConfirmation?.data);
          if (deletedConfirmation?.data?.result?.deletedCount > 0) {
            swal(`${classTitle} class has been deleted!`, {
              icon: 'success',
            });
          } else {
            swal(
              `${classTitle} deletion stopped by you. Error ${deletedConfirmation?.data.result?.message}. Please check your network connection.`
            );
            toast.error();
          }
          refetch();
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        swal(`${classTitle.toUpperCase()} deletion stopped by you.`);
      }
    });

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
            onClick={(e) => deleteClassHandler(e, _id, classTitle)}
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
