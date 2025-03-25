import { FC, useEffect, useState } from "react";

import Loader from "@/components/Loader";

export type StatusObject = {
  message?: string;
  error?: boolean;
  loading?: boolean;
  loadingText?: string;
  saving?: boolean;
  savingText?: string;
};

interface Props {
  /**
   *
   * A response matching StatusObject is sent from the server after successful/failed
   * action and is used in rendering respective message
   *
   */
  status: StatusObject;

  // Show nofitication instead of static alert message
  notification?: boolean;

  // Close notification after a few seconds
  autoClose?: boolean;
  autoCloseDuration?: number;
}

const StatusMessage: FC<Props> = ({
  status = {},
  notification = false,
  autoClose = true,
  autoCloseDuration = 3000,
}) => {
  const [objState, setObjState] = useState<StatusObject>({});

  /**
   *
   * Init object state
   *
   */
  useEffect(() => {
    if (Object.keys(status)?.length > 0) {
      setObjState(status);
    }
  }, [status]);

  /**
   *
   * Hide alert message after few seconds
   *
   */
  useEffect(() => {
    if (notification && autoClose && objState?.message) {
      setTimeout(() => resetMessage(), autoCloseDuration);
    }
  }, [objState?.message, notification, autoClose, autoCloseDuration]);

  const resetMessage = () => {
    setObjState((prevState) => {
      return {
        ...prevState,
        message: "",
      };
    });
  };

  if (!notification) {
    const {
      message = "",
      error = false,
      loading = false,
      loadingText = "Loading...",
      saving = false,
      savingText = "Saving...",
    } = objState;

    const alertClass = error ? "danger" : "success";

    return (
      <>
        {!loading && !saving && message && (
          <div className={`alert alert-${alertClass}`}>
            <span
              className="flex flex-col flex-1"
              dangerouslySetInnerHTML={{ __html: message }}
            ></span>
            <span
              className="close"
              data-dismiss="alert"
              aria-label="close"
              onClick={() => resetMessage()}
            >
              &times;
            </span>
          </div>
        )}

        {loading && <Loader text={loadingText} />}

        {saving && <Loader text={savingText} />}
      </>
    );
  }

  return <></>;
};

export default StatusMessage;
