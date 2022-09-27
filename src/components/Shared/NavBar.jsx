import { Avatar } from '@material-tailwind/react';
import { BsPlusLg } from 'react-icons/bs';
import { HiMenuAlt4 } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import userImg from '../../assets/user.jpeg';

const NavBar = () => {
  return (
    <section
      style={{
        boxShadow: 'rgb(228 232 247 / 40%) 0px 0px 80px',
      }}
      className="w-full py-3 px-2 lg:px-8  bg-[rgba(255,255,255,0.86)] fixed top-0 z-50"
    >
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link
          to="/"
          className="mr-4 cursor-pointer flex justify-center items-center gap-x-2 text-lg md:text-2xl"
        >
          <HiMenuAlt4 />
          <div className="text-gray-700 inline-flex items-center gap-x-2">
            <div className="">
              <span className="text-blue-500">G</span>
              <span className="text-red-600">o</span>
              <span className="text-orange-500">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-600">e</span>
            </div>
            Classroom
          </div>
        </Link>
        <div className="flex items-center gap-x-3">
          <BsPlusLg
            size={40}
            className="p-[10px] hover:bg-[#dddeee] rounded-full cursor-pointer"
          />
          <Avatar
            className="h-11 w-11 p-1 hover:bg-[#dddeee] rounded-full cursor-pointer"
            src={userImg}
            alt="avatar"
            variant="circular"
          />
        </div>
      </div>
    </section>
  );
};
export default NavBar;
