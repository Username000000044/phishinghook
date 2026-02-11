import { Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { AnyFieldApi } from "@tanstack/react-form";

interface AuthFieldProps {
  field: AnyFieldApi;
  placeholder?: string;
  type?: "text" | "password";
  autoComplete: string;
}

export function AuthField({
  field,
  placeholder,
  type,
  autoComplete,
}: AuthFieldProps) {
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
      {isInvalid && <FieldError errors={field.state.meta.errors}></FieldError>}
    </Field>
  );
}
