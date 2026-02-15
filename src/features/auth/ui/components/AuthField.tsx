import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AnyFieldApi } from "@tanstack/react-form";

interface AuthFieldProps {
  field: AnyFieldApi;
  placeholder?: string;
  type?: "text";
  autoComplete: string;
}

export function AuthField({
  field,
  placeholder,
  type,
  autoComplete,
}: AuthFieldProps) {
  const rawErrors = field.state.meta.errors; // an array of errs

  // Takes both zod errors and server errors and translates them into strings to be presented in UI
  const errorMessages = rawErrors.map(
    (
      err, // goes through all errors
    ) =>
      typeof err === "object" && err !== null && "message" in err //if is an object, isn't null and object looks like  { message: "blah blah" }
        ? (err as any).message // if above code is true (is a Zod object) take just message from object. (err as any) -> tells object I KNOW the object has message propery. Message is a string
        : String(err), // if above code is false (message came from server / is already a string or num) make sure it's a string
  );

  // if user has touched the field and if there are errors
  const isInvalid = !!(
    field.state.meta.isTouched && field.state.meta.errors.length
  );

  return (
    <Field data-invalid={isInvalid}>
      <Input
        className="h-10 rounded-none"
        id={field.name}
        name={field.name}
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        placeholder={placeholder}
        type={type}
        aria-invalid={isInvalid}
        autoComplete={autoComplete}
      />
      {isInvalid && <FieldError>{errorMessages.join(", ")}</FieldError>}
    </Field>
  );
}
