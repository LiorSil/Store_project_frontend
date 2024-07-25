import { useCallback, useEffect, useMemo, useState } from "react";
import Cookies from "universal-cookie";
import { useSelector, useDispatch } from "react-redux";
import { setAccount, updateAccount } from "../../../redux/reducers/account";
import API_BASE_URL from "../../../constants/serverUrl";
import { createSelector } from "reselect";
import { useForm, useFormState } from "react-hook-form";

const useAccount = () => {
  const cookies = useMemo(() => new Cookies(), []);
  const dispatch = useDispatch();

  // Memoized selector using reselect
  const selectAccountState = createSelector(
    (state) => state.account,
    (account) => ({
      oldAccount: account.oldAccount,
      formData: account.formData,
    })
  );
  const { oldAccount, formData } = useSelector(selectAccountState);

  // Form management using react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    defaultValues: oldAccount,
  });

  // Get the dirty state of the form
  const { isDirty } = useFormState({ control });

  // Component state for loading, confirmation dialog, and notice message
  const [loading, setLoading] = useState(true);
  const [confirmMessage, setConfirmMessage] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState({ open: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/users/getUser`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.get("token"),
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (typeof data !== "object" || Array.isArray(data)) {
          throw new Error("Invalid data format");
        }

        // Batch updating form values
        Object.keys(data).forEach((key) => {
          setValue(key, data[key]);
        });

        dispatch(setAccount(data));
      } catch (error) {
        console.error("Error fetching user data: ", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cookies, dispatch, setValue]);

  const handleConfirmOrder = useCallback(async () => {
    setLoading(true); // Start loading
    try {
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.get("token"),
        },
        body: JSON.stringify(formData),
      };

      const response = await fetch(`${API_BASE_URL}/users/updateUser`, options);
      if (response.ok) {
        const data = await response.json();
        dispatch(updateAccount(data));
        setConfirmMessage(false);
        setNoticeMessage({
          open: true,
          message: "Successfully updated user",
          icon: "CheckCircleIcon",
          color: "green",
        });
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      let errorMessage = await error.message;
      if (errorMessage.includes("412"))
        errorMessage = "412 - Cannot update guest user.";
      setConfirmMessage(false);
      setNoticeMessage({
        open: true,
        message: errorMessage,
        icon: "ErrorIcon",
        color: "red",
      });
    } finally {
      setLoading(false); // End loading
    }
  }, [cookies, dispatch, formData]);

  const handleOnSubmit = useCallback(
    async (updatedAccountDetails) => {
      dispatch(updateAccount(updatedAccountDetails));
      setConfirmMessage(true);
    },
    [dispatch]
  );

  return {
    register,
    handleSubmit,
    errors,
    isDirty,
    loading,
    confirmMessage,
    setConfirmMessage,
    noticeMessage,
    setNoticeMessage,
    handleConfirmOrder,
    handleOnSubmit,
  };
};

export default useAccount;
