import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { AnyFieldApi } from "@tanstack/react-form";
import { EyeOffIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

interface AuthFieldProps {
  field: AnyFieldApi;
  placeholder?: string;
  type?: "text" | "password" | "checkbox";
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

  const [visible, setVisible] = useState(false);

  if (type == "password") {
    return (
      <Field data-invalid={isInvalid} className="gap-1">
        <FieldLabel>{capitalizeFirstLetter(field.name)}</FieldLabel>
        <InputGroup className="rounded-none h-10 !bg-foreground text-secondary rounded-md">
          <InputGroupInput
            id={field.name}
            name={field.name}
            value={field.state.value}
            onBlur={field.handleBlur}
            onChange={(e) => field.handleChange(e.target.value)}
            placeholder={placeholder}
            type={visible ? "text" : "password"}
            aria-invalid={isInvalid}
            autoComplete={autoComplete}
          />
          <InputGroupAddon align="inline-end">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="hover:cursor-pointer"
              onClick={() => setVisible(!visible)}
            >
              {visible ? <EyeIcon /> : <EyeOffIcon />}
            </Button>
          </InputGroupAddon>
        </InputGroup>

        {isInvalid && <FieldError>{errorMessages.join(", ")}</FieldError>}
      </Field>
    );
  } else {
    return (
      <Field data-invalid={isInvalid} className="gap-1">
        <FieldLabel>{capitalizeFirstLetter(field.name)}</FieldLabel>
        <Input
          className="h-10 !bg-foreground text-secondarys"
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
}

function capitalizeFirstLetter(val: any) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
