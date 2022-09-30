import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from '@material-tailwind/react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { BsFolderFill, BsTrash } from 'react-icons/bs';
import { GrLineChart } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import banner from '../../assets/Honors.jpg';

const ClassCard = ({ item, refetch }) => {
  const { classTitle, imgURL, _id } = item;
  const navigate = useNavigate();
  const deleteClassHandler = async (e, classId, classTitle) => {
    e.preventDefault();
    swal({
      title: 'Are you sure?',
      text: `Once deleted, you will not be able to recover this class -- "${classTitle.toUpperCase()}"!`,
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
            swal({
              title: 'Deletion process completed.',
              text: `${classTitle.toUpperCase()} class has been deleted!!`,
              icon: 'success',
            });
          } else {
            swal({
              title: 'Error occurred',
              text: `${classTitle.toUpperCase()} class deletion stopped by you. Error ${
                deletedConfirmation?.data.result?.message
              }. Please check your network connection!`,
              icon: 'error',
            });
            toast.error();
          }
          refetch();
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        swal({
          title: 'Deletion Stopped',
          text: `${classTitle.toUpperCase()} class deletion stopped by you!`,
          icon: 'error',
        });
      }
    });

    refetch();
  };
  return (
    <section onClick={() => navigate(`/class-details/${_id}`)}>
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

          <BsTrash
            onClick={(e) => deleteClassHandler(e, _id, classTitle)}
            size={40}
            className="p-[10px] bg-white text-red-600 hover:bg-red-500 hover:text-white rounded-full cursor-pointer font-bold transition-all duration-200"
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
    </section>
  );
};

export default ClassCard;
