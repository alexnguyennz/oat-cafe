import {
  FieldError,
  Form,
  InputGroup,
  TextField,
  TextArea,
  Calendar,
  DateField,
  DatePicker,
  TimeField,
  NumberField,
  Checkbox,
  CheckboxGroup,
  Toast,
  toast,
  Label,
  Button,
  ListBox,
  Select,
  Description,
  Link,
  type TimeValue,
} from "@heroui/react";
import { now } from "@internationalized/date";

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
          className="mb-4.5 w-full"
          name="name"
        >
          <Label className="text-lg text-white">Name</Label>
          <InputGroup className="rounded-none bg-neutral-900 text-white">
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
          className="mb-4.5 w-full"
          name="email"
        >
          <Label className="text-lg text-white">Email address</Label>
          <InputGroup className="rounded-none bg-neutral-900 text-white">
            <InputGroup.Input className="w-full text-lg" />
          </InputGroup>
          <FieldError className="text-lg" />
        </TextField>

        <TextField className="mb-4.5 w-full" name="phone-number">
          <Label className="text-lg text-white">Phone number</Label>
          <InputGroup className="rounded-none bg-neutral-900 text-white">
            <InputGroup.Input className="w-full text-lg" />
          </InputGroup>
          <FieldError className="text-lg text-white" />
        </TextField>

        <DatePicker
          isRequired
          key="minute"
          className="w-full"
          defaultValue={now("Pacific/Auckland")}
          granularity="minute"
          hideTimeZone={true}
          hourCycle={12}
          name="date"
          shouldForceLeadingZeros={true}
        >
          {({ state }) => (
            <>
              <Label className="text-lg text-white">
                Date and time of booking
              </Label>
              <DateField.Group
                fullWidth
                className="rounded-none bg-neutral-900 text-white"
              >
                <DateField.Input className="w-full text-lg">
                  {(segment) => <DateField.Segment segment={segment} />}
                </DateField.Input>
                <DateField.Suffix>
                  <DatePicker.Trigger>
                    <DatePicker.TriggerIndicator />
                  </DatePicker.Trigger>
                </DateField.Suffix>
              </DateField.Group>
              <DatePicker.Popover className="flex flex-col gap-3">
                <Calendar aria-label="Event date">
                  <Calendar.Header>
                    <Calendar.YearPickerTrigger>
                      <Calendar.YearPickerTriggerHeading />
                      <Calendar.YearPickerTriggerIndicator />
                    </Calendar.YearPickerTrigger>
                    <Calendar.NavButton slot="previous" />
                    <Calendar.NavButton slot="next" />
                  </Calendar.Header>
                  <Calendar.Grid>
                    <Calendar.GridHeader>
                      {(day) => (
                        <Calendar.HeaderCell>{day}</Calendar.HeaderCell>
                      )}
                    </Calendar.GridHeader>
                    <Calendar.GridBody>
                      {(date) => <Calendar.Cell date={date} />}
                    </Calendar.GridBody>
                  </Calendar.Grid>
                  <Calendar.YearPickerGrid>
                    <Calendar.YearPickerGridBody>
                      {({ year }) => <Calendar.YearPickerCell year={year} />}
                    </Calendar.YearPickerGridBody>
                  </Calendar.YearPickerGrid>
                </Calendar>

                <div className="flex items-center justify-between">
                  <Label>Time</Label>
                  <TimeField
                    aria-label="Time"
                    granularity="minute"
                    hideTimeZone={true}
                    hourCycle={12}
                    name="time"
                    shouldForceLeadingZeros={true}
                    value={state.timeValue}
                    onChange={(v) => state.setTimeValue(v as TimeValue)}
                  >
                    <TimeField.Group variant="secondary">
                      <TimeField.Input>
                        {(segment) => <TimeField.Segment segment={segment} />}
                      </TimeField.Input>
                    </TimeField.Group>
                  </TimeField>
                </div>
              </DatePicker.Popover>
            </>
          )}
        </DatePicker>

        <CheckboxGroup name="allergens" className="space-y-3">
          <Label className="text-lg text-white">Allergens</Label>
          <Checkbox value="gluten-free">
            <Checkbox.Content className="text-lg text-white">
              <Checkbox.Control className="pb-1">
                <Checkbox.Indicator />
              </Checkbox.Control>
              Gluten-free
            </Checkbox.Content>
          </Checkbox>
          <Checkbox value="vegan">
            <Checkbox.Content className="text-lg text-white">
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              Vegan
            </Checkbox.Content>
          </Checkbox>
          <Checkbox value="vegetarian">
            <Checkbox.Content className="text-lg text-white">
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              Vegetarian
            </Checkbox.Content>
          </Checkbox>
          <Checkbox value="lactose-free">
            <Checkbox.Content className="text-lg text-white">
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              Lactose-free
            </Checkbox.Content>
          </Checkbox>

          <Description className="text-base text-white">
            We use products containing common allergens. For enquiries about
            whether our food is suitable for you, please contact our friendly
            staff.
          </Description>
        </CheckboxGroup>

        <Select isRequired placeholder="Select venue">
          <Label className="text-lg text-white">Venue</Label>
          <Select.Trigger className="rounded-none bg-neutral-900 text-white">
            <Select.Value className="text-lg text-white" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="in-cafe" textValue="In-cafe">
                In-cafe
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="whataitai" textValue="Whataitai">
                Whataitai
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="ngake" textValue="Ngake">
                Ngake
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="maitarangi" textValue="Maitarangi">
                Maitarangi
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
          <Description className="text-base text-white">
            Any room bookings must be made separately with{" "}
            <Link
              href="https://wellington.govt.nz/recreation/facilities-and-centres/akau-tangi-sports-centre/about-the-sports-centre/facility-and-opening-hours"
              className="underline-animation text-white no-underline"
            >
              Ākau Tangi Sports Centre
              <Link.Icon className="text-white" />
            </Link>{" "}
            before a booking can be made.
          </Description>

          <FieldError className="text-lg" />
        </Select>

        <NumberField
          isRequired
          validate={(value) => {
            if (value <= 0) {
              return "Please enter number of guests.";
            }

            return null;
          }}
          className="mb-4.5 w-full"
          name="guests"
        >
          <Label className="text-lg text-white">Number of guests</Label>
          <NumberField.Group className="h-11 rounded-none bg-neutral-900 text-white">
            <NumberField.DecrementButton className="text-white" />
            <NumberField.Input className="text-lg" />
            <NumberField.IncrementButton className="text-white" />
          </NumberField.Group>

          <FieldError className="text-lg" />
        </NumberField>

        <Select isRequired placeholder="Select payment method">
          <Label className="text-lg text-white">Payment method</Label>
          <Select.Trigger className="rounded-none bg-neutral-900 text-white">
            <Select.Value className="text-lg text-white" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="in-cafe" textValue="In-cafe payment">
                In-cafe payment
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="invoice" textValue="Invoice">
                Invoice
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>

          <FieldError className="text-lg" />
        </Select>

        <TextField className="mb-4.5 w-full" name="message">
          <Label className="text-lg text-white">Any other requirements</Label>
          <TextArea
            rows={4}
            className="text-accent-lightYellow h-32 w-full rounded-none bg-neutral-900 text-lg"
          />
          <FieldError className="text-lg" />
          <Description className="text-base text-white">
            Any additional requests are subject to approval.
          </Description>
        </TextField>

        <Button
          type="submit"
          size="lg"
          className="bg-white pb-0.5 font-serif font-bold text-black transition duration-300 hover:translate-y-0.5"
        >
          Reserve my spot
        </Button>
      </Form>
    </>
  );
};
