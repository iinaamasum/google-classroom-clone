import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from '@material-tailwind/react';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { HiMenuAlt4 } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import userImg from '../../assets/user.jpeg';
import auth from '../../firebase.init';
import AddClassModal from '../../Pages/Classes/AddClassModal';
import JoinClassModal from '../../Pages/Classes/JoinClassModal';
import LoadingComponent from './LoadingComponent';

const NavBar = ({ refetch }) => {
  const [open, setOpen] = useState(false);
  const [joinClassModalOpen, setJoinClassModalOpen] = useState(false);
  const [user, userLoading] = useAuthState(auth);
  if (userLoading) {
    return <LoadingComponent />;
  }

  const handleOpen = () => setOpen(!open);
  const handleJoinClassModalOpen = () =>
    setJoinClassModalOpen(!joinClassModalOpen);
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
              <span className="text-blue-500">S</span>
              <span className="text-red-600">h</span>
              <span className="text-orange-500">i</span>
              <span className="text-blue-500">k</span>
              <span className="text-green-500">h</span>
              <span className="text-red-600">a</span>
              <span className="text-indigo-600">o</span>
            </div>
            Classroom
          </div>
        </Link>
        {user && (
          <div className="flex items-center gap-x-3">
            <Menu>
              <MenuHandler>
                <Button className="bg-[#fff] hover:bg-[#dddeee] rounded-full cursor-pointer shadow-none hover:shadow-none h-10 w-10 text-current inline-flex items-center justify-center text-4xl font-thin p-0">
                  +
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem onClick={handleOpen}>Create Class</MenuItem>
                <MenuItem onClick={handleJoinClassModalOpen}>
                  Join Class
                </MenuItem>
              </MenuList>
            </Menu>

            <Menu>
              <MenuHandler>
                <Avatar
                  as={Button}
                  className="h-11 w-11 p-1 hover:bg-[#dddeee] rounded-full cursor-pointer"
                  src={userImg}
                  alt="avatar"
                  variant="circular"
                />
              </MenuHandler>
              <MenuList>
                <MenuItem>{user?.email}</MenuItem>
                <MenuItem onClick={() => signOut(auth)}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </div>
        )}
      </div>
      {open && (
        <AddClassModal open={open} handleOpen={handleOpen} refetch={refetch} />
      )}
      {joinClassModalOpen && (
        <JoinClassModal
          joinClassModalOpen={joinClassModalOpen}
          handleJoinClassModalOpen={handleJoinClassModalOpen}
          refetch={refetch}
        />
      )}
    </section>
  );
};
export default NavBar;
