import { Avatar, Card, Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import userImg from '../../assets/user.jpeg';
import LoadingComponent from '../../components/Shared/LoadingComponent';
import NavBar from '../../components/Shared/NavBar';
import AddedClassWorkCard from './AddedClassWorkCard';
import CreateClassWork from './CreateClassWork';

const ClassDetails = () => {
  const [createWork, setCreateWork] = useState(false);
  const { id } = useParams();

  const {
    data: classData,
    isLoading,
    isError,
  } = useQuery(['classData'], async () => {
    const res = await axios.get(`http://localhost:5001/api/v1/class/${id}`);
    return res.data.result;
  });

  const {
    data: allClassWork,
    isLoading: isLoadingClassWork,
    refetch: refetchClassWork,
  } = useQuery(
    ['allClassWork'],
    async () =>
      await axios
        .get(`http://localhost:5001/api/v1/class-work?classId=${id}`)
        .then((res) => res.data),
    {
      retry: false,
    }
  );
  useEffect(() => {
    if (!allClassWork) {
      return;
    }
  }, [allClassWork]);

  if (isLoadingClassWork) {
    return <LoadingComponent />;
  }

  console.log(allClassWork);

  if (isLoading) {
    return <LoadingComponent />;
  }
  if (isError) {
    toast.error('No class data found. Please add class first.');
  }
  const { classTitle, imgURL, _id } = classData;

  return (
    <>
      <NavBar />
      <section className="max-w-[1000px] mx-auto mt-[90px] min-h-screen px-4">
        {/* class details upper portion  */}
        <div
          style={{
            backgroundImage: `url(${imgURL})`,
          }}
          className="h-[20vh] md:h-[30vh] rounded-lg flex items-end justify-start p-5 text-white"
        >
          <Typography variant="h3" className="capitalize">
            {classTitle}
          </Typography>
        </div>
        <div className="flex items-start justify-between gap-8 mt-5">
          {/* left side  */}
          <div className="w-[250px] hidden md:block">
            <div className="border-[1px] border-opacity-50 border-gray-500 rounded-md p-4">
              <Typography
                variant="paragraph"
                className="inline-flex justify-between items-center w-full text-sm"
              >
                Class Code{' '}
                <BsThreeDotsVertical size={20} className="cursor-pointer" />
              </Typography>
              <Typography
                variant="h6"
                className="text-indigo-500 font-bold mt-2 text-sm"
              >
                {_id}
              </Typography>
            </div>
            <div className="border-[1px] border-opacity-50 border-gray-500 rounded-md p-4 mt-5">
              <Typography
                variant="paragraph"
                className="inline-flex justify-between items-center w-full text-sm"
              >
                Upcoming
              </Typography>
              <Typography
                variant="paragraph"
                className="text-gray-500 mt-2 text-sm"
              >
                No due work
              </Typography>
            </div>
          </div>
          {/* right side  */}
          <div className="w-full">
            <>
              {createWork ? (
                <CreateClassWork
                  createWork={createWork}
                  setCreateWork={setCreateWork}
                  classId={_id}
                  refetchClassWork={refetchClassWork}
                />
              ) : (
                <>
                  {/* create announcement card  */}
                  <Card
                    onClick={() => setCreateWork(!createWork)}
                    style={{
                      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
                    }}
                    className="w-full flex flex-row items-center gap-4 p-4 cursor-pointer hover:bg-[#e6e6eb69]"
                  >
                    <Avatar src={userImg} alt="avatar" variant="circular" />
                    <Typography variant="paragraph">
                      Announce something to the class
                    </Typography>
                  </Card>
                </>
              )}
            </>
            <div className="my-5 grid grid-cols-1 gap-5">
              {allClassWork?.status === 'success' &&
                allClassWork.result.map((item) => (
                  <AddedClassWorkCard
                    key={item._id}
                    item={item}
                    refetchClassWork={refetchClassWork}
                  />
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ClassDetails;
