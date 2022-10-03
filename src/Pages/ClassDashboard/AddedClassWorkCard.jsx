import { Card, Typography } from '@material-tailwind/react';
import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';
import { FiTrash2 } from 'react-icons/fi';
import { MdBook } from 'react-icons/md';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const AddedClassWorkCard = ({ item, refetchClassWork }) => {
  const { workTitle, createdAt, _id } = item;
  const deleteClassWorkHandler = async (e, workId, workTitle) => {
    e.preventDefault();
    swal({
      title: 'Are you sure?',
      text: `Once deleted, you will not be able to recover this class work -- "${workTitle.toUpperCase()}"!`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        try {
          const deletedConfirmation = await axios.delete(
            `http://localhost:5001/api/v1/class-work/${workId}`
          );

          if (deletedConfirmation?.data?.result?.deletedCount > 0) {
            swal({
              title: 'Deletion process completed.',
              text: `${workTitle.toUpperCase()} class work has been deleted!!`,
              icon: 'success',
            });
          } else {
            swal({
              title: 'Error occurred',
              text: `${workTitle.toUpperCase()} class work deletion stopped by you. Error ${
                deletedConfirmation?.data.result?.message
              }. Please check your network connection!`,
              icon: 'error',
            });
            toast.error();
          }
          refetchClassWork();
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        swal({
          title: 'Deletion Stopped',
          text: `${workTitle.toUpperCase()} class work deletion stopped by you!`,
          icon: 'error',
        });
      }
    });

    refetchClassWork();
  };
  return (
    <section>
      <Link to={`/class-details/added-class-work-details/${_id}`}>
        <Card
          style={{
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
          }}
          className="w-full flex flex-row items-center gap-4 p-4 cursor-pointer rounded-md"
        >
          <MdBook
            color="white"
            size={40}
            className="p-[10px] bg-indigo-500 rounded-full cursor-pointer"
          />
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col">
              <Typography variant="h6">{workTitle.slice(0, 25)}</Typography>
              <Typography variant="paragraph" className="text-xs">
                {createdAt.slice(0, 10)}
              </Typography>
            </div>
            <FiTrash2
              onClick={(e) => deleteClassWorkHandler(e, _id, workTitle)}
              color="red"
              size={40}
              className="p-[10px] hover:bg-[#dddeee] rounded-full cursor-pointer"
            />
          </div>
        </Card>
      </Link>
    </section>
  );
};

export default AddedClassWorkCard;
