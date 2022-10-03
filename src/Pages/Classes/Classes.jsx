import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import LoadingComponent from '../../components/Shared/LoadingComponent';
import NavBar from '../../components/Shared/NavBar';
import auth from '../../firebase.init';
import ClassCard from './ClassCard';

const Classes = () => {
  const [user, userLoading] = useAuthState(auth);
  const [userSpecificClass, setUserSpecificClass] = useState([]);
  const {
    data: allAddedClass,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ['allClass'],
    async () =>
      await axios.get(`http://localhost:5001/api/v1/class`).then((res) => {
        return res.data.result;
      }),
    {
      retry: false,
    }
  );

  useEffect(() => {
    if (user.email && allAddedClass?.length > 0) {
      const tempClass = allAddedClass.filter((data) => {
        if (data.email === user.email) return data;
        let retVal = false;
        data.usersSubscribe.forEach((sub) => {
          if (user.email === sub) {
            retVal = true;
          }
        });
        if (retVal) return data;
      });
      setUserSpecificClass(tempClass);
    }
  }, [user, allAddedClass]);
  console.log(user);
  if (userLoading) {
    return <LoadingComponent />;
  }

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <NavBar refetch={refetch} />
      {userSpecificClass ? (
        <section>
          <div className="flex flex-wrap gap-8 items-center mx-auto mt-[120px] px-4 md:px-10 mb-10">
            {userSpecificClass.map((item) => (
              <ClassCard item={item} key={item._id} refetch={refetch} />
            ))}
          </div>
        </section>
      ) : (
        ''
      )}
    </>
  );
};

export default Classes;
