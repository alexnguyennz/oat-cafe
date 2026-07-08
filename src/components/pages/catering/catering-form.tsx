import {
  FieldError,
  Form,
  InputGroup,
  TextField,
  TextArea,
  Toast,
  toast,
  Label,
  Button,
} from "@heroui/react";

export const CateringForm = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const entries = Array.from(formData.entries()).map(([key, value]) => [
      key,
      value.toString(),
    ]);

    const urlEncoded = new URLSearchParams(entries).toString();

    try {
      await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: urlEncoded,
      });

      form.reset();

      toast.success(
        "One of our team members will review your booking and be in contact with you shortly.",
      );
    } catch {
      toast.danger("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Toast.Provider />
      <Form onSubmit={onSubmit} className="space-y-6">
        <input type="hidden" name="form-name" value="contact" />

        <TextField
          isRequired
          validate={(value) => {
            if (value.length === 0) {
              return "Please enter a name.";
            }

            return null;
          }}
          className="w-full"
          name="name"
        >
          <Label className="text-accent-lightYellow text-lg">Name</Label>
          <InputGroup className="text-accent-lightYellow rounded-none bg-neutral-900">
            <InputGroup.Input className="w-full text-lg" />
          </InputGroup>
          <FieldError className="text-lg" />
        </TextField>

        <TextField
          isRequired
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address.";
            }

            return null;
          }}
          className="w-full"
          name="email"
        >
          <Label className="text-lg text-white">Email address</Label>
          <InputGroup className="text-accent-lightYellow rounded-none bg-neutral-900">
            <InputGroup.Input className="w-full text-lg" />
          </InputGroup>
          <FieldError className="text-lg" />
        </TextField>

        <TextField className="mb-4.5 w-full" name="phone-number">
          <Label className="text-lg text-white">Phone Number</Label>
          <InputGroup className="text-accent-lightYellow rounded-none bg-neutral-900">
            <InputGroup.Input className="w-full text-lg" />
          </InputGroup>
          <FieldError className="text-lg text-white" />
        </TextField>

        <TextField
          isRequired
          validate={(value) => {
            if (value.length === 0) {
              return "Please enter a message.";
            }

            return null;
          }}
          className="w-full"
          name="message"
        >
          <Label className="text-lg text-white">
            Any other requirements. (Please note any additional requests are
            subject to approval)
          </Label>
          <TextArea className="h-32 w-full text-lg" />
          <FieldError className="text-lg" />
        </TextField>

        <Button
          type="submit"
          size="lg"
          className="bg-white pb-0.5 font-serif text-lg font-semibold text-black"
        >
          Reserve my spot
        </Button>
      </Form>
    </>
  );
};
