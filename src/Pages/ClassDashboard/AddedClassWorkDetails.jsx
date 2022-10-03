import { Button, Tooltip, Typography } from '@material-tailwind/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import fileDownload from 'js-file-download';
import React from 'react';
import { AiOutlineCloudDownload } from 'react-icons/ai';
import { MdBook } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../../components/Shared/LoadingComponent';
import NavBar from '../../components/Shared/NavBar';

const AddedClassWorkDetails = () => {
  const { workId } = useParams();
  console.log(workId);
  const navigate = useNavigate();

  const { data: classWorkData, isLoading } = useQuery(
    ['classWorkData'],
    async () =>
      await axios
        .get(`http://localhost:5001/api/v1/class-work/${workId}`)
        .then((res) => res.data)
  );

  const handleFileDownload = async (path, fileName) => {
    await axios
      .get(`http://localhost:5001/api/v1/class-work/file-download/${fileName}`)
      .then((res) => fileDownload(res.data, fileName));
  };

  console.log(classWorkData);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <NavBar />
      {classWorkData.status === 'success' ? (
        <>
          <section className="max-w-[800px] mx-auto px-4 mt-[110px]">
            <div className="border-b-[2px] border-indigo-500">
              <div className="flex items-center gap-4">
                <MdBook
                  color="white"
                  size={40}
                  className="p-[10px] bg-indigo-500 rounded-full cursor-pointer"
                />
                <Typography variant="h4">
                  {classWorkData.result.workTitle}
                </Typography>
              </div>
              <Typography
                variant="paragraph"
                className="leading-5 mt-4 mb-2 text-gray-700"
              >
                {classWorkData.result.workDetails}
              </Typography>

              <Typography
                variant="paragraph"
                className="leading-5 mt-4 mb-2 text-gray-700"
              >
                Posted By: {classWorkData.result.userEmail}
              </Typography>
            </div>
            <>
              {classWorkData.result?.path && (
                <div className="border-b-[2px] border-indigo-500">
                  <Tooltip content="Click to download the file">
                    <div
                      onClick={() =>
                        handleFileDownload(
                          classWorkData.result.path,
                          classWorkData.result.workFileName
                        )
                      }
                      className="w-[300px] h-20 my-4 border-[1px] border-opacity-50 border-gray-400 rounded-md flex items-center justify-center cursor-pointer gap-x-5"
                    >
                      <Typography variant="paragraph" className="text-2xl">
                        {classWorkData.result.workFileName.split('-')[2]}
                      </Typography>
                      <AiOutlineCloudDownload size={28} />
                    </div>
                  </Tooltip>
                </div>
              )}
            </>
            <div className="flex items-center justify-end mt-2">
              {/* <div className="flex items-center gap-6 my-4">
                <div className="inline-flex items-center gap-1 text-gray-600">
                  <AiOutlineEye size={25} /> 3
                </div>
                <div className="inline-flex items-center gap-1 text-gray-600">
                  <AiOutlineDownload size={20} /> 1
                </div>
              </div> */}
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => navigate(-1)}
                  className="h-[40px] min-h-6 px-10 capitalize text-[15px] inline-flex items-center justify-center"
                  variant="filled"
                  color="indigo"
                >
                  Go Back
                </Button>
              </div>
            </div>
          </section>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default AddedClassWorkDetails;
