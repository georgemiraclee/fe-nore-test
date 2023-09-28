interface Notification {
  message: string;
  code: number;
}

export default function (props: {
  notification: Notification;
  setNotification: React.Dispatch<React.SetStateAction<Notification>>;
}) {
  return (
    <div
      className={`fixed top-0 left-0 w-screen ${
        props.notification.message !== "" && props.notification.code !== 0
          ? "h-[80px] opacity-100"
          : "h-[0px] opacity-0"
      } flex justify-center items-center bg-white gap-2 z-50 transition-all border-b border-primary-lightgrey`}
    >
      {props.notification.code === 404 ? (
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
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ) : props.notification.code !== 404 &&
        props.notification.message !== "" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-accent-blue"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      ) : null}

      <p className="uppercase text-[12px]">{props.notification.message}</p>
      <button
        onClick={() => props.setNotification({ message: "", code: 0 })}
        className="fixed right-4"
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
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>{" "}
      </button>
    </div>
  );
}
