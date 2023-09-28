import { useState } from "react";
import EditForm from "./EditForm";
import SpinnerGrey from "../assets/spinner-grey.svg";

import { OfficesResponse, deleteOffice } from "../mock";

export default function Card(props: {
  office: OfficesResponse["data"][0];
  offices: OfficesResponse["data"];
  setOffices: React.Dispatch<
    React.SetStateAction<OfficesResponse["data"] | undefined>
  >;
  showNotification: (message: string, code: number) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formIsActive, setFormIsActive] = useState(false);

  const removeOffice = async (id: string) => {
    setIsLoading(true);
    try {
      const response = await deleteOffice(id);
      props.showNotification(response.message, 200);
      props.setOffices((current) =>
        current?.filter((office) => office.id !== props.office.id)
      );
      // setIsLoading(false);
    } catch (error: any | unknown) {
      setIsLoading(false);
      props.showNotification(error.message, 404);
    }
  };

  return (
    <div className="shadow-lg w-full rounded-lg overflow-hidden bg-white">
      {formIsActive ? (
        <EditForm
          setFormIsActive={setFormIsActive}
          office={props.office}
          offices={props.offices}
          setOffices={props.setOffices}
          showNotification={props.showNotification}
        />
      ) : (
        <>
          <button
            onClick={() => setIsOpen((current) => !current)}
            className={`${
              isOpen ? "bg-primary-grey" : "bg-white"
            } w-full flex justify-between items-center p-6 shadow-xl transition-all duration-500 z-50`}
          >
            <div className="text-left">
              <h4
                className={`text-[24px] font-bold ${
                  isOpen ? "text-white" : "text-primary-darkblue"
                }`}
              >
                {props.office.title}
              </h4>
              <p className={`${isOpen ? "text-white" : "text-primary-grey"}`}>
                {props.office.address}
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className={`w-6 h-6 transition-all ${
                isOpen ? "text-white rotate-180" : "text-accent-blue"
              }`}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>

          <div
            className={`flex flex-col gap-3 items-start ${
              isOpen ? "max-h-screen p-6" : "max-h-0 px-6"
            } transition-all duration-500`}
          >
            <h5 className="text-primary-darkblue font-bold text-[20px]">
              {props.office.detail.fullname}
            </h5>
            <p className="text-primary-darkblue text-[16px]">
              {props.office.detail.job}
            </p>
            <p className="text-accent-blue text-[16px]">
              {props.office.detail.email}
            </p>
            <p className="text-primary-darkblue text-[16px]">
              {props.office.detail.phone}
            </p>
            <hr className="border-primary-lightgrey w-full" />
            <div className="flex w-full justify-between items-center mt-2">
              <button
                onClick={() => setFormIsActive(true)}
                className="text-[12px] text-primary-grey flex justify-between items-center gap-2"
              >
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
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
                </svg>
                EDIT
              </button>
              {isLoading ? (
                <button
                  onClick={() => removeOffice(`${props.office.id}`)}
                  className="text-[12px] text-accent-red flex justify-center items-center gap-2 w-20"
                >
                  <img
                    className="w-[20px]"
                    src={SpinnerGrey}
                    alt="spinner-grey"
                  />
                </button>
              ) : (
                <button
                  onClick={() => removeOffice(`${props.office.id}`)}
                  className="text-[12px] text-accent-red flex justify-between items-center gap-2 w-20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-accent-red"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                  DELETE
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
