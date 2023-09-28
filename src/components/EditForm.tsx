import { AddOfficeBody, OfficesResponse, updateOffice } from "../mock";
import { useForm } from "react-hook-form";
import SpinnerWhite from "../assets/spinner-white.svg";
import { useState } from "react";

export default function EditForm(props: {
  office: OfficesResponse["data"][0];
  offices: OfficesResponse["data"];
  setOffices: React.Dispatch<
    React.SetStateAction<OfficesResponse["data"] | undefined>
  >;
  setFormIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  showNotification: (message: string, code: number) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddOfficeBody>();

  const onSubmit = async (data: AddOfficeBody) => {
    setIsLoading(true);
    try {
      const updatedOffice = [...props.offices];
      const indexToUpdate = updatedOffice.findIndex(
        (office) => office.id == props.office.id
      );

      if (indexToUpdate !== -1) {
        updatedOffice[indexToUpdate] = {
          id: props.office.id,
          title: data.title,
          address: data.address,
          detail: {
            fullname: data.fullname,
            job: data.job,
            email: data.email,
            phone: data.phone,
          },
        };
        props.setOffices(updatedOffice);
      }

      const response = await updateOffice(props.office.id, data);
      props.showNotification(response.message, 200);
      setIsLoading(false);
    } catch (error: any | unknown) {
      props.showNotification(error.message, 404);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 w-full shadow-lg rounded-lg">
      <form
        action="submit"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start"
      >
        <div className="flex justify-between mb-8 w-full">
          <b className="text-[16px] text-primary-darkblue">New Location</b>
          <button onClick={() => props.setFormIsActive(false)}>
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
            defaultValue={props.office.title}
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
          {errors.title && (
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
            Address <span className="text-primary-grey font-regular">*</span>
          </label>{" "}
          <input
            id="address"
            defaultValue={props.office.address}
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
          {errors.address && (
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
        {/* FULL NAME */}
        <div className="w-full text-left relative mb-6">
          <label htmlFor="fullname" className="text-[16px]">
            Full Name <span className="text-primary-grey font-regular">*</span>
          </label>{" "}
          <input
            id="fullname"
            defaultValue={props.office.detail.fullname}
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
          {errors.fullname && (
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
            defaultValue={props.office.detail.job}
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
          {errors.job && (
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
            defaultValue={props.office.detail.email}
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
                {errors?.email.message}
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
            defaultValue={props.office.detail.phone}
            placeholder="(xxx) xxx-xxxx"
            type="text"
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
          {errors.phone && (
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
  );
}
