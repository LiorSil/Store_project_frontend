import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const Form = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({});
  const onSubmit = (data) => console.log("DATA:", { ...data });

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="firstName">First Name</label>
          <input
            {...register("firstName", {
              required: "First name is required",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "invalid first name",
              },
              validate: {
                check: (value) => value !== "admin" || "Nice try!",
              },
            })}
            noValidate
          />
          {errors.firstName && <p>{errors.firstName.message}</p>}
          <br />
          <label htmlFor="lastName">Last Name</label>
          <input
            {...register("lastName", {
              required: "Last name is required",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "invalid last name",
              },
            })}
            noValidate
          />
          {errors.lastName && <p>{errors.lastName.message}</p>}
          <br />
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: "email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email",
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}

          <br />

          <button type="submit">Submit</button>
        </form>

        <DevTool control={control} />
      </div>
    </>
  );
};

export default Form;
