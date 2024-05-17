import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const Form = () => {
  const { register, control } = useForm();

  return (
    <>
      <div>
        <form>
          <label htmlFor="firstName">First Name</label>
          <input {...register("firstName")} />
        </form>
        <DevTool control={control} />
      </div>
    </>
  );
};

export default Form;
