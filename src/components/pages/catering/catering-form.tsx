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
  Toast,
  toast,
  Label,
  Button,
  type TimeValue,
} from "@heroui/react";
import {
  getLocalTimeZone,
  parseDate,
  parseZonedDateTime,
  type DateValue,
} from "@internationalized/date";

import { useMemo, useState } from "react";

type Granularity = "day" | "hour" | "minute" | "second";
type HourCycle = 12 | 24;
const granularityOptions: { label: string; value: Granularity }[] = [
  { label: "Day", value: "day" },
  { label: "Hour", value: "hour" },
  { label: "Minute", value: "minute" },
  { label: "Second", value: "second" },
];
const hourCycleOptions: { label: string; value: HourCycle }[] = [
  { label: "12-hour", value: 12 },
  { label: "24-hour", value: 24 },
];

export const CateringForm = () => {
  const [granularity, setGranularity] = useState<Granularity>("minute");
  const [hourCycle, setHourCycle] = useState<HourCycle>(12);
  const [hideTimeZone, setHideTimeZone] = useState(false);
  const [shouldForceLeadingZeros, setShouldForceLeadingZeros] = useState(false);
  const timeGranularity = granularity !== "day" ? granularity : undefined;
  const showTimeField = !!timeGranularity;
  const defaultValue = useMemo<DateValue>(() => {
    const localTimeZone = getLocalTimeZone();
    if (granularity === "day") {
      return parseDate("2026-02-03");
    }
    return parseZonedDateTime(`2026-02-03T08:45:00[${localTimeZone}]`);
  }, [granularity]);

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
          key={granularity}
          className="w-full"
          defaultValue={defaultValue}
          granularity={granularity}
          hideTimeZone={true}
          hourCycle={hourCycle}
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
                {!!showTimeField && (
                  <div className="flex items-center justify-between">
                    <Label>Time</Label>
                    <TimeField
                      aria-label="Time"
                      granularity={timeGranularity}
                      hideTimeZone={true}
                      hourCycle={hourCycle}
                      name="time"
                      shouldForceLeadingZeros={shouldForceLeadingZeros}
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
                )}
              </DatePicker.Popover>
            </>
          )}
        </DatePicker>

        <TextField
          /*validate={(value) => {
            if (value.length === 0) {
              return "Please enter a message.";
            }

            return null;
          }}*/
          className="mb-4.5 w-full"
          name="message"
        >
          <Label className="text-lg text-white">
            Any other requirements (additional requests subject to approval)
          </Label>
          <TextArea className="text-accent-lightYellow h-32 w-full rounded-none bg-neutral-900 text-lg" />
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
