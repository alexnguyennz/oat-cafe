import { InputGroup, TextField, TextArea, Label } from "@heroui/react";
import { User, Mail } from "lucide-react";

export const ContactForm = () => {
  return (
    <>
      <TextField isRequired className="w-full" name="name">
        <Label>Name</Label>
        <InputGroup>
          <InputGroup.Input className="w-full" placeholder="Your name" />
        </InputGroup>
      </TextField>

      <TextField isRequired className="w-full" name="email">
        <Label>Email address</Label>
        <InputGroup>
          <InputGroup.Input className="w-full" placeholder="Your email" />
        </InputGroup>
      </TextField>

      <TextField isRequired className="w-full" name="message">
        <Label>Message</Label>
        <TextArea className="h-32 w-full" placeholder="Your message" />
      </TextField>
    </>
  );
};
