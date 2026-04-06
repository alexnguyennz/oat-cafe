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

export const ContactForm = () => {
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

      toast.success("We'll get back to you soon!");
    } catch {
      toast.danger("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Toast.Provider />
      <Form name="contact" onSubmit={onSubmit} className="space-y-6">
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
          <Label className="text-lg text-white">Name</Label>
          <InputGroup>
            <InputGroup.Input
              className="w-full text-xl"
              placeholder="Your name"
            />
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
          <InputGroup>
            <InputGroup.Input
              className="w-full text-xl"
              placeholder="Your email"
            />
          </InputGroup>
          <FieldError className="text-lg" />
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
          <Label className="text-lg text-white">Message</Label>
          <TextArea
            className="h-32 w-full text-xl"
            placeholder="Your message"
          />
          <FieldError className="text-lg" />
        </TextField>

        <Button type="submit" size="lg" className="text-xl">
          Get in touch
        </Button>
      </Form>
    </>
  );
};
