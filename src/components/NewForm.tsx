import { useState } from "react";
import { useForm } from "react-hook-form";
import { AddOfficeBody } from "../mock";
import { addOffice, OfficesResponse } from "../mock";
import { v4 as uuid } from "uuid";

import SpinnerWhite from "../assets/spinner-white.svg";

export default function NewForm(props: {
  setOffices: React.Dispatch<
    React.SetStateAction<OfficesResponse["data"] | undefined>
  >;
  showNotification: (message: string, code: number) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [formIsActive, setFormIsActive] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddOfficeBody>();

  const onSubmit = async (data: AddOfficeBody) => {
    setIsLoading(true);
    try {
      props.setOffices((current: OfficesResponse["data"] | any) => [
        ...current,
        {
          id: uuid(),
          title: data.title,
          address: data.address,
          detail: {
            fullname: data.fullname,
            job: data.job,
            email: data.email,
            phone: data.phone,
          },
        },
      ]);
      const response = await addOffice(data);
      props.showNotification(response.message, 200);
      setFormIsActive(false);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!formIsActive ? (
        <button
          onClick={() => setFormIsActive(true)}
          className="flex justify-between items-center bg-accent-blue text-white font-light w-full px-6 py-4 rounded-lg shadow-md"
        >
          Add New Location
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      ) : (
        <div className="bg-white p-6 w-full shadow-lg rounded-lg">
          <form
            action="submit"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-start"
          >
            <div className="flex justify-between mb-8 w-full">
              <b className="text-[16px] text-primary-darkblue">New Location</b>
              <button onClick={() => setFormIsActive(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-primary-grey"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="w-full text-left relative mb-6">
              <label htmlFor="title" className="text-[16px]">
                Title <span className="text-primary-grey font-regular">*</span>
              </label>{" "}
              <input
                id="title"
                defaultValue=""
                placeholder="Headquarters"
                {...register("title", {
                  required: {
                    value: true,
                    message: "Title is a required field",
                  },
                })}
                className={`w-full h-[40px] p-2 rounded-md bg-white shadow-sm border outline-none  transition-all ${
                  errors.title?.type === "required"
                    ? "border-accent-red focus:border-accent-red"
                    : "border-primary-grey focus:border-accent-blue"
                }`}
              />
              {errors.title?.type === "required" && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-accent-red absolute right-2 top-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p role="alert" className="text-accent-red text-[12px]">
                    {errors?.title.message}
                  </p>
                </>
              )}
            </div>
            <div className="w-full text-left relative mb-6">
              <label htmlFor="address" className="text-[16px]">
                Address{" "}
                <span className="text-primary-grey font-regular">*</span>
              </label>{" "}
              <input
                id="address"
                defaultValue=""
                placeholder="3763 W. Dallas St."
                {...register("address", {
                  required: {
                    value: true,
                    message: "Address is a required field",
                  },
                })}
                className={`w-full h-[40px] p-2 rounded-md bg-white shadow-sm border outline-none  transition-all ${
                  errors.address?.type === "required"
                    ? "border-accent-red focus:border-accent-red"
                    : "border-primary-grey focus:border-accent-blue"
                }`}
              />
              {errors.address?.type === "required" && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-accent-red absolute right-2 top-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p role="alert" className="text-accent-red text-[12px]">
                    {errors?.address.message}
                  </p>
                </>
              )}
            </div>
            <span className="text-accent-blue text-[12px] mb-4">
              CONTACT INFORMATION
            </span>
            <hr className="border-primary-lightgrey w-full mb-4" />
            <div className="w-full text-left relative mb-6">
              <label htmlFor="fullname" className="text-[16px]">
                Full Name{" "}
                <span className="text-primary-grey font-regular">*</span>
              </label>{" "}
              <input
                id="fullname"
                defaultValue=""
                placeholder="John Michael"
                {...register("fullname", {
                  required: {
                    value: true,
                    message: "Fullname is a required field",
                  },
                })}
                className={`w-full h-[40px] p-2 rounded-md bg-white shadow-sm border outline-none  transition-all ${
                  errors.fullname?.type === "required"
                    ? "border-accent-red focus:border-accent-red"
                    : "border-primary-grey focus:border-accent-blue"
                }`}
              />
              {errors.fullname?.type === "required" && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-accent-red absolute right-2 top-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p role="alert" className="text-accent-red text-[12px]">
                    {errors?.fullname.message}
                  </p>
                </>
              )}
            </div>
            <div className="w-full text-left relative mb-6">
              <label htmlFor="job" className="text-[16px]">
                Job Position{" "}
                <span className="text-primary-grey font-regular">*</span>
              </label>{" "}
              <input
                id="job"
                defaultValue=""
                placeholder="Software Tester"
                {...register("job", {
                  required: {
                    value: true,
                    message: "Job title is a required field",
                  },
                })}
                className={`w-full h-[40px] p-2 rounded-md bg-white shadow-sm border outline-none  transition-all ${
                  errors.job?.type === "required"
                    ? "border-accent-red focus:border-accent-red"
                    : "border-primary-grey focus:border-accent-blue"
                }`}
              />
              {errors.job?.type === "required" && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-accent-red absolute right-2 top-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p role="alert" className="text-accent-red text-[12px]">
                    {errors?.job.message}
                  </p>
                </>
              )}
            </div>
            <div className="w-full text-left relative mb-6">
              <label htmlFor="email" className="text-[16px]">
                Email <span className="text-primary-grey font-regular">*</span>
              </label>{" "}
              <input
                id="email"
                defaultValue=""
                placeholder="name@example.com"
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is a required field",
                  },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Entered value does not match email format",
                  },
                })}
                className={`w-full h-[40px] p-2 rounded-md bg-white shadow-sm border outline-none  transition-all ${
                  errors?.email
                    ? "border-accent-red focus:border-accent-red"
                    : "border-primary-grey focus:border-accent-blue"
                }`}
              />
              {errors.email && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-accent-red absolute right-2 top-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p role="alert" className="text-accent-red text-[12px]">
                    {errors.email.message}
                  </p>
                </>
              )}
            </div>
            <div className="w-full text-left relative mb-6">
              <label htmlFor="phone" className="text-[16px]">
                Phone <span className="text-primary-grey font-regular">*</span>
              </label>{" "}
              <input
                id="phone"
                defaultValue=""
                placeholder="(xxx) xxx-xxxx"
                type="number"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Phone is a required field",
                  },
                })}
                className={`w-full h-[40px] p-2 rounded-md bg-white shadow-sm border outline-none  transition-all ${
                  errors.phone?.type === "required"
                    ? "border-accent-red focus:border-accent-red"
                    : "border-primary-grey focus:border-accent-blue"
                }`}
              />
              {errors.phone?.type === "required" && (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-accent-red absolute right-2 top-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p role="alert" className="text-accent-red text-[12px]">
                    {errors?.phone.message}
                  </p>
                </>
              )}
            </div>
            <div className="flex justify-start">
              <button
                type="button"
                className="bg-accent-blue px-6 py-2 rounded-md text-white disabled:bg-primary-grey w-[80px] h-[40px] flex justify-center items-center"
                onClick={handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                {isLoading ? (
                  <img
                    className="w-[20px]"
                    src={SpinnerWhite}
                    alt="spinner-white"
                  />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
