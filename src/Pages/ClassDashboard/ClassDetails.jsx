import { Avatar, Card, Typography } from '@material-tailwind/react';
import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import userImg from '../../assets/user.jpeg';
import banner from '.././../assets/Honors.jpg';
import CreateClassWork from './CreateClassWork';

const ClassDetails = () => {
  const [createWork, setCreateWork] = useState(false);
  return (
    <section className="max-w-[1000px] mx-auto mt-[90px]">
      {/* class details upper portion  */}
      <div
        style={{
          backgroundImage: `url(${banner})`,
        }}
        className="h-[30vh] rounded-lg flex items-end justify-start p-5 text-white"
      >
        <Typography variant="h3">Test Class</Typography>
      </div>
      <div className="flex items-start justify-between gap-8 mt-5">
        {/* left side  */}
        <div className="w-[250px]">
          <div className="border-[1px] border-gray-500 rounded-md p-4">
            <Typography
              variant="paragraph"
              className="inline-flex justify-between items-center w-full text-sm"
            >
              Class Code{' '}
              <BsThreeDotsVertical size={20} className="cursor-pointer" />
            </Typography>
            <Typography variant="h6" className="text-indigo-500 font-bold mt-2">
              CSHDDKA
            </Typography>
          </div>
          <div className="border-[1px] border-gray-500 rounded-md p-4 mt-5">
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
          {createWork ? (
            <CreateClassWork
              createWork={createWork}
              setCreateWork={setCreateWork}
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
                  Announce something to your class
                </Typography>
              </Card>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClassDetails;
