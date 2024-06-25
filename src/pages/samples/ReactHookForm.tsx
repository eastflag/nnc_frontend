import {SubmitHandler, useForm} from "react-hook-form";
import styles from "./ReactHookForm.module.css"

type Inputs = {
    example: string,
    exampleRequired: string,
};

export const ReactHookForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

    console.log(watch("example")) // watch input value by passing the name of it

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <input className={styles.input} defaultValue="test" {...register("example")} />

            {/* include validation with required or other standard HTML validation rules */}
            <input className={styles.input} {...register("exampleRequired", { required: true })} />
            {/* errors will return when field validation fails  */}
            {errors.exampleRequired && <span>This field is required</span>}

            <button className={styles.submit} type="submit">제출</button>
        </form>
    );
}