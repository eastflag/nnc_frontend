import {SubmitHandler, useForm} from "react-hook-form";
import styles from "./ReactHookForm.module.css"

type Inputs = {
  name: string,
  password: string,
};

export const ReactHookForm = () => {
  const {register, handleSubmit, watch, formState: {errors}} = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  console.log(watch("name")) // watch input value by passing the name of it

  return (
    <>
      <h3>Form Validation Sample: react-hook-form</h3>

      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input className={styles.input} defaultValue="" {...register("name", {required: true})} />
        {/* errors will return when field validation fails  */}
        {errors.name && <span>name is required</span>}

        {/* include validation with required or other standard HTML validation rules */}
        <input className={styles.input} {...register("password", {required: true})} />
        {/* errors will return when field validation fails  */}
        {errors.password && <span>password is required</span>}

        <button className={styles.submit} type="submit">제출</button>
      </form>
    </>
  );
}